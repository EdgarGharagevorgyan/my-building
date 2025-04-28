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
  const services = useSelector((state) => state.services.services); // Mock services from Redux
  const families = useSelector((state) => state.families.families); // Fetch families from Redux

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter buildings based on the search query
  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Table columns
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
              dispatch(deleteBuilding(record.id)); // Dispatch the delete action
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              onClick={(e) => e.stopPropagation()} // Prevent row click
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle adding a new building
  const handleAddBuilding = () => {
    setFormMode("add");
    setCurrentBuilding(null);
    setIsModalVisible(true);
  };

  // Handle form submission for adding or editing a building
  const handleFormSubmit = (values) => {
    const currentTimestamp = new Date().toISOString();

    // Process the form values to include floors and services
    const processedValues = {
      ...values,
      createdAt: formMode === "add" ? currentTimestamp : currentBuilding.createdAt, // Set createdAt only for new buildings
      updatedAt: currentTimestamp, // Always update updatedAt
      floors: values.floors?.map((floor, index) => ({
        id: floor.id || Date.now() + index, // Assign a unique ID if not present
        number: index + 1, // Automatically assign floor numbers starting from 1
        apartments: floor.apartments?.map((apartment, aptIndex) => ({
          id: apartment.id || Date.now() + aptIndex, // Assign a unique ID if not present
          number: apartment.number,
          family: families.find((f) => f.id === apartment.family) || null, // Populate family object
          service: services.find((s) => s.id === apartment.service) || null, // Populate service object
        })),
      })),
      services: values.services || [], // Keep services as an array of selected service IDs
    };

    if (formMode === "add") {
      // Generate a new ID for the building
      const newBuildingId = Date.now();
      // Dispatch the addBuilding action with the processed values
      dispatch(addBuilding({ id: newBuildingId, ...processedValues }));
      // Navigate to the details page of the newly added building
      // navigate(`/buildings/${newBuildingId}`);
    } else if (formMode === "edit") {
      // Dispatch the updateBuilding action with the processed values
      dispatch(updateBuilding({ ...currentBuilding, ...processedValues }));
    }

    // Close the modal after submission
    setIsModalVisible(false);
  };

  // Handle canceling the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
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
            nested: true, // Indicates that this list has nested fields
          },
        ]}
        families={families} // Pass families as a prop for the dropdown
        services={services} // Pass services as a prop for the dropdown
      />
    </div>
  );
};

export default BuildingsPage;
