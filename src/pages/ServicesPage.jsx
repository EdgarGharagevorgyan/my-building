import { useSelector } from "react-redux";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
  const services = useSelector((state) => state.services.services);

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Partner",
      dataIndex: ["partner", "companyName"],
      key: "partner",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={services}
        onRow={(record) => ({
          onClick: () => navigate(`/services/${record.id}`),
        })}
        rowKey="id"
      />
    </div>
  );
};

export default ServicesPage;
