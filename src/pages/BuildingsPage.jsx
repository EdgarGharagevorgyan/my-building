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
  const services = useSelector((state) => state.services.services);
  const families = useSelector((state) => state.families.families);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Building Name",
      dataIndex: "name",
      key: "name",
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
              e.stopPropagation(); 
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
              e.stopPropagation(); 
              dispatch(deleteBuilding(record.id)); 
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

  const handleAddBuilding = () => {
    setFormMode("add");
    setCurrentBuilding(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    const currentTimestamp = new Date().toISOString();

    const processedValues = {
      ...values,
      createdAt: formMode === "add" ? currentTimestamp : currentBuilding.createdAt,
      updatedAt: currentTimestamp,
      floors: values.floors?.map((floor, index) => ({
        id: floor.id || Date.now() + index,
        number: index + 1,
        apartments: floor.apartments?.map((apartment, aptIndex) => ({
          id: apartment.id || Date.now() + aptIndex,
          number: apartment.number,
          family: families.find((f) => f.id === apartment.family) || null, 
          service: services.find((s) => s.id === apartment.service) || null, 
        })),
      })),
      services: values.services || [],
    };

    if (formMode === "add") {
      const newBuildingId = Date.now();
      dispatch(addBuilding({ id: newBuildingId, ...processedValues }));
    } else if (formMode === "edit") {
      dispatch(updateBuilding({ ...currentBuilding, ...processedValues }));
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
          placeholder="Search Buildings"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Button onClick={handleAddBuilding} type="primary" style={{ marginBottom: 16 }}>
          Add Building
        </Button>
      </Space>
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
        initialValues={currentBuilding || { name: "", address: "", floors: [] }}
        mode={formMode}
        title={formMode === "edit" ? "Edit Building" : "Add Building"}
        fields={[
          { name: "name", label: "Building Name", rules: [{ required: true }] },
          { name: "address", label: "Address", rules: [{ required: true }] },
          {
            name: "floors",
            label: "Floors",
            type: "list",
            nested: true,
          },
        ]}
        families={families} // Pass families as a prop for the dropdown
        services={services}
      />
    </div>
  );
};

export default BuildingsPage;
