// src/components/DeleteMenu.tsx

import React from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import supabase from "../../../supabaseClient";

interface DeleteMenuProps {
  menuId: number;
  onDeleted: () => void;
}

const DeleteMenu: React.FC<DeleteMenuProps> = ({ menuId, onDeleted }) => {
  const confirmDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this menu?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const { error } = await supabase
          .from("menus")
          .delete()
          .eq("id", menuId);
        if (error) {
          message.error("Failed to delete menu: " + error.message);
        } else {
          message.success("Menu deleted successfully");
          onDeleted();
        }
      },
    });
  };

  // Ce composant n'affiche rien, il est déclenché par une action externe
  return <span onClick={confirmDelete}>Delete</span>;
};

export default DeleteMenu;
