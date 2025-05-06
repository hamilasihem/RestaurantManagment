import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import supabase from "../../../supabaseClient";

interface CreateMenuProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
}

const { Option } = Select;

const CreateMenu: React.FC<CreateMenuProps> = ({
  visible,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm();
  const [platsOptions, setPlatsOptions] = useState<string[]>([]); // pour les plats dynamiques

  // Charger les plats depuis Supabase
  useEffect(() => {
    const fetchPlats = async () => {
      const { data, error } = await supabase.from("plats").select("name");

      if (error) {
        console.error("Erreur lors du chargement des plats :", error);
      } else {
        const noms = data.map((item) => item.name);
        setPlatsOptions(noms);
      }
    };

    if (visible) {
      fetchPlats(); // ne charge que si la modal est ouverte
    }
  }, [visible]);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const { error } = await supabase.from("menus").insert([
        {
          name: values.menuName,
          plats: values.plats, // tableau envoyé tel quel dans jsonb
        },
      ]);

      if (error) {
        console.error("Erreur lors de l'insertion du menu :", error);
        return;
      }

      onCreate(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Create Menu"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="create"
          type="primary"
          onClick={handleOk}
          style={{ backgroundColor: "#facc15", borderColor: "#facc15" }}
        >
          Create
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Menu Name"
          name="menuName"
          rules={[{ required: true, message: "Please enter the menu name" }]}
        >
          <Input placeholder="Enter menu name" />
        </Form.Item>

        <Form.Item
          label="Select Plats"
          name="plats"
          rules={[
            { required: true, message: "Please select at least one plat" },
          ]}
        >
          <Select mode="multiple" placeholder="Select plats">
            {platsOptions.map((plat) => (
              <Option key={plat} value={plat}>
                {plat}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMenu;
