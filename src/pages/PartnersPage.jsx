import { useSelector } from "react-redux";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const PartnersPage = () => {
  const navigate = useNavigate();
  const partners = useSelector((state) => state.partners.partners);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={partners}
        onRow={(record) => ({
          onClick: () => navigate(`/partners/${record.id}`),
        })}
        rowKey="id"
      />
    </div>
  );
};

export default PartnersPage;
