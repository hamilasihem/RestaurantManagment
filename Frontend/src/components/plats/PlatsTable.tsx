import { useEffect, useState } from "react";
import { Table , Button, Input, message, Dropdown, Modal } from "antd";
import {
  SearchOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import CreatPlats from "./CreatPlats";
import EditPlatsDrawer from "./EditPlatsDrawer";
import supabase from "../../../supabaseClient";


const PlatsTable = () => {
  const [plats, setPlats] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlat, setEditingPlat] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchPlats = async () => {
    const { data, error } = await supabase.from("plats").select("*");
    if (error) {
      message.error("Failed to fetch plats: " + error.message);
    } else {
      setPlats(data || []);
    }
  };

  useEffect(() => {
    fetchPlats();
  }, []);

  const handleMenuClick = (key: string, record: any) => {
    if (key === "edit") {
      setEditingPlat(record);
      setDrawerVisible(true);
    } else if (key === "delete") {
      Modal.confirm({
        title: "Are you sure you want to delete this plat?",
        icon: <ExclamationCircleOutlined />,
        content: "This action cannot be undone.",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          const { error } = await supabase
            .from("plats")
            .delete()
            .eq("id", record.id);
          if (error) {
            message.error("Failed to delete plat: " + error.message);
          } else {
            message.success("Plat deleted");
            fetchPlats();
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="plat"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          "No image"
        ),
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
        <label style={{ fontWeight: "bold", fontSize: 18 }}>Plats</label>
        <Button
          style={{
            backgroundColor: "#FBBC04",
            borderColor: "#FBBC04",
            color: "black",
          }}
          onClick={() => setModalOpen(true)}
        >
          Create Plats
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
        dataSource={plats.filter((p) =>
          p.name?.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <CreatPlats
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          fetchPlats();
        }}
      />

      <EditPlatsDrawer
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingPlat(null);
        }}
        plat={editingPlat}
        onRefresh={fetchPlats}
      />
    </div>
  );
};

export default PlatsTable;
