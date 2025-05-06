import React from "react";
import { Button, Menu } from "antd";
import {
  DashboardOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ProfileOutlined,
  CalendarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { handleLogout } from "../../api/handleLogout";
import { useNavigate } from "react-router-dom";



type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Jhon Doe",
    icon: <UserOutlined />,
  },
  {
    key: "sub2",
    label: "Dashboards",
    type: "group",
    children: [
      { key: "1", label: "Overview", icon: <DashboardOutlined /> },
      { key: "2", label: "Plat", icon: <PieChartOutlined /> },
      { key: "3", label: "Menu", icon: <UnorderedListOutlined /> },
    ],
  },
  {
    key: "sub3",
    label: "Users",
    icon: <UserOutlined />,
    children: [
      { key: "4", label: "Admin" },
      { key: "5", label: "RH" },
      { key: "6", label: "Cuisinier" },
      { key: "7", label: "Employer" },
      { key: "8", label: "Followers" },
    ],
  },
  {
    key: "sub4",
    label: "Profile",
    icon: <ProfileOutlined />,
  },
  {
    key: "sub5",
    label: "Reservation",
    icon: <CalendarOutlined />,
  },
  {
    key: "sub6",
    label: "Blog",
    icon: <BookOutlined />,
  },
];



const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if (e.key === "2") {
      navigate("/plats");
    }
   if (e.key === "3") {
    navigate("/menu");
   }
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub2"]}
        mode="inline"
        items={items}
      />
      <div style={{ marginTop: 400, textAlign: "left", paddingLeft: 16 }}>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};



export default Sidebar;
