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
  const partners = useSelector((state) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentService, setCurrentService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    setFormMode("add");
    setCurrentService(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    const selectedPartner = partners.find((partner) => partner.id === values.partner);

    const serviceData = {
      ...values,
      partner: selectedPartner,
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
            dataIndex: ["partner", "companyName"],
            key: "partner",
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
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
                    e.stopPropagation(); 
                    dispatch(deleteService(record.id)); 
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    danger
                    onClick={(e) => e.stopPropagation()} 
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
        initialValues={{
          name: currentService?.name || "",
          partner: currentService?.partner?.id || "",
          contactPerson: currentService?.partner?.contactPerson || "",
          phone: currentService?.partner?.phone || "",
        }}
        mode={formMode}
        title={formMode === "edit" ? "Edit Service" : "Add Service"}
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
