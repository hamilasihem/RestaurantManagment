import { Drawer, Form, Input, Button, message, } from "antd";
import { useEffect } from "react";
import supabase from "../../../supabaseClient";



const EditPlatsDrawer = ({
  visible,
  onClose,
  plat,
  onRefresh,
}: {
  visible: boolean;
  onClose: () => void;
  plat: any;
  onRefresh: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (plat) {
      form.setFieldsValue(plat);
    }
  }, [plat, form]);

  const handleUpdate = async (values: any) => {
    const { error } = await supabase
      .from("plats")
      .update(values)
      .eq("id", plat.id);

    if (error) {
      message.error("Failed to update plat: " + error.message);
    } else {
      message.success("plat updated successfully");
      onClose();
      onRefresh();
    }
  };

  return (
    <Drawer
      title="Edit Plat"
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
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name="description" label="Description">
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

export default EditPlatsDrawer;
