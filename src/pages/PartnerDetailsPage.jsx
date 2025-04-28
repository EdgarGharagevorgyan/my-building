import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updatePartner } from "../features/partners/partnersSlice";

const PartnerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const partner = useSelector((state) =>
    state.partners.partners.find((p) => p.id === parseInt(id))
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!partner) {
    return <p>Partner not found!</p>;
  }

  const handleEdit = (values) => {
    dispatch(updatePartner({ ...partner, ...values }));
    setIsModalVisible(false);
    navigate(`/partners`); // Navigate back to the table after editing
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title={partner.companyName} bordered={false}>
        <p>
          <strong>Company Name:</strong> {partner.companyName}
        </p>
        <p>
          <strong>Contact Person:</strong> {partner.contactPerson}
        </p>
        <p>
          <strong>Phone:</strong> {partner.phone}
        </p>
        <p>
          <strong>Address:</strong> {partner.address || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {partner.email || "N/A"}
        </p>
        <Button type="primary" onClick={() => navigate(`/partners`)}>
          Return to Table
        </Button>
        <Button
          type="default"
          style={{ marginLeft: 8 }}
          onClick={() => setIsModalVisible(true)} // Open the edit modal
        >
          Edit
        </Button>
      </Card>

      <DynamicForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={{
          companyName: partner.companyName,
          contactPerson: partner.contactPerson,
          phone: partner.phone,
          address: partner.address,
          email: partner.email,
        }}
        mode="edit"
        title="Edit Partner"
        fields={[
          { name: "companyName", label: "Company Name", rules: [{ required: true }] },
          { name: "contactPerson", label: "Contact Person", rules: [{ required: true }] },
          { name: "phone", label: "Phone", rules: [{ required: true }] },
          { name: "address", label: "Address", rules: [{ required: false }] },
          { name: "email", label: "Email", rules: [{ type: "email", required: false }] },
        ]}
      />
    </div>
  );
};

export default PartnerDetailsPage;
