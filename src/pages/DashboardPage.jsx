import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";

const DashboardPage = () => {
  const totalBuildings = useSelector((state) => state.buildings.buildings.length);
  const totalFamilies = useSelector((state) => state.families.families.length);
  const totalServices = useSelector((state) => state.services.services.length);
  const totalPartners = useSelector((state) => state.partners.partners.length);

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Buildings" variant={false}>
            <h3>{totalBuildings}</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Families" variant={false}>
            <h3>{totalFamilies}</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Services" variant={false}>
            <h3>{totalServices}</h3>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Partners" variant={false}>
            <h3>{totalPartners}</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
