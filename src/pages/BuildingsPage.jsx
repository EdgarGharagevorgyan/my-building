import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { addBuilding, updateBuilding, deleteBuilding } from "../features/buildings/buildingsSlice";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../components/DynamicForm";

const BuildingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buildings = useSelector((state) => state.buildings.buildings);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      title: "Building Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
              setCurrentBuilding(record);
              setIsModalVisible(true);
            }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this building?"
            onConfirm={(e) => {
              e.stopPropagation(); // Prevent row click
              dispatch(deleteBuilding(record.id));
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

  const handleAddBuilding = () => {
    setFormMode("add");
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      dispatch(addBuilding({ id: Date.now(), ...values }));
    } else if (formMode === "edit") {
      dispatch(updateBuilding({ ...currentBuilding, ...values }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <Input.Search
        placeholder="Search Buildings"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Button onClick={handleAddBuilding} type="primary" style={{ marginBottom: 16 }}>
        Add Building
      </Button>
      <Table
        columns={columns}
        dataSource={filteredBuildings}
        onRow={(record) => ({
          onClick: () => navigate(`/buildings/${record.id}`),
        })}
        rowKey="id"
      />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentBuilding || { name: "", address: "" }}
        mode={formMode}
      />
    </div>
  );
};

export default BuildingsPage;
