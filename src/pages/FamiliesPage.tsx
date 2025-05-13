import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store/store"; 
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { addFamily, updateFamily, deleteFamily } from "../features/families/familiesSlice";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";
import type { Family, FormValues } from "../components/types";

const FamiliesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const families = useSelector((state: RootState) => state.families.families);
  const services = useSelector((state: RootState) => state.services.services);
  const partners = useSelector((state: RootState) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFamilies = families.filter((family) =>
    family.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Family Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Family) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setFormMode("edit");
              setCurrentFamily(record);
              setIsModalVisible(true);
            }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this family?"
            onConfirm={() => {
              dispatch(deleteFamily(record.id));
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

  const handleAddFamily = () => {
    setFormMode("add");
    setCurrentFamily(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: FormValues) => {
    const timestamp = new Date().toISOString();
    const familyData: Family = {
      ...values,
      name: values.name || "",
      id: formMode === "add" ? Date.now().toString() : currentFamily!.id,
      createdAt: formMode === "add" ? timestamp : currentFamily!.createdAt,
      updatedAt: timestamp,
      members: (values.members || []).map((member) => ({
        ...member,
        createdAt: member.createdAt || timestamp,
        updatedAt: timestamp,
      })),
    };

    if (formMode === "add") {
      dispatch(addFamily(familyData));
    } else if (formMode === "edit") {
      dispatch(updateFamily(familyData));
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
          placeholder="Search Families"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Button onClick={handleAddFamily} type="primary" style={{ marginBottom: 16 }}>
          Add Family
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredFamilies}
        onRow={(record) => ({
          onClick: () => navigate(`/families/${record.id}`),
        })}
        rowKey="id"
      />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentFamily || { name: "", members: [] }}
        mode={formMode}
        title={formMode === "edit" ? "Edit Family" : "Add Family"}
        fields={[
          { name: "name", label: "Family Name", type: "text", rules: [{ required: true }] },
          { name: "members", label: "Members", type: "list", nested: true },
        ]}
        families={families}
        services={services}
        partners={partners}
      />
    </div>
  );
};

export default FamiliesPage;
