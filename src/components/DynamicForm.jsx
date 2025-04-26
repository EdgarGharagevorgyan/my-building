import { Form, Input, Modal, Button } from "antd";

const DynamicForm = ({ visible, onCancel, onSubmit, initialValues, mode }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit Building" : "Add Building"}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Building Name"
          rules={[{ required: true, message: "Please input the building name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DynamicForm;
