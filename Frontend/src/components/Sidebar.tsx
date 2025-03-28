import React from "react";
import { Menu } from "antd";
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



type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Dashboards",
    type: "group",
    children: [
      { key: "1", label: "Overview", icon: <DashboardOutlined /> },
      { key: "2", label: "Plat", icon: <PieChartOutlined /> },
      { key: "3", label: "Menu", icon: <UnorderedListOutlined /> },
    ],
  },
  {
    key: "sub2",
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
    key: "sub3",
    label: "Profile",
    icon: <ProfileOutlined />,
  },
  {
    key: "sub4",
    label: "Reservation",
    icon: <CalendarOutlined />,
  },
  {
    key: "sub5",
    label: "Blog",
    icon: <BookOutlined />,
  },
];

const Sidebar: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    
  );
};

export default Sidebar;
