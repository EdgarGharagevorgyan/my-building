import { useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const {Content: AntContent } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const location = useLocation();

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} currentPath={location.pathname} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s ease",
        }}
      >
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <AntContent style={{ padding: "24px" }}>
          <Content />
        </AntContent>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
