import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updateBuilding } from "../features/buildings/buildingsSlice";
import { RootState } from "../app/store/store";
import {
  Building,
  Family,
  Service,
  Partner,
  Floor,
  Apartment,
  FormValues,
} from "../components/types";

const BuildingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const building = useSelector((state: RootState) =>
    state.buildings.buildings.find((b) => b.id === id)
  );

  const families = useSelector((state: RootState) => state.families.families);
  const services = useSelector((state: RootState) => state.services.services);
  const partners = useSelector((state: RootState) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!building) {
    return <p>Building not found!</p>;
  }

  const formatDate = (isoString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(isoString));
  };

  const tableData = [
    ...(building.floors?.flatMap((floor) =>
      floor.apartments?.map((apartment) => {
        const familyId =
          apartment.family && typeof apartment.family === "object"
            ? (apartment.family as Family).id
            : apartment.family;
        const serviceId =
          apartment.service && typeof apartment.service === "object"
            ? (apartment.service as Service).id
            : apartment.service;

        const family = families.find((f) => f.id === familyId) || null;
        const service = services.find((s) => s.id === serviceId) || null;

        return {
          key: `apartment-${floor.id}-${apartment.id}`,
          floorNumber: floor.number,
          apartmentNumber: apartment.number,
          familyName: family?.name || "N/A",
          serviceName: service?.name || "N/A",
          partnerName: service?.partner?.companyName || "N/A",
        };
      })
    ) || []),
  ];

  const columns = [
    {
      title: "Floor Number",
      dataIndex: "floorNumber",
      key: "floorNumber",
      sorter: (a: { floorNumber: number }, b: { floorNumber: number }) =>
        a.floorNumber - b.floorNumber,
    },
    {
      title: "Apartment Number",
      dataIndex: "apartmentNumber",
      key: "apartmentNumber",
      sorter: (a: { apartmentNumber: number }, b: { apartmentNumber: number }) =>
        a.apartmentNumber - b.apartmentNumber,
    },
    {
      title: "Family Name",
      dataIndex: "familyName",
      key: "familyName",
      sorter: (a: { familyName: string }, b: { familyName: string }) =>
        a.familyName.localeCompare(b.familyName),
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      sorter: (a: { serviceName: string }, b: { serviceName: string }) =>
        a.serviceName.localeCompare(b.serviceName),
    },
    {
      title: "Partner Name",
      dataIndex: "partnerName",
      key: "partnerName",
      sorter: (a: { partnerName: string }, b: { partnerName: string }) =>
        a.partnerName.localeCompare(b.partnerName),
    },
  ];

  const handleEdit = (values: FormValues) => {
    const updatedBuilding: Building = {
      ...building,
      ...values,
      floors:
        values.floors?.map((floor: Floor) => ({
          ...floor,
          apartments: floor.apartments?.map((apartment: Apartment) => ({
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
        })) || [],
    };

    dispatch(updateBuilding(updatedBuilding));
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
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
            building.floors?.map((floor: Floor) => ({
              ...floor,
              apartments: floor.apartments?.map((apartment: Apartment) => ({
                ...apartment,
                family:
                  apartment.family && typeof apartment.family === "object"
                    ? apartment.family.id
                    : apartment.family || null,
                service:
                  apartment.service && typeof apartment.service === "object"
                    ? apartment.service.id
                    : apartment.service || null,
              })),
            })) || [],
        }}
        mode="edit"
        title="Edit Building"
        fields={[
          { name: "name", label: "Building Name", rules: [{ required: true }], type: "text" },
          { name: "address", label: "Address", rules: [{ required: true }], type: "text" },
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

export default BuildingDetailsPage;
