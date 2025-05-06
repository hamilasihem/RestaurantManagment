import { useEffect, useState } from "react";
import { Table, Tag, Button, Input, message, Dropdown } from "antd";
import {
  SearchOutlined,
  EllipsisOutlined,
  
} from "@ant-design/icons";

import supabase from "../../../supabaseClient";
import CreateMenuModal from "./CreateMenuModal";

import DeleteMenu from "./DeleteMenu";
import EditMenuDrawer from "./EditMenuDrawer";


const MenuTable = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menus").select("*");
    if (error) {
      message.error("Failed to fetch menus: " + error.message);
    } else {
      setMenus(data || []);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleMenuClick = (key: string, record: any) => {
    if (key === "edit") {
      setEditingMenu(record);
      setDrawerVisible(true);
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
      title: "Plats",
      dataIndex: "plat",
      key: "plat",
      render: (plats: any) => {
        if (!Array.isArray(plats)) return <Tag color="red">Invalid Data</Tag>;

        return (
          <>
            {plats.map((plat: string) => (
              <Tag key={plat}>{plat}</Tag>
            ))}
          </>
        );
      },
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
              {
                key: "edit",
                label: (
                  <EditMenuDrawer
                    onClick={() => handleMenuClick("edit", record)}
                  />
                ),
              },
              {
                key: "delete",
                label: <DeleteMenu menuId={record.id} onDeleted={fetchMenus} />,
                danger: true,
              },
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
        <label style={{ fontWeight: "bold", fontSize: 18 }}>Menus</label>
        <Button
          style={{
            backgroundColor: "#FBBC04",
            borderColor: "#FBBC04",
            color: "black",
          }}
          onClick={() => setModalOpen(true)}
        >
          Create Menu
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
        dataSource={menus.filter((u) =>
          u.name?.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <CreateMenuModal
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          fetchMenus();
        }}
        onCreate={() => {
          setModalOpen(false);
          fetchMenus();
        }}
      />

      <EditMenuDrawer
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setEditingMenu(null);
        }}
        menu={editingMenu}
        onRefresh={fetchMenus}
      />
    </div>
  );
  
};


export default MenuTable;
