// DashboardLayout.tsx
import { Layout } from "antd";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={260} style={{ background: "#fff", paddingTop: 20 }}>
        <Sidebar />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Navbar />
        </Header>

        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <Outlet /> {/* ✅ C'est ici que le contenu dynamique s'affiche */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
