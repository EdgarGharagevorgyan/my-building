import React from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { Family, Service } from "./types";

interface FloorListProps {
  families: Family[];
  services: Service[];
}

const FloorList: React.FC<FloorListProps> = ({ families, services }) => (
  <Form.List name="floors">
    {(floorFields, { add: addFloor, remove: removeFloor }) => (
      <>
        {floorFields.map((floorField, floorIndex) => (
          <div key={floorField.key} style={{ marginBottom: 16 }}>
            <p>
              <strong>Floor Number:</strong> {floorIndex + 1}
            </p>
            <Form.List name={[floorField.name, "apartments"]}>
              {(apartmentFields, { add: addApartment, remove: removeApartment }) => (
                <>
                  {apartmentFields.map((apartmentField) => (
                    <div key={apartmentField.key} style={{ marginBottom: 16 }}>
                      <Form.Item
                        name={[apartmentField.name, "number"]}
                        rules={[{ required: true, message: "Apartment Number is required" }]}
                      >
                        <Input placeholder="Apartment Number" />
                      </Form.Item>
                      <Form.Item name={[apartmentField.name, "family"]}>
                        <Select
                          placeholder="Select Family"
                          options={families.map((f) => ({ label: f.name, value: f.id }))}
                        />
                      </Form.Item>
                      <Form.Item name={[apartmentField.name, "service"]}>
                        <Select
                          placeholder="Select Service"
                          options={services.map((s) => ({ label: s.name, value: s.id }))}
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
                    <Button type="default" danger onClick={() => removeFloor(floorField.name)}>
                      Remove Floor
                    </Button>
                  </Space>
                </>
              )}
            </Form.List>
          </div>
        ))}
        <Button type="dashed" onClick={() => addFloor()}>
          Add Floor
        </Button>
      </>
    )}
  </Form.List>
);

export default FloorList;
