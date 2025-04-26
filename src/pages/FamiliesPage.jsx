import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Popconfirm, Space } from "antd";
import { addFamily, updateFamily, deleteFamily } from "../features/families/familiesSlice";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";

const FamiliesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const families = useSelector((state) => state.families.families);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentFamily, setCurrentFamily] = useState(null);

  const columns = [
    {
      title: "Family Name",
      dataIndex: "name",
      key: "name",
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
              setCurrentFamily(record);
              setIsModalVisible(true);
            }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this family?"
            onConfirm={(e) => {
              e.stopPropagation(); // Prevent row click
              dispatch(deleteFamily(record.id));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAddFamily = () => {
    setFormMode("add");
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      dispatch(addFamily({ id: Date.now(), ...values }));
    } else if (formMode === "edit") {
      dispatch(updateFamily({ ...currentFamily, ...values }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={handleAddFamily} type="primary" style={{ marginBottom: 16 }}>
        Add Family
      </Button>
      <Table
        columns={columns}
        dataSource={families}
        onRow={(record) => ({
          onClick: () => navigate(`/families/${record.id}`),
        })}
        rowKey="id"
      />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentFamily || { name: "" }}
        mode={formMode}
      />
    </div>
  );
};

export default FamiliesPage;
