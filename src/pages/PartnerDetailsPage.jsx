import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Space } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updatePartner } from "../features/partners/partnersSlice";

const PartnerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const partner = useSelector((state) =>
    state.partners.partners.find((p) => p.id === parseInt(id))
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!partner) {
    return <p>Partner not found!</p>;
  }

  const handleEdit = (values) => {
    dispatch(updatePartner({ ...partner, ...values }));
    setIsModalVisible(false);
    // navigate(`/partners`); // Navigate back to the table after editing
  };

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

  const tableData = [
    {
      key: partner.id,
      companyName: partner.companyName,
      contactPerson: partner.contactPerson,
      phone: partner.phone,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <div style={{ marginTop: 16 }}>
        <Space>
          <Button type="primary" onClick={() => navigate(`/partners`)}>
            Return to Partners
          </Button>
          <Button type="default" onClick={() => setIsModalVisible(true)}>
            Edit
          </Button>
        </Space>
      </div>

      <DynamicForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={{
          companyName: partner.companyName,
          contactPerson: partner.contactPerson,
          phone: partner.phone,
        }}
        mode="edit"
        title="Edit Partner"
        fields={[
          { name: "companyName", label: "Company Name", rules: [{ required: true }] },
          { name: "contactPerson", label: "Contact Person", rules: [{ required: true }] },
          { name: "phone", label: "Phone", rules: [{ required: true }] },
        ]}
      />
    </div>
  );
};

export default PartnerDetailsPage;
