import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { addService, updateService, deleteService } from "../features/services/servicesSlice";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";
import type { RootState } from "../app/store/store";
import type { Service, Partner, FormValues } from "../components/types";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const families = useSelector((state: RootState) => state.families.families);
  const services = useSelector((state: RootState) => state.services.services);
  const partners = useSelector((state: RootState) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    setFormMode("add");
    setCurrentService(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: FormValues) => {
    const selectedPartner = partners.find((partner) => partner.id === values.partner);

    const serviceData: Service = {
      id: formMode === "add" ? Date.now().toString() : currentService!.id,
      name: values.name || "",
      partner: selectedPartner!,
    };

    if (formMode === "add") {
      dispatch(addService({ ...serviceData, id: Date.now().toString() }));
    } else if (formMode === "edit") {
      dispatch(updateService(serviceData));
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getPartnerDetails = (partnerId?: string) => {
    const partner = partners.find((p) => p.id === partnerId);
    return partner
      ? {
          companyName: partner.companyName,
          contactPerson: partner.contactPerson,
          phone: partner.phone,
        }
      : {
          companyName: "N/A",
          contactPerson: "N/A",
          phone: "N/A",
        };
  };

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
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
            dataIndex: "partner",
            key: "partner",
            render: (partner: Partner) => getPartnerDetails(partner?.id).companyName,
          },
          {
            title: "Contact Person",
            dataIndex: "partner",
            key: "contactPerson",
            render: (partner: Partner) => getPartnerDetails(partner?.id).contactPerson,
          },
          {
            title: "Phone",
            dataIndex: "partner",
            key: "phone",
            render: (partner: Partner) => getPartnerDetails(partner?.id).phone,
          },
          {
            title: "Action",
            key: "action",
            render: (_: unknown, record: Service) => (
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
                    e?.stopPropagation?.();
                    dispatch(deleteService(record.id));
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger onClick={(e) => e.stopPropagation()}>
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
        initialValues={
          currentService
            ? {
                name: currentService.name,
                partner: currentService.partner?.id || "",
                contactPerson: currentService.partner?.contactPerson || "",
                phone: currentService.partner?.phone || "",
              }
            : { name: "", partner: "", contactPerson: "", phone: "" }
        }
        mode={formMode}
        title={formMode === "edit" ? "Edit Service" : "Add Service"}
        fields={[
          {
            name: "name",
            label: "Service Name",
            type: "text",
            rules: [{ required: true }],
          },
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
        services={services}
        families={families}
      />
    </div>
  );
};

export default ServicesPage;

