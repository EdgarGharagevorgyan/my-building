import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "antd";
import { setDashboardData } from "../features/dashboard/dashboardSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { totalBuildings, totalFamilies, totalServices, totalPartners } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Buildings" bordered={false}>
            <h3>{totalBuildings}</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Families" bordered={false}>
            <h3>{totalFamilies}</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Services" bordered={false}>
            <h3>{totalServices}</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Partners" bordered={false}>
            <h3>{totalPartners}</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
