import { useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} currentPath={location.pathname} />

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
