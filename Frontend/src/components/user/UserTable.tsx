import { useEffect, useState } from "react";
import { Table, Tag, Button, Input, message, Dropdown, Modal } from "antd";
import {
  SearchOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import CreateUserModal from "./CreateUserModal";
import EditUserDrawer from "./EditUserDrawer";
import supabase from "../../../supabaseClient";

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      message.error("Failed to fetch users: " + error.message);
    } else {
      setUsers(data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMenuClick = (key: string, record: any) => {
    if (key === "edit") {
      setEditingUser(record);
      setDrawerVisible(true);
    } else if (key === "delete") {
      Modal.confirm({
        title: "Are you sure you want to delete this user?",
        icon: <ExclamationCircleOutlined />,
        content: "This action cannot be undone.",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          const { error } = await supabase
            .from("profiles")
            .delete()
            .eq("id", record.id);
          if (error) {
            message.error("Failed to delete user: " + error.message);
          } else {
            message.success("User deleted");
            fetchUsers();
          }
        },
      });
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <Tag color="blue">{email}</Tag>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "orange" : "green"}>{role}</Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              { key: "edit", label: "Edit" },
              { key: "delete", label: "Delete", danger: true },
            ],
            onClick: ({ key }) => handleMenuClick(key, record),
          }}
        >
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <label style={{ fontWeight: "bold", fontSize: 18 }}>Users</label>
        <Button
          style={{
            backgroundColor: "#FBBC04",
            borderColor: "#FBBC04",
            color: "black",
          }}
          onClick={() => setModalOpen(true)}
        >
          Create User
        </Button>
      </div>

      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{ width: 300, marginBottom: 20 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={users.filter((u) =>
          u.name?.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <CreateUserModal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          fetchUsers();
        }}
      />

      <EditUserDrawer
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onRefresh={fetchUsers}
      />
    </div>
  );
};

export default UserTable;
