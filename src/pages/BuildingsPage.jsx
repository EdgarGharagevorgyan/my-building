import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input, Modal } from "antd";
import { addBuilding, updateBuilding, deleteBuilding } from "../features/buildings/buildingsSlice";
import DynamicForm from "../components/DynamicForm";
// import { Search } from "lucide-react";

import { AudioOutlined } from "@ant-design/icons";
const { Search } = Input;

const onSearch = (value, _e, info) =>{
  console.log(info === null || info === void 0 ? void 0 : info.source, value);
}

const BuildingsPage = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.buildings.buildings);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      title: "Building Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Search Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={() => handleSearch(searchQuery)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
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
            onClick={() => {
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
            onConfirm={() => dispatch(deleteBuilding(record.id))}
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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <Search
        placeholder="Search"
        onSearch={onSearch}
        style={{ width: 200 }}
        submit='none'
      />

      <Button onClick={handleAddBuilding} type="primary" style={{ marginBottom: 16 }}>
        Add Building
      </Button>
      <Table columns={columns} dataSource={filteredBuildings} rowKey="id" pagination={false} />
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
