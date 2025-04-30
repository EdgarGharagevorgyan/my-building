import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { addPartner, updatePartner, deletePartner } from "../features/partners/partnersSlice";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";

const PartnersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partners = useSelector((state) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentPartner, setCurrentPartner] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      render: (_, record) => (
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
              e.stopPropagation(); 
              dispatch(deletePartner(record.id));
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
  ];

  const handleAddPartner = () => {
    setFormMode("add");
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      dispatch(addPartner({ id: Date.now(), ...values }));
    } else if (formMode === "edit") {
      dispatch(updatePartner({ ...currentPartner, ...values }));
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
          { name: "companyName", label: "Company Name", rules: [{ required: true }] },
          { name: "contactPerson", label: "Contact Person", rules: [{ required: true }] },
          { name: "phone", label: "Phone", rules: [{ required: true }] },
        ]}
      />
    </div>
  );
};

export default PartnersPage;
