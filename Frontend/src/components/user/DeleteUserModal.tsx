// src/components/DeleteUserModal.tsx
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import supabase from "../../../supabaseClient";

const DeleteUserModal = ({
  user,
  onRefresh,
}: {
  user: any;
  onRefresh: () => void;
}) => {
  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: `This action cannot be undone.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", user.id);

        if (error) {
          message.error("Failed to delete user: " + error.message);
        } else {
          message.success("User deleted");
          onRefresh();
        }
      },
    });
  };

  return <span onClick={showConfirm}>Delete</span>;
};

export default DeleteUserModal;
