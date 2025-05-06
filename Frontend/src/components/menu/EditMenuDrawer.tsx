import { Drawer, Form, Input, Button, Select, message } from "antd";
import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";

const { Option } = Select;

const EditMenuDrawer = ({
  visible,
  onClose,
  menu,
  onRefresh,
}: {
  visible: boolean;
  onClose: () => void;
  menu: any;
  onRefresh: () => void;
}) => {
  const [form] = Form.useForm();
  const [plats, setPlats] = useState<string[]>([]);

  useEffect(() => {
    if (menu) {
      form.setFieldsValue(menu);
    } else {
      form.resetFields();
    }
  }, [menu, form]);

  useEffect(() => {
    const fetchPlats = async () => {
      const { data, error } = await supabase.from("plats").select("name");
      if (error) {
        message.error("Erreur lors du chargement des plats : " + error.message);
      } else {
        setPlats(data.map((p) => p.name));
      }
    };

    fetchPlats();
  }, []);

  const handleUpdate = async (values: any) => {
    const { error } = await supabase
      .from("menus")
      .update({
        name: values.name,
        plats: values.plats,
      })
      .eq("id", menu.id);

    if (error) {
      message.error("Failed to update menu: " + error.message);
    } else {
      message.success("Menu updated successfully");
      onClose();
      onRefresh();
    }
  };

  return (
    <Drawer
      title="Edit Menu"
      width={400}
      onClose={onClose}
      open={visible}
      destroyOnClose
      styles={{ body: { paddingBottom: 80 } }}
    >
      <Form layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item name="name" label="Menu Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="plats"
          label="Plats"
          rules={[
            { required: true, message: "Please select at least one plat" },
          ]}
        >
          <Select mode="multiple" placeholder="Select plats">
            {plats.map((plat) => (
              <Option key={plat} value={plat}>
                {plat}
              </Option>
            ))}
          </Select>
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


export default EditMenuDrawer;
