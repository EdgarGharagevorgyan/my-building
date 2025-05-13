import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Space, Popconfirm } from "antd";
import DynamicForm from "../components/DynamicForm";
import { updateFamily, deleteFamily } from "../features/families/familiesSlice";
import type { RootState } from "../app/store/store";
import type { Family, Member, FormValues } from "../components/types";

const FamilyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const families = useSelector((state: RootState) => state.families.families);
  const services = useSelector((state: RootState) => state.services.services);
  const partners = useSelector((state: RootState) => state.partners.partners);
  const family = families.find((f) => f.id === id);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!family) {
      navigate("/families");
    }
  }, [family, navigate]);

  if (!family) return null; 

  const formatDate = (isoString?: string): string => {
    if (!isoString) return "N/A";
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

  const handleEdit = (values: FormValues) => {
    const timestamp = new Date().toISOString();
    const updatedMembers: Member[] = (values.members || []).map((member) => ({
      ...member,
      createdAt: member.createdAt || timestamp,
      updatedAt: timestamp,
    }));

    const updatedFamily: Family = {
      ...family,
      ...values,
      members: updatedMembers,
      updatedAt: timestamp,
    };

    dispatch(updateFamily(updatedFamily));
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    dispatch(deleteFamily(family.id));
    navigate(`/families`);
  };

  const memberColumns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: Member, b: Member) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: Member, b: Member) => a.age - b.age,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a: Member, b: Member) => a.role.localeCompare(b.role),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: Member, b: Member) =>
        new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
      render: (text: string) => formatDate(text),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a: Member, b: Member) =>
        new Date(a.updatedAt!).getTime() - new Date(b.updatedAt!).getTime(),
      render: (text: string) => formatDate(text),
    },
  ];

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
      <Table
        dataSource={[
          {
            key: family.id,
            name: family.name,
            createdAt: family.createdAt,
            updatedAt: family.updatedAt,
          },
        ]}
        columns={[
          {
            title: "Family Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => formatDate(text),
          },
          {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text: string) => formatDate(text),
          },
        ]}
        pagination={false}
        style={{ marginBottom: 24 }}
      />

      <Card title="Members" bordered={false}>
        <Table
          dataSource={family.members.map((member, index) => ({
            key: index,
            ...member,
          }))}
          columns={memberColumns}
          pagination={false}
        />
        <div style={{ marginTop: 16 }}>
          <Space>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this family?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </Card>

      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => navigate("/families")}>
          Return to Families
        </Button>
      </div>

      <DynamicForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={{
          name: family.name,
          members: family.members,
        }}
        mode="edit"
        title="Edit Family"
        fields={[
          {
            name: "name",
            label: "Family Name",
            type: "text",
            rules: [{ required: true }],
          },
          {
            name: "members",
            label: "Members",
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

export default FamilyDetailsPage;
