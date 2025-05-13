import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Space } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updateService } from "../features/services/servicesSlice";
import { RootState } from "../app/store/store";
import { Partner, Service, FormValues } from "../components/types";

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const service = useSelector((state: RootState) =>
    state.services.services.find((s: Service) => s.id === id)
  );
  const partners = useSelector((state: RootState) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!service) {
    return <p>Service not found!</p>;
  }

  const handleEdit = (values: FormValues) => {
    const selectedPartner = partners.find((partner: Partner) => partner.id === values.partner);

    if (!selectedPartner) return;

    const updatedService: Service = {
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
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Partner",
      dataIndex: "partnerName",
      key: "partnerName",
      sorter: (a: any, b: any) => a.partnerName.localeCompare(b.partnerName),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      sorter: (a: any, b: any) => a.contactPerson.localeCompare(b.contactPerson),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: any, b: any) => a.phone.localeCompare(b.phone),
    },
  ];

  const partnerDetails = partners.find((p) => p.id === service.partner?.id);

  const tableData = [
    {
      key: service.id,
      name: service.name,
      partnerName: partnerDetails?.companyName || "N/A",
      contactPerson: partnerDetails?.contactPerson || "N/A",
      phone: partnerDetails?.phone || "N/A",
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
          partner: service.partner?.id || "",
          contactPerson: service.partner?.contactPerson || "",
          phone: service.partner?.phone || "",
        }}
        mode="edit"
        title="Edit Service"
        fields={[
          { name: "name", label: "Service Name", type: "text", rules: [{ required: true }] },
          {
            name: "partner",
            label: "Partner",
            type: "select",
            options: partners.map((partner) => ({
              label: partner.companyName,
              value: partner.id,
            })),
          },
          {
            name: "contactPerson",
            label: "Contact Person",
            type: "text",
            rules: [{ required: true }],
          },
          {
            name: "phone",
            label: "Phone",
            type: "text",
            rules: [{ required: true }],
          },
        ]}
        partners={partners}
        services={useSelector((state: RootState) => state.services.services)}
        families={useSelector((state: RootState) => state.families.families)}
      />
    </div>
  );
};

export default ServiceDetailsPage;
