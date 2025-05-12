import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AntdErrorFallback from "./AntdErrorFallback";
import PhoneInput from "./PhoneInput";
import FloorList from "./FloorList";
import MemberList from "./MemberList";
import { FormValues, DynamicFormProps } from "./types";

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
        const selectedPartner = partners.find((p) => p.id === initialValues.partner);
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
  }, [visible, initialValues, partners, form]);

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
      .catch((err) => {
        console.error("Validation failed:", err);
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

    if (!isDigit && !isFirstPlus) e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text");
    if (!/^\+?\d*$/.test(pasted)) e.preventDefault();
  };

  return (
    <ErrorBoundary FallbackComponent={AntdErrorFallback} onError={logError}>
      <Modal
        open={visible}
        title={title || (mode === "edit" ? "Edit Item" : "Add Item")}
        onCancel={onCancel}
        onOk={handleOk}
      >
        <Form form={form} initialValues={initialValues} layout="vertical">
          {fields.map((field) => {
            if (field.type === "list" && field.name === "floors") {
              return <FloorList key="floors" families={families} services={services} />;
            }
            if (field.type === "list" && field.name === "members") {
              return <MemberList key="members" />;
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
                      const selected = partners.find((p) => p.id === value);
                      if (selected) {
                        form.setFieldsValue({
                          contactPerson: selected.contactPerson,
                          phone: selected.phone,
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
                  <PhoneInput
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
