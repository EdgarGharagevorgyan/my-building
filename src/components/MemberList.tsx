import React from "react";
import { Button, Form, Input } from "antd";

const MemberList: React.FC = () => (
  <Form.List name="members">
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, fieldKey, ...restField }) => (
          <div
            key={key}
            style={{ display: "flex", gap: "16px", marginBottom: "16px", alignItems: "start"}}
          >
            <Form.Item {...restField} name={[name, "fullName"]} style={{ flex: 2 }}>
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item {...restField} name={[name, "age"]} style={{ flex: 1 }}>
              <Input type="number" placeholder="Age" />
            </Form.Item>
            <Form.Item {...restField} name={[name, "role"]} style={{ flex: 2 }}>
              <Input placeholder="Role (e.g., Father, Mother, Child)" />
            </Form.Item>
            <Button type="default" danger onClick={() => remove(name)} style={{ flex: 0 }}>
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

export default MemberList;
