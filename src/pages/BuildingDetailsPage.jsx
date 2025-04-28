import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updateBuilding } from "../features/buildings/buildingsSlice";

const BuildingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const building = useSelector((state) =>
    state.buildings.buildings.find((b) => b.id === parseInt(id))
  );

  const families = useSelector((state) => state.families.families); // Get families from Redux
  const services = useSelector((state) => state.services.services); // Get services from Redux

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!building) {
    return <p>Building not found!</p>;
  }

  // Debugging logs
  console.log("Families:", families);
  console.log("Services:", services);
  console.log("Building:", building);

  // Format the date to "YYYY-MM-DD HH:mm"
  const formatDate = (isoString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(isoString));
  };

  // Flatten the data for the table
  const tableData = [
    ...(building.floors?.flatMap((floor) =>
      floor.apartments?.map((apartment) => {
        // Handle both object and ID cases for family and service
        const familyId =
          apartment.family && typeof apartment.family === "object"
            ? apartment.family.id
            : apartment.family;
        const serviceId =
          apartment.service && typeof apartment.service === "object"
            ? apartment.service.id
            : apartment.service;

        const family = families.find((f) => f.id === familyId) || null; // Resolve family by ID
        const service = services.find((s) => s.id === serviceId) || null; // Resolve service by ID

        // Debugging logs
        console.log("Apartment:", apartment);
        console.log("Resolved Family:", family);
        console.log("Resolved Service:", service);

        return {
          key: `apartment-${floor.id}-${apartment.id}`, // Unique key for each row
          floorNumber: floor.number,
          apartmentNumber: apartment.number,
          familyName: family?.name || "N/A", // Display family name or "N/A"
          serviceName: service?.name || "N/A", // Display service name or "N/A"
          partnerName: service?.partner?.companyName || "N/A", // Display partner name or "N/A"
        };
      })
    ) || []),
  ];

  // Debugging log for tableData
  console.log("Final Table Data:", tableData);

  // Define table columns
  const columns = [
    {
      title: "Floor Number",
      dataIndex: "floorNumber",
      key: "floorNumber",
    },
    {
      title: "Apartment Number",
      dataIndex: "apartmentNumber",
      key: "apartmentNumber",
    },
    {
      title: "Family Name",
      dataIndex: "familyName",
      key: "familyName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Partner Name",
      dataIndex: "partnerName",
      key: "partnerName",
    },
  ];

  const handleEdit = (values) => {
    const updatedBuilding = {
      ...building,
      ...values,
      floors: values.floors?.map((floor) => ({
        ...floor,
        apartments: floor.apartments?.map((apartment) => ({
          ...apartment,
          family:
            apartment.family && typeof apartment.family === "object"
              ? apartment.family.id
              : apartment.family, // Save family ID or null
          service:
            apartment.service && typeof apartment.service === "object"
              ? apartment.service.id
              : apartment.service, // Save service ID or null
        })),
      })),
    };

    dispatch(updateBuilding(updatedBuilding));
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{building.name}</h2>
      <p>
        <strong>Address:</strong> {building.address}
      </p>
      <p>
        <strong>Created At:</strong> {formatDate(building.createdAt)}
      </p>
      <p>
        <strong>Updated At:</strong> {formatDate(building.updatedAt)}
      </p>
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => navigate("/buildings")}>
          Return to Buildings
        </Button>
        <Button type="default" style={{ marginLeft: 8 }} onClick={() => setIsModalVisible(true)}>
          Edit
        </Button>
      </div>

      <DynamicForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={{
          name: building.name,
          address: building.address,
          floors:
            building.floors?.map((floor) => ({
              ...floor,
              apartments: floor.apartments?.map((apartment) => ({
                ...apartment,
                family: apartment.family?.id || apartment.family || null, // Ensure family ID is passed
                service: apartment.service?.id || apartment.service || null, // Ensure service ID is passed
              })),
            })) || [], // Default to an empty array if undefined
        }}
        mode="edit"
        title="Edit Building"
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
        families={families} // Pass families array
        services={services} // Pass services array
      />
    </div>
  );
};

export default BuildingDetailsPage;
