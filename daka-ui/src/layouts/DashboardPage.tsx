import {
  Card,
  Col,
  Row,
  Statistic,
  Button,
  Typography,
  message,
  Table,
  Avatar,
} from "antd";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { PieChart, Pie, Cell, Legend as PieLegend } from "recharts";
import {
  DashboardData,
  DashboardExpectedValue,
} from "../model/dashboard/DashboardData";
import { getDashboardData } from "../service/DashboardService";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../infrastructure/router/NavigationRoutes";
import { Content } from "antd/es/layout/layout";

const { Text } = Typography;

// Mock Data for Charts
const dealsData = [
  { month: "Feb", won: 0, lost: 0 },
  { month: "Mar", won: 200, lost: 100 },
  { month: "Apr", won: 500, lost: 250 },
  { month: "May", won: 700, lost: 500 },
  { month: "Jun", won: 1200, lost: 800 },
  { month: "Jul", won: 1500, lost: 900 },
  { month: "Aug", won: 2000, lost: 1200 },
];

const taskData = [
  { name: "Todo", value: 30 },
  { name: "In Progress", value: 40 },
  { name: "In Review", value: 15 },
  { name: "Done", value: 20 },
];

const taskColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff4d4f"];

// companiesAmountData
const companyTrendData = [
  { month: "Feb", value: 10 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 20 },
  { month: "May", value: 23 },
  { month: "Jun", value: 27 },
];

//customersData
const contactTrendData = [
  { month: "Feb", value: 40 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 50 },
  { month: "May", value: 57 },
  { month: "Jun", value: 64 },
];

//dealsAmountData
const dealsTrendData = [
  { month: "Feb", value: 180 },
  { month: "Mar", value: 190 },
  { month: "Apr", value: 200 },
  { month: "May", value: 220 },
  { month: "Jun", value: 250 },
];

// revenueData
const revenueData = [
  { month: "Jan", expected: 500000, realized: 300000 },
  { month: "Feb", expected: 700000, realized: 450000 },
  { month: "Mar", expected: 800000, realized: 600000 },
  { month: "Apr", expected: 850000, realized: 750000 },
  { month: "May", expected: 900000, realized: 780000 },
  { month: "Jun", expected: 950000, realized: 820000 },
  { month: "Jul", expected: 1000000, realized: 900000 },
  { month: "Aug", expected: 1050000, realized: 940000 },
];

const Dashboard = () => {
  const [data, setData] = useState<DashboardData>();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getDashboardData();
      setData(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const columns: ColumnsType<DashboardExpectedValue> = [
    {
      title: "Company",
      render: (index, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{ backgroundColor: taskColors[index], marginRight: 8 }}
          >
            {record.month.charAt(0)}
          </Avatar>
          <Typography.Text>{record.month}</Typography.Text>
        </div>
      ),
    },
    {
      title: "Revenue",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ color: "green" }}>
            ${record.expected}
          </Typography.Text>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Content
      style={{
        margin: "24px 16px",
        overflowX: "scroll",
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Number of companies"
              value={
                data?.companiesAmountData.reduce(
                  (prev, d) => prev + d.value,
                  0
                ) || 0
              }
            />
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={data?.companiesAmountData}>
                {/* companyTrendData */}
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Number of contacts"
              value={data?.customersData.reduce((prev, d) => prev + d.value, 0)}
            />
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={data?.customersData}>
                {/* contactTrendData */}
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total deals in pipeline"
              value={data?.companiesAmountData.reduce(
                (prev, d) => prev + d.value,
                0
              )}
            />
            <ResponsiveContainer width="100%" height={50}>
              <AreaChart data={data?.dealsAmountData}>
                {/*  dealsTrendData*/}
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f44336"
                  fill="#f44336"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Total revenue (yearly)">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data?.revenueData}>
                {/* revenueData */}
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expected"
                  stroke="#8884d8"
                  name="Expected"
                />
                <Line
                  type="monotone"
                  dataKey="realized"
                  stroke="#82ca9d"
                  name="Realized"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Deals"
            extra={
              <Button
                onClick={(_) =>
                  navigate(NavigationRoutes.APP + NavigationRoutes.DEALS)
                }
              >
                See sales pipeline
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data?.dealsRevenueData}>
                {/* dealsData */}
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="realized"
                  stroke="#4caf50"
                  name="Won Deals"
                />
                <Line
                  type="monotone"
                  dataKey="expected"
                  stroke="#f44336"
                  name="Lost Deals"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card
            title="Tasks"
            extra={
              <Button
                onClick={(e) =>
                  navigate(NavigationRoutes.APP + NavigationRoutes.TASKS)
                }
              >
                See kanban board
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={data?.tasksAmountData.map((t) => ({
                    ...t,
                    name: t.month.replace("_", " "),
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data?.tasksAmountData.map((entry, index) => (
                    <Cell key={`cell-${entry}`} fill={taskColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <PieLegend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Top companies"
            extra={
              <Button
                onClick={(_) =>
                  navigate(NavigationRoutes.APP + NavigationRoutes.COMPANIES)
                }
              >
                See all companies
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={400}>
              <Table
                columns={columns}
                dataSource={data?.companiesRevenueData}
                pagination={false}
              />
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
