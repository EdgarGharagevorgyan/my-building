import { Modal, Form, Input, Select, Button } from "antd";
import { useEffect } from "react";

const DynamicForm = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  mode,
  title,
  fields,
  families,
  services,
}) => {
  const [form] = Form.useForm();

  // Set form values when the modal is opened
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Compare submitted values with initial values
      if (JSON.stringify(values) === JSON.stringify(initialValues)) {
        // If no changes, just close the modal
        form.resetFields();
        onCancel();
        return;
      }

      // If there are changes, submit the updated values
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={title || (mode === "edit" ? "Edit Item" : "Add Item")}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} initialValues={initialValues} layout="vertical">
        {fields.map((field) => {
          if (field.type === "list" && field.name === "floors") {
            // Add Floor functionality for Add Building
            return (
              <Form.List key={field.name} name={field.name}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((fieldItem, index) => (
                      <div key={`floor-${fieldItem.key}-${index}`} style={{ marginBottom: "16px" }}>
                        <p>
                          <strong>Floor Number:</strong> {index + 1}
                        </p>
                        <Form.List name={[fieldItem.name, "apartments"]}>
                          {(apartmentFields, { add: addApartment, remove: removeApartment }) => (
                            <>
                              {apartmentFields.map((apartmentField, aptIndex) => (
                                <div
                                  key={`apartment-${apartmentField.key}-${aptIndex}`}
                                  style={{ marginBottom: "16px" }}
                                >
                                  <Form.Item
                                    name={[apartmentField.name, "number"]}
                                    fieldKey={[apartmentField.fieldKey, "number"]}
                                    rules={[
                                      { required: true, message: "Apartment Number is required" },
                                    ]}
                                  >
                                    <Input placeholder="Apartment Number" />
                                  </Form.Item>
                                  <Form.Item
                                    name={[apartmentField.name, "family"]}
                                    fieldKey={[apartmentField.fieldKey, "family"]}
                                    rules={[{ required: false }]}
                                  >
                                    <Select
                                      placeholder="Select Family"
                                      options={families.map((family) => ({
                                        label: family.name,
                                        value: family.id,
                                      }))}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name={[apartmentField.name, "service"]}
                                    fieldKey={[apartmentField.fieldKey, "service"]}
                                    rules={[{ required: false }]}
                                  >
                                    <Select
                                      placeholder="Select Service"
                                      options={services.map((service) => ({
                                        label: service.name,
                                        value: service.id,
                                      }))}
                                    />
                                  </Form.Item>
                                  <Button
                                    type="default"
                                    danger
                                    onClick={() => removeApartment(apartmentField.name)}
                                  >
                                    Remove Apartment
                                  </Button>
                                </div>
                              ))}
                              <Button type="dashed" onClick={() => addApartment()}>
                                Add Apartment
                              </Button>
                            </>
                          )}
                        </Form.List>
                        <Button
                          type="default"
                          danger
                          onClick={() => remove(fieldItem.name)}
                          style={{ marginTop: "8px" }}
                        >
                          Remove Floor
                        </Button>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()}>
                      Add Floor
                    </Button>
                  </>
                )}
              </Form.List>
            );
          }

          if (field.type === "list" && field.name === "members") {
            // Add Member functionality for Add Family
            return (
              <Form.List key={field.name} name={field.name}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: "16px",
                          alignItems: "center",
                        }}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "fullName"]}
                          fieldKey={[fieldKey, "fullName"]}
                          rules={[{ required: false }]}
                          style={{ flex: 2 }}
                        >
                          <Input placeholder="Full Name" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "age"]}
                          fieldKey={[fieldKey, "age"]}
                          rules={[{ required: false }]}
                          style={{ flex: 1 }}
                        >
                          <Input type="number" placeholder="Age" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "role"]}
                          fieldKey={[fieldKey, "role"]}
                          rules={[{ required: false }]}
                          style={{ flex: 2 }}
                        >
                          <Input placeholder="Role (e.g., Father, Mother, Child)" />
                        </Form.Item>
                        <Button type="link" danger onClick={() => remove(name)} style={{ flex: 0 }}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      Add Member
                    </Button>
                  </>
                )}
              </Form.List>
            );
          }

          return (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules || [{ required: true, message: `${field.label} is required` }]}
            >
              <Input />
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default DynamicForm;
