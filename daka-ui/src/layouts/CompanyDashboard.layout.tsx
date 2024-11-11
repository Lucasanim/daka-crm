import React, { useEffect, useState } from "react";
import { Layout, Button, Row, Col, message } from "antd";
import { Company } from "../model/data/Company";
import CompanyCard from "../components/company/CompanyCard";
import CompanyFormModal from "../components/company/CompanyFormModal";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../service/CompanyService";
import CompanyDetailsModal from "../components/company/CompanyDetailsModal";

const { Content } = Layout;

const CompanyDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleAddCompany = async (company: Company) => {
    try {
      await createCompany(company);
      fetchCompanies();
      setSelectedCompany(null);
      setIsModalVisible(false);
      message.success("Company created!");
    } catch (e) {
      console.log(e);
      message.error("Error fetching companies");
    }
  };

  const handleEditCompany = async (company: Company) => {
    try {
      await updateCompany(company);
      fetchCompanies();
      setSelectedCompany(null);
      setIsModalVisible(false);
      message.success("Company updated!");
    } catch (e) {
      console.log(e);
      message.error("Error updating companies");
    }
  };

  const handleDeleteCompany = async (companyId: number) => {
    try {
      await deleteCompany(companyId);
      fetchCompanies();
      setSelectedCompany(null);
      message.success("Company deleted!");
    } catch (e) {
      console.log(e);
      message.error("Error deleting companies");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
    } catch (e) {
      console.log(e);
      message.error("Error creating company");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        minHeight: 280,
        overflowX: "scroll",
      }}
    >
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setIsModalVisible(true)}
      >
        Add New Company
      </Button>
      <Row gutter={[16, 16]}>
        {companies.map((company) => (
          <Col key={company.id} xs={24} sm={12} md={8} lg={6}>
            <CompanyCard
              company={company}
              onClick={() => setSelectedCompany(company)}
            />
          </Col>
        ))}
      </Row>

      <CompanyFormModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddCompany}
      />

      {selectedCompany && (
        <CompanyDetailsModal
          visible={!!selectedCompany}
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onSave={handleEditCompany}
          onDelete={handleDeleteCompany}
        />
      )}
    </Content>
  );
};

export default CompanyDashboard;
