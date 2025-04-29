import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updateService } from "../features/services/servicesSlice";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const service = useSelector((state) =>
    state.services.services.find((s) => s.id === parseInt(id))
  );
  const partners = useSelector((state) => state.partners.partners); // Get partners from Redux store

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!service) {
    return <p>Service not found!</p>;
  }

  const handleEdit = (values) => {
    const selectedPartner = partners.find((partner) => partner.id === values.partner);

    const updatedService = {
      ...service,
      ...values,
      partner: selectedPartner, // Update with full partner object
    };

    dispatch(updateService(updatedService));
    setIsModalVisible(false);
    // navigate(`/services`); // Navigate back to the table after editing
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title={service.name} bordered={false}>
        <p>
          <strong>Partner:</strong> {service.partner?.companyName || "N/A"}
        </p>
        <p>
          <strong>Contact Person:</strong> {service.partner?.contactPerson || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {service.partner?.phone || "N/A"}
        </p>
        <Button type="primary" onClick={() => navigate(`/services`)}>
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
          name: service.name,
          partner: service.partner?.id,
          contactPerson: service.partner?.contactPerson,
          phone: service.partner?.phone,
        }}
        mode="edit"
        title="Edit Service"
        fields={[
          { name: "name", label: "Service Name", rules: [{ required: true }] },
          {
            name: "partner",
            label: "Partner",
            type: "select",
            options: partners.map((partner) => ({
              label: partner.companyName,
              value: partner.id,
            })),
            onChange: (partnerId) => {
              const selectedPartner = partners.find((partner) => partner.id === partnerId);
              return selectedPartner
                ? { contactPerson: selectedPartner.contactPerson, phone: selectedPartner.phone }
                : {};
            },
          },
          { name: "contactPerson", label: "Contact Person", rules: [{ required: true }] },
          { name: "phone", label: "Phone", rules: [{ required: true }] },
        ]}
      />
    </div>
  );
};

export default ServiceDetailsPage;
