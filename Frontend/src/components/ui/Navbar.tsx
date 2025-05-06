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
        items={[
          {
            key: "dashboard",
            label: <Link to="/dashboard">Dashboard</Link>,
          },
        ]}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "90px" }}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined style={{ color: "rgba(0,0,0,0.5)" }} />}
          style={{ width: 200 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <BulbOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <HistoryOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <AppstoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
      </div>
    </Header>
  );
};



export default Navbar