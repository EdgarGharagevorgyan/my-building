import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { addService, updateService, deleteService } from "../features/services/servicesSlice";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector((state) => state.services.services);
  const partners = useSelector((state) => state.partners.partners); // Get partners from Redux store

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentService, setCurrentService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    setFormMode("add");
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    const selectedPartner = partners.find((partner) => partner.id === values.partner);

    const serviceData = {
      ...values,
      partner: selectedPartner, // Save the full partner object
    };

    if (formMode === "add") {
      dispatch(addService({ id: Date.now(), ...serviceData }));
    } else if (formMode === "edit") {
      dispatch(updateService({ ...currentService, ...serviceData }));
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Space>
        <Input.Search
          placeholder="Search Services"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Button onClick={handleAddService} type="primary" style={{ marginBottom: 16 }}>
          Add Service
        </Button>
      </Space>
      <Table
        columns={[
          {
            title: "Service Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Partner",
            dataIndex: ["partner", "companyName"], // Display the partner's company name
            key: "partner",
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    setFormMode("edit");
                    setCurrentService(record);
                    setIsModalVisible(true);
                  }}
                  type="primary"
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this service?"
                  onConfirm={(e) => {
                    e.stopPropagation(); // Prevent row click
                    dispatch(deleteService(record.id)); // Dispatch the delete action
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    danger
                    onClick={(e) => e.stopPropagation()} // Prevent row click
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        dataSource={filteredServices}
        onRow={(record) => ({
          onClick: () => navigate(`/services/${record.id}`),
        })}
        rowKey="id"
      />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentService || { name: "", partner: "", contactPerson: "", phone: "" }}
        mode={formMode}
        title={formMode === "edit" ? "Edit Service" : "Add Service"} // Dynamic title
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

export default ServicesPage;
