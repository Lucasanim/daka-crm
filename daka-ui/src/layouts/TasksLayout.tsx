import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { Customer } from "../model/data/Customer";
import { getCustomers } from "../service/CustomerService";
import { Task } from "../model/data/Task";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../service/TaskService";
import { TaskState } from "../model/data/TaskState";
import TaskCard from "../components/task/TaskCard";
import TaskModal from "../components/task/TaskModal";

const TasksLayout: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCustomers();
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const task = tasks.find((t) => t.id === parseInt(draggableId));
    if (!task) return;

    task.state = destination.droppableId as TaskState;
    handleEditTask(task);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(undefined);
    setIsModalOpen(false);
  };

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);
    openModal();
  };

  const handleDelete = async (taskId: number) => {
    await deleteTask(taskId);
    message.success("Task deleted successfully!");
    closeModal();
    fetchTasks();
  };

  const handleCreate = async (task: Task) => {
    await createTask(task);
    message.success("Task created successfully!");
  };

  const handleSaveDeal = (task: Task) => {
    try {
      if (selectedTask) {
        handleEditTask(task);
      } else {
        handleCreate(task);
      }
      closeModal();
      fetchTasks();
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const handleEditTask = async (task: Task) => {
    await updateTask(task);
    message.success("Task edited successfully!");
  };

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
      }}
    >
      <Button onClick={openModal} type="primary" style={{ marginBottom: 16 }}>
        Create Deal
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.values(TaskState).map((state) => (
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
                    minHeight: "400px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3>{state}</h3>
                  {tasks
                    .filter((task) => task.state === state)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <TaskCard
                            task={task}
                            provided={provided}
                            onClick={handleTaskClick}
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
      <TaskModal
        visible={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveDeal}
        onDelete={handleDelete}
        taskData={selectedTask}
        customers={customers}
      />
    </Content>
  );
};

export default TasksLayout;
