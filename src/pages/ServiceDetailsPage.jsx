import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "antd";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const service = useSelector((state) =>
    state.services.services.find((s) => s.id === parseInt(id))
  );

  if (!service) {
    return <p>Service not found!</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title={service.name} bordered={false}>
        <p><strong>Partner:</strong> {service.partner.companyName}</p>
        <p><strong>Contact Person:</strong> {service.partner.contactPerson}</p>
        <p><strong>Phone:</strong> {service.partner.phone}</p>
      </Card>
    </div>
  );
};

export default ServiceDetailsPage;