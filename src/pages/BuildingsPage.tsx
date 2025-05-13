import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import { addBuilding, updateBuilding, deleteBuilding } from "../features/buildings/buildingsSlice";
import DynamicForm from "../components/DynamicForm";
import { RootState } from "../app/store/store";
import { Building, Family, Service, FormValues, Apartment, Floor } from "../components/types";

const BuildingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buildings = useSelector((state: RootState) => state.buildings.buildings);
  const families = useSelector((state: RootState) => state.families.families);
  const services = useSelector((state: RootState) => state.services.services);
  const partners = useSelector((state: RootState) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentBuilding, setCurrentBuilding] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnsType<Building> = [
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
              e?.stopPropagation();
              dispatch(deleteBuilding(record.id));
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

  const handleAddBuilding = () => {
    setFormMode("add");
    setCurrentBuilding(null);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: FormValues) => {
    const currentTimestamp = new Date().toISOString();

    const processedValues: Building = {
      ...(formMode === "edit" && currentBuilding
        ? { id: currentBuilding.id }
        : { id: Date.now().toString() }),
      name: values.name || "",
      address: values.address,
      createdAt:
        formMode === "add" ? currentTimestamp : currentBuilding?.createdAt || currentTimestamp,
      updatedAt: currentTimestamp,
      services: values.services || [],
      floors:
        values.floors?.map((floor: Floor, index: number) => ({
          id: floor.id || `${Date.now()}_${index}`,
          number: index + 1,
          apartments:
            floor.apartments?.map((apartment: Apartment, aptIndex: number) => ({
              id: apartment.id || `${Date.now()}_${aptIndex}`,
              number: apartment.number,
              family:
                apartment.family && typeof apartment.family === "object"
                  ? apartment.family.id
                  : apartment.family,
              service:
                apartment.service && typeof apartment.service === "object"
                  ? apartment.service.id
                  : apartment.service,
            })) || [],
        })) || [],
    };

    if (formMode === "add") {
      dispatch(addBuilding(processedValues));
    } else if (formMode === "edit") {
      dispatch(updateBuilding(processedValues));
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
        initialValues={
          currentBuilding
            ? {
                ...currentBuilding,
                floors: currentBuilding.floors?.map((floor, index) => ({
                  ...floor,
                  number: index + 1,
                  apartments: floor.apartments?.map((apartment) => ({
                    ...apartment,
                    family:
                      apartment.family && typeof apartment.family === "object"
                        ? apartment.family.id
                        : apartment.family,
                    service:
                      apartment.service && typeof apartment.service === "object"
                        ? apartment.service.id
                        : apartment.service,
                  })),
                })),
              }
            : { name: "", address: "", floors: [] }
        }
        mode={formMode}
        title={formMode === "edit" ? "Edit Building" : "Add Building"}
        fields={[
          { name: "name", label: "Building Name", type: "text", rules: [{ required: true }] },
          { name: "address", label: "Address", type: "text", rules: [{ required: true }] },
          {
            name: "floors",
            label: "Floors",
            type: "list",
            nested: true,
          },
        ]}
        families={families}
        services={services}
        partners={partners}
      />
    </div>
  );
};

export default BuildingsPage;
