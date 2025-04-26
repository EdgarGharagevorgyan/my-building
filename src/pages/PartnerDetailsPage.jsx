import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "antd";

const PartnerDetailsPage = () => {
  const { id } = useParams();
  const partner = useSelector((state) =>
    state.partners.partners.find((p) => p.id === parseInt(id))
  );

  if (!partner) {
    return <p>Partner not found!</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title={partner.companyName} bordered={false}>
        <p><strong>Contact Person:</strong> {partner.contactPerson}</p>
        <p><strong>Phone:</strong> {partner.phone}</p>
      </Card>
    </div>
  );
};

export default PartnerDetailsPage;