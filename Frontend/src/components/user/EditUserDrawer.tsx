import { Drawer, Form, Input, Button, message, Select } from "antd";
import { useEffect } from "react";
import supabase from "../../../supabaseClient";

const { Option } = Select;

const EditUserDrawer = ({
  visible,
  onClose,
  user,
  onRefresh,
}: {
  visible: boolean;
  onClose: () => void;
  user: any;
  onRefresh: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleUpdate = async (values: any) => {
    const { error } = await supabase
      .from("profiles")
      .update(values)
      .eq("id", user.id);

    if (error) {
      message.error("Failed to update user: " + error.message);
    } else {
      message.success("User updated successfully");
      onClose();
      onRefresh();
    }
  };

  return (
    <Drawer
      title="Edit User"
      width={400}
      onClose={onClose}
      open={visible}
      destroyOnClose
      styles={{ body: { paddingBottom: 80 } }}
    >
      <Form layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="employé">Employé</Option>
            <Option value="cuisinier">Cuisinier</Option>
            <Option value="rh">RH</Option>
          </Select>
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default EditUserDrawer;
