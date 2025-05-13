import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";
import { RootState } from "../app/store/store";

const DashboardPage = () => {
  const totalBuildings = useSelector((state: RootState) => state.buildings.buildings.length);
  const totalFamilies = useSelector((state: RootState) => state.families.families.length);
  const totalServices = useSelector((state: RootState) => state.services.services.length);
  const totalPartners = useSelector((state: RootState) => state.partners.partners.length);

  return (
    <div>
      <h2>Dashboard</h2>
      <Row gutter={[16, 16]} wrap>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Buildings">
            <h3>{totalBuildings}</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Families">
            <h3>{totalFamilies}</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Services">
            <h3>{totalServices}</h3>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Partners">
            <h3>{totalPartners}</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
