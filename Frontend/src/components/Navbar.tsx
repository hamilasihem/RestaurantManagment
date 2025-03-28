import { AppstoreOutlined, BellOutlined, BulbOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 250px",
        background: "transparent", 
        boxShadow: "none", 
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      

      <Menu
        mode="horizontal"
        defaultSelectedKeys={["dashboard"]}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Menu.Item key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="default">
          <Link to="/default">Default</Link>
        </Menu.Item>
      </Menu>

      
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined style={{ color: "rgba(0,0,0,0.5)" }} />}
        style={{ width: 200 }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "15px",
        }}
      >
        <BulbOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <HistoryOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <AppstoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </div>
    </Header>
  );
};



export default Navbar