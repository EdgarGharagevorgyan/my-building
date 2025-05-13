import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Space } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updatePartner } from "../features/partners/partnersSlice";
import { RootState } from "../app/store/store";
import { Partner, FormValues, PartnerTableRow } from "../components/types";

const PartnerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const partner = useSelector((state: RootState) =>
    state.partners.partners.find((p) => p.id === id)
  );

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  if (!partner) {
    return <p>Partner not found!</p>;
  }

  const handleEdit = (values: FormValues) => {
    const updatedPartner: Partner = { ...partner, ...values };
    dispatch(updatePartner(updatedPartner));
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      id: "companyName",
      sorter: (a: PartnerTableRow, b: PartnerTableRow) =>
        a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      id: "contactPerson",
      sorter: (a: PartnerTableRow, b: PartnerTableRow) =>
        a.contactPerson.localeCompare(b.contactPerson),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      id: "phone",
      sorter: (a: PartnerTableRow, b: PartnerTableRow) => a.phone.localeCompare(b.phone),
    },
  ];

  const tableData: PartnerTableRow[] = [
    {
      id: partner.id,
      companyName: partner.companyName,
      contactPerson: partner.contactPerson,
      phone: partner.phone,
    },
  ];

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
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
          { name: "companyName", label: "Company Name", rules: [{ required: true }], type: "text" },
          {
            name: "contactPerson",
            label: "Contact Person",
            rules: [{ required: true }],
            type: "text",
          },
          { name: "phone", label: "Phone", rules: [{ required: true }], type: "text" },
        ]}
        families={[]} 
        services={[]}
        partners={[]}
      />
    </div>
  );
};

export default PartnerDetailsPage;
