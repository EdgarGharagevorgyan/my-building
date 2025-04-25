import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Popconfirm, Input, Space, Modal } from "antd";
import {
  addFamily,
  updateFamily,
  deleteFamily,
  setFamilies,
} from "../features/families/familiesSlice";
import DynamicForm from "../components/DynamicForm";

const FamiliesPage = () => {
  const dispatch = useDispatch();
  const families = useSelector((state) => state.families.families);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentFamily, setCurrentFamily] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const columns = [
    {
      title: "Family Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Building",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
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
            onConfirm={() => dispatch(deleteFamily(record.id))}
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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleBuildingFilter = (building) => {
    setSelectedBuilding(building);
  };

  const filteredFamilies = families.filter(
    (family) =>
      family.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedBuilding || family.building === selectedBuilding)
  );

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={handleAddFamily} type="primary" style={{ marginBottom: 16 }}>
        Add Family
      </Button>
      <Input
        placeholder="Search Family Name"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: "200px" }}
      />
      <Button onClick={() => handleBuildingFilter("Building 1")} style={{ marginLeft: 10 }}>
        Filter by Building 1
      </Button>
      <Button onClick={() => handleBuildingFilter("Building 2")} style={{ marginLeft: 10 }}>
        Filter by Building 2
      </Button>
      <Table columns={columns} dataSource={filteredFamilies} rowKey="id" pagination={false} />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentFamily || { name: "", building: "" }}
        mode={formMode}
      />
    </div>
  );
};

export default FamiliesPage;
