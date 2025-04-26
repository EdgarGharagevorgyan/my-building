import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";

const FamilyDetailsPage = () => {
  const { id } = useParams();
  const family = useSelector((state) =>
    state.families.families.find((f) => f.id === parseInt(id))
  );

  if (!family) {
    return <p>Family not found!</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>{family.name}</h2>
      <Row gutter={16}>
        {family.members.map((member) => (
          <Col span={6} key={member.id}>
            <Card title={member.fullName} bordered={false}>
              <p><strong>Age:</strong> {member.age}</p>
              <p><strong>Role:</strong> {member.role}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FamilyDetailsPage;