import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, List } from "antd";

const BuildingDetailsPage = () => {
  const { id } = useParams();
  const building = useSelector((state) =>
    state.buildings.buildings.find((b) => b.id === parseInt(id))
  );

  if (!building) {
    return <p>Building not found!</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title={building.name} bordered={false}>
        <p><strong>Address:</strong> {building.address}</p>
        <p><strong>Created At:</strong> {building.createdAt}</p>
        <p><strong>Updated At:</strong> {building.updatedAt}</p>
        <h3>Floors:</h3>
        <List
          dataSource={building.floors}
          renderItem={(floor) => (
            <List.Item>
              Floor {floor.number} - {floor.apartments.length} Apartments
            </List.Item>
          )}
        />
        <h3>Services:</h3>
        <List
          dataSource={building.services}
          renderItem={(service) => <List.Item>{service.name}</List.Item>}
        />
      </Card>
    </div>
  );
};

export default BuildingDetailsPage;