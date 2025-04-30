import { Modal, Form, Input, Select, Button, Space, message } from "antd";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AntdErrorFallback from "./AntdErrorFallback";

const logError = (error, info) => {
  console.error("ErrorBoundary caught an error:", error);
  console.error("Component stack:", info.componentStack);
};

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
  partners, 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues?.partner) {
        const selectedPartner = partners.find((partner) => partner.id === initialValues.partner);
        if (selectedPartner) {
          form.setFieldsValue({
            ...initialValues,
            contactPerson: selectedPartner.contactPerson,
            phone: selectedPartner.phone,
          });
        } else {
          form.setFieldsValue(initialValues);
        }
      } else {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form, partners]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (JSON.stringify(values) === JSON.stringify(initialValues)) {
          form.resetFields();
          onCancel();
          return;
        }
        onSubmit(values);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
        message.error("Please fill in all required fields correctly.");
      });
  };

  return (
    <ErrorBoundary
      FallbackComponent={AntdErrorFallback} // Fallback UI for errors
      onError={logError} // Log errors for debugging
      onReset={() => {
        console.log("Resetting error boundary...");
        window.location.reload(); // Reset the app state
      }}
    >
      <Modal
        open={visible}
        title={title || (mode === "edit" ? "Edit Item" : "Add Item")}
        onCancel={onCancel}
        onOk={handleOk}
      >
        <Form form={form} initialValues={initialValues} layout="vertical">
          {fields.map((field) => {
            if (field.type === "list" && field.name === "floors") {
              return (
                <Form.List key={field.name} name={field.name}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((fieldItem, index) => (
                        <div
                          key={`floor-${fieldItem.key}-${index}`}
                          style={{ marginBottom: "16px" }}
                        >
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
                                <Space>
                                  <Button type="dashed" onClick={() => addApartment()}>
                                    Add Apartment
                                  </Button>
                                  <Button
                                    type="default"
                                    danger
                                    onClick={() => remove(fieldItem.name)}
                                  >
                                    Remove Floor
                                  </Button>
                                </Space>
                              </>
                            )}
                          </Form.List>
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
                          <Button
                            type="link"
                            danger
                            onClick={() => remove(name)}
                            style={{ flex: 0 }}
                          >
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

            if (field.type === "select") {
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules || [{ required: true, message: `${field.label} is required` }]}
                >
                  <Select
                    options={field.options}
                    onChange={(value) => {
                      const selectedPartner = partners.find((partner) => partner.id === value);
                      if (selectedPartner) {
                        form.setFieldsValue({
                          contactPerson: selectedPartner.contactPerson,
                          phone: selectedPartner.phone,
                        });
                      }
                    }}
                  />
                </Form.Item>
              );
            }

            return (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules || [{ required: true, message: `${field.label} is required` }]}
              >
                {field.name === "phone" ? (
                  <Input type="number" />
                ) : (
                  <Input />
                )}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </ErrorBoundary>
  );
};

export default DynamicForm;
