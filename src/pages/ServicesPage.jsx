import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Popconfirm } from "antd";
import {
  addService,
  updateService,
  deleteService,
  setServices,
} from "../features/services/servicesSlice";
import DynamicForm from "../components/DynamicForm";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentService, setCurrentService] = useState(null);

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => {
              setFormMode("edit");
              setCurrentService(record);
              setIsModalVisible(true);
            }}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this service?"
            onConfirm={() => dispatch(deleteService(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleAddService = () => {
    setFormMode("add");
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      dispatch(addService({ id: Date.now(), ...values }));
    } else if (formMode === "edit") {
      dispatch(updateService({ ...currentService, ...values }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={handleAddService} type="primary" style={{ marginBottom: 16 }}>
        Add Service
      </Button>
      <Table columns={columns} dataSource={services} rowKey="id" pagination={false} />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentService || { name: "" }}
        mode={formMode}
      />
    </div>
  );
};

export default ServicesPage;
