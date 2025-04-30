import { Flex, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { LayoutDashboard, Building2, Users, HandPlatter, Handshake } from "lucide-react";

const { Sider } = Layout;

const Sidebar = ({ collapsed, currentPath }) => {
  const menuItems = [
    {
      key: "/",
      icon: <LayoutDashboard />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/buildings",
      icon: <Building2 />,
      label: <Link to="/buildings">Buildings</Link>,
    },
    {
      key: "/families",
      icon: <Users />,
      label: <Link to="/families">Families</Link>,
    },
    {
      key: "/services",
      icon: <HandPlatter />,
      label: <Link to="/services">Services</Link>,
    },
    {
      key: "/partners",
      icon: <Handshake />,
      label: <Link to="/partners">Partners</Link>,
    },
  ];

  return (
    <Sider
      collapsed={collapsed}
      theme="dark"
      width={200}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Menu theme="dark" mode="inline" selectedKeys={[currentPath]} items={menuItems} />
    </Sider>
  );
};

export default Sidebar;

