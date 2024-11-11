import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button, message } from "antd";
import { DealState } from "../model/data/DealState";
import { Content } from "antd/es/layout/layout";
import { Deal } from "../model/data/Deal";
import { Customer } from "../model/data/Customer";
import { getCustomers } from "../service/CustomerService";
import {
  createDeal,
  deleteDeal,
  getDeals,
  updateDeal,
} from "../service/DealService";
import DealModal from "../components/deal/DealModal";
import DealCard from "../components/deal/DealCard";

const DealsLayout: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>();

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await getDeals();
      setDeals(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDeals();
    fetchCustomers();
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const deal = deals.find((deal) => deal.id === parseInt(draggableId));
    if (!deal) return;

    deal.state = destination.droppableId as DealState;
    handleEditDeal(deal);

    // const updatedDeals = deals.map((deal) =>
    //   deal.id === parseInt(draggableId)
    //     ? { ...deal, state: destination.droppableId as DealState }
    //     : deal
    // );
    // setDeals(updatedDeals);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDeal(undefined);
    setIsModalOpen(false);
  };

  const handleDealClick = async (deal: Deal) => {
    setSelectedDeal(deal);
    openModal();
  };

  const handleDelete = async (dealId: number) => {
    await deleteDeal(dealId);
    message.success("Deal deleted successfully!");
    closeModal();
    fetchDeals();
  };

  const handleCreate = async (deal: Deal) => {
    await createDeal(deal);
    message.success("Deal created successfully!");
  };

  const handleSaveDeal = (deal: Deal) => {
    try {
      if (selectedDeal) {
        handleEditDeal(deal);
      } else {
        handleCreate(deal);
      }
      closeModal();
      fetchDeals();
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const handleEditDeal = async (deal: Deal) => {
    await updateDeal(deal);
    message.success("Deal edited successfully!");
  };

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        overflowX: "scroll",
      }}
    >
      <Button onClick={openModal} type="primary" style={{ marginBottom: 16 }}>
        Create Deal
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.values(DealState).map((state) => (
            <Droppable droppableId={state} key={state}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "8px",
                    width: "250px",
                    minWidth: "250px",
                    minHeight: "400px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3>{state}</h3>
                  {deals
                    .filter((deal) => deal.state === state)
                    .map((deal, index) => (
                      <Draggable
                        key={deal.id}
                        draggableId={String(deal.id)}
                        index={index}
                      >
                        {(provided) => (
                          <DealCard
                            deal={deal}
                            provided={provided}
                            onClick={handleDealClick}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <DealModal
        visible={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveDeal}
        onDelete={handleDelete}
        dealData={selectedDeal}
        customers={customers}
      />
    </Content>
  );
};

export default DealsLayout;
