import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Space } from "antd";
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
  const partners = useSelector((state) => state.partners.partners); 

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!service) {
    return <p>Service not found!</p>;
  }

  const handleEdit = (values) => {
    const selectedPartner = partners.find((partner) => partner.id === values.partner);

    const updatedService = {
      ...service,
      ...values,
      partner: selectedPartner, 
    };

    dispatch(updateService(updatedService));
    setIsModalVisible(false);
    navigate(`/services`); 
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Partner",
      dataIndex: "partnerName",
      key: "partnerName",
      sorter: (a, b) => a.partnerName.localeCompare(b.partnerName),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
  ];

  const tableData = [
    {
      key: service.id,
      name: service.name,
      partnerName: service.partner?.companyName || "N/A",
      contactPerson: service.partner?.contactPerson || "N/A",
      phone: service.partner?.phone || "N/A",
    },
  ];

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <div style={{ marginTop: 16 }}>
        <Space>
          <Button type="primary" onClick={() => navigate(`/services`)}>
            Return to Services
          </Button>
          <Button type="default" onClick={() => setIsModalVisible(true)}>
            Edit
          </Button>
        </Space>
      </div>

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
