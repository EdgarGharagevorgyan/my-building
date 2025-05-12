import { Modal, Form, Input, Select, Button, Space, message, FormListFieldData } from "antd";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AntdErrorFallback from "./AntdErrorFallback";
import {Family, Service, Partner, FieldConfig, Apartment, Floor, Member, FormValues, DynamicFormProps} from "./types"


const logError = (error: Error, info: { componentStack?: string | null }) => {
  console.error("ErrorBoundary caught an error:", error);
  console.error("Component stack:", info.componentStack || "No stack available.");
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  mode = "add",
  title,
  fields,
  families,
  services,
  partners,
}) => {
  const [form] = Form.useForm();
  const [phoneValue, setPhoneValue] = useState<string>("+");

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
      .then((values: FormValues) => {
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement> & InputEvent) => {
    const current = phoneValue;
    const nextChar = e.data;
    const isFirstPlus = nextChar === "+" && current.length === 0;
    const isDigit = /^\d$/.test(nextChar || "");

    if (!isDigit && !isFirstPlus) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text");
    if (!/^\+?\d*$/.test(pasted)) {
      e.preventDefault();
    }
  };

  return (
    <ErrorBoundary
      FallbackComponent={AntdErrorFallback}
      onError={logError}
      onReset={() => window.location.reload()}
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
                      {fields.map((floorField, index) => (
                        <div key={floorField.key} style={{ marginBottom: 16 }}>
                          <p>
                            <strong>Floor Number:</strong> {index + 1}
                          </p>
                          <Form.List name={[floorField.name, "apartments"]}>
                            {(apartmentFields, { add: addApartment, remove: removeApartment }) => (
                              <>
                                {apartmentFields.map((apartmentField, aptIndex) => (
                                  <div key={apartmentField.key} style={{ marginBottom: 16 }}>
                                    <Form.Item
                                      name={[apartmentField.name, "number"]}
                                      fieldKey={[apartmentField.fieldKey!, "number"]}
                                      rules={[
                                        { required: true, message: "Apartment Number is required" },
                                      ]}
                                    >
                                      <Input placeholder="Apartment Number" />
                                    </Form.Item>
                                    <Form.Item
                                      name={[apartmentField.name, "family"]}
                                      fieldKey={[apartmentField.fieldKey!, "family"]}
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
                                      fieldKey={[apartmentField.fieldKey!, "service"]}
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
                                    onClick={() => remove(floorField.name)}
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
                            fieldKey={[fieldKey!, "fullName"]}
                            style={{ flex: 2 }}
                          >
                            <Input placeholder="Full Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "age"]}
                            fieldKey={[fieldKey!, "age"]}
                            style={{ flex: 1 }}
                          >
                            <Input type="number" placeholder="Age" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "role"]}
                            fieldKey={[fieldKey!, "role"]}
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
                  <Input
                    type="text"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    onBeforeInput={handleBeforeInput}
                    onPaste={handlePaste}
                  />
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
