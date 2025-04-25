import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Popconfirm } from "antd";
import {
  addPartner,
  updatePartner,
  deletePartner,
  setPartners,
} from "../features/partners/partnersSlice";
import DynamicForm from "../components/DynamicForm";

const PartnersPage = () => {
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners.partners);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentPartner, setCurrentPartner] = useState(null);

  const columns = [
    {
      title: "Partner Name",
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
              setCurrentPartner(record);
              setIsModalVisible(true);
            }}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this partner?"
            onConfirm={() => dispatch(deletePartner(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleAddPartner = () => {
    setFormMode("add");
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      dispatch(addPartner({ id: Date.now(), ...values }));
    } else if (formMode === "edit") {
      dispatch(updatePartner({ ...currentPartner, ...values }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={handleAddPartner} type="primary" style={{ marginBottom: 16 }}>
        Add Partner
      </Button>
      <Table columns={columns} dataSource={partners} rowKey="id" pagination={false} />
      <DynamicForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleFormSubmit}
        initialValues={currentPartner || { name: "" }}
        mode={formMode}
      />
    </div>
  );
};

export default PartnersPage;
