import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "antd";
import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import { updateFamily } from "../features/families/familiesSlice";

const FamilyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const family = useSelector((state) =>
    state.families.families.find((f) => f.id === parseInt(id))
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!family) {
    return <p>Family not found!</p>;
  }

  const handleEdit = (values) => {
    dispatch(updateFamily({ ...family, ...values }));
    setIsModalVisible(false);
    navigate(`/families`); // Navigate back to the table after editing
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title={family.name} bordered={false}>
        <p>
          <strong>Members:</strong> {family.members.length}
        </p>
        <Button type="primary" onClick={() => navigate(`/families`)}>
          Return to Table
        </Button>
        <Button
          type="default"
          style={{ marginLeft: 8 }}
          onClick={() => setIsModalVisible(true)} // Open the edit modal
        >
          Edit
        </Button>
      </Card>

      <DynamicForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={{
          name: family.name,
        }}
        mode="edit"
        title="Edit Family"
        fields={[
          { name: "name", label: "Family Name", rules: [{ required: true }] },
        ]}
      />
    </div>
  );
};

export default FamilyDetailsPage;
