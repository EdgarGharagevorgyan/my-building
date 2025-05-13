import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";
import { addPartner, updatePartner, deletePartner } from "../features/partners/partnersSlice";
import { RootState } from "../app/store/store";
import { Partner, FormValues } from "../components/types";

const PartnersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const partners = useSelector((state: RootState) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPartners = partners.filter((partner) =>
    partner.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Partner) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setFormMode("edit");
              setCurrentPartner(record);
              setIsModalVisible(true);
            }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this partner?"
            onConfirm={(e) => {
              e?.stopPropagation();
              dispatch(deletePartner(record.id));
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
  ];

  const handleAddPartner = () => {
    setFormMode("add");
    setCurrentPartner(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: FormValues) => {
    if (formMode === "add") {
      const newPartner: Partner = {
        id: Date.now().toString(),
        companyName: values.companyName || "",
        contactPerson: values.contactPerson || "",
        phone: values.phone || "",
      };
      dispatch(addPartner(newPartner));
    } else if (formMode === "edit" && currentPartner) {
      const updatedPartner: Partner = {
        ...currentPartner,
        ...values,
        companyName: values.companyName || currentPartner.companyName,
        contactPerson: values.contactPerson || currentPartner.contactPerson,
        phone: values.phone || currentPartner.phone,
      };
      dispatch(updatePartner(updatedPartner));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
      <Space>
        <Input.Search
          placeholder="Search Partners"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Button onClick={handleAddPartner} type="primary" style={{ marginBottom: 16 }}>
          Add Partner
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredPartners}
        onRow={(record) => ({
          onClick: () => navigate(`/partners/${record.id}`),
        })}
        rowKey="id"
      />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentPartner || { companyName: "", contactPerson: "", phone: "" }}
        mode={formMode}
        title={formMode === "edit" ? "Edit Partner" : "Add Partner"}
        fields={[
          { name: "companyName", label: "Company Name", type: "text", rules: [{ required: true }] },
          {
            name: "contactPerson",
            label: "Contact Person",
            type: "text",
            rules: [{ required: true }],
          },
          { name: "phone", label: "Phone", type: "text", rules: [{ required: true }] },
        ]}
        partners={partners}
        families={[]}
        services={[]}
      />
    </div>
  );
};

export default PartnersPage;
