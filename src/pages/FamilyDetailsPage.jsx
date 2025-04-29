import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Space, Popconfirm } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updateFamily, deleteFamily } from "../features/families/familiesSlice";

const FamilyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const family = useSelector((state) => state.families.families.find((f) => f.id === parseInt(id)));

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!family) {
    return <p>Family not found!</p>;
  }

  // Format the date to "YYYY-MM-DD HH:mm"
  const formatDate = (isoString) => {
    if (!isoString) return "N/A"; // Return "N/A" if date is invalid
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

  const handleEdit = (values) => {
    const timestamp = new Date().toISOString();
    const updatedMembers = values.members.map((member) => ({
      ...member,
      createdAt: member.createdAt || timestamp,
      updatedAt: timestamp,
    }));

    const updatedFamily = {
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

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (text) => formatDate(text),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      render: (text) => formatDate(text),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
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
            render: (text) => formatDate(text), // Format date
          },
          {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => formatDate(text), // Format date
          },
        ]}
        pagination={false}
        style={{ marginBottom: 24 }}
      />

      <Card title="Members" bordered={false}>
        <Table
          dataSource={family.members.map((member, index) => ({
            key: index,
            fullName: member.fullName,
            age: member.age,
            role: member.role,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
          }))}
          columns={columns}
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
          { name: "name", label: "Family Name", rules: [{ required: true }] },
          {
            name: "members",
            label: "Members",
            type: "list",
            nested: true,
          },
        ]}
      />
    </div>
  );
};

export default FamilyDetailsPage;
