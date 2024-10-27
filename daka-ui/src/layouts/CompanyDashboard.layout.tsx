import React, { useEffect, useState } from "react";
import { Layout, Button, Row, Col, message } from "antd";
import { CompanyCategory } from "../model/data/CompanyCategory";
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

const categories: CompanyCategory[] = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Retail" },
  { id: 4, name: "Healthcare" },
];

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: "Google",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    email: "contact@google.com",
    phone: "+1-650-253-0000",
    category: categories[0], // Technology
  },
  {
    id: 2,
    name: "Goldman Sachs",
    address: "200 West Street, New York, NY",
    email: "info@goldmansachs.com",
    phone: "+1-212-902-1000",
    category: categories[1], // Finance
  },
  {
    id: 3,
    name: "Walmart",
    address: "702 SW 8th St, Bentonville, AR",
    email: "support@walmart.com",
    phone: "+1-479-273-4000",
    category: categories[2], // Retail
  },
  {
    id: 4,
    name: "Pfizer",
    address: "235 East 42nd Street, New York, NY",
    email: "contact@pfizer.com",
    phone: "+1-212-733-2323",
    category: categories[3], // Healthcare
  },
];

const CompanyDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleAddCompany = async (company: Company) => {
    try {
      await createCompany(company);
      setCompanies([...companies, { ...company, id: companies.length + 1 }]);
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
