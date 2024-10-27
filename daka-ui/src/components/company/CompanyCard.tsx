import React from "react";
import { Card, Avatar } from "antd";
import { Company } from "../../model/data/Company";

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  return (
    <Card hoverable onClick={onClick}>
      <Card.Meta
        avatar={<Avatar>{company.name.charAt(0)}</Avatar>}
        title={company.name}
        description={company.category.name}
      />
    </Card>
  );
};

export default CompanyCard;
