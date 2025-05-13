import { Layout, Button, theme } from "antd";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, toggleCollapsed }) => {
  const { token } = theme.useToken();

  return (
    <AntHeader
      className="headerStyle"
      style={{
        background: token.colorBgContainer,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
          type="text"
          icon={collapsed ? <SquareChevronRight /> : <SquareChevronLeft />}
          onClick={toggleCollapsed}
          style={{
            fontSize: "28px",
            width: 64,
            height: 64,
          }}
        />
        <h1 style={{ margin: 0 }}>Building Management System</h1>
        <h1 style={{ margin: 0 }}>BMS</h1>
      </div>
    </AntHeader>
  );
};

export default Header;
