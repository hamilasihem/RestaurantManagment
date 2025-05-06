import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Modal,
  Typography,
  
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import supabase from "../../../supabaseClient";

const { Text } = Typography;

interface CreatPlatsProps {
  open: boolean;
  onCancel: () => void;
}

const CreatPlats: React.FC<CreatPlatsProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();

 const handleFinish = async (values: any) => {
   try {
     // 1. Récupérer le fichier uploadé
     const file = values.upload?.[0]?.originFileObj;

     let imageUrl = "";

     if (file) {
       const fileName = `${Date.now()}-${file.name}`;

       const {error: uploadError } = await supabase.storage
         .from("plats-images")
         .upload(fileName, file);

       if (uploadError) {
         throw uploadError;
       }

       // 2. Récupérer URL publique
       const { data: publicUrlData } = supabase.storage
         .from("plats-images")
         .getPublicUrl(fileName);

       imageUrl = publicUrlData.publicUrl;
     }

     // 3. Insérer le plat dans la table
     const { error: insertError } = await supabase.from("plats").insert([
       {
         name: values.name,
         price: values.price,
         description: values.description,
         image: imageUrl,
       },
     ]);

     if (insertError) {
       throw insertError;
     }

     form.resetFields();
     onCancel();
   } catch (error: any) {
     console.error("Error:", error.message);
   }
 };


  return (
    <Modal
      title={<span style={{ fontWeight: 600, fontSize: 20 }}>Create Plat</span>}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      style={{ top: 50 }}
      styles={{ body: { padding: 24 } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item
            label={
              <Text strong style={{ textTransform: "uppercase" }}>
                Name
              </Text>
            }
            name="name"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Enter name" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label={
              <Text strong style={{ textTransform: "uppercase" }}>
                Price
              </Text>
            }
            name="price"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber
              placeholder="Enter price"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <Text strong style={{ textTransform: "uppercase" }}>
              Description
            </Text>
          }
          name="description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 24,
          }}
        >
          <Button
            onClick={() => {
              form.resetFields();
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#FBBC04",
              borderColor: "#FBBC04",
              color: "black",
              fontWeight: 600,
            }}
          >
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatPlats;
