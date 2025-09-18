import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditUserModal = ({ visible, user, onCancel, onSave }) => {
  const [form] = Form.useForm();

  // When modal opens, load selected user into the form
  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company?.name,
        city: user.address?.city,
      });
    }
  }, [visible, user, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch((err) => console.log("Validation Failed:", err));
  };

  return (
    <Modal
      open={visible}
      title="Edit User"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Company" name="company">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
