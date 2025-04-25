import { Layout, Button, theme } from 'antd';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, toggleCollapsed }) => {
  const { token } = theme.useToken();
  
  const headerStyle = {
    padding: 0,
    background: token.colorBgContainer,
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <AntHeader  style={headerStyle}>
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
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Building Management System</h1>
    </AntHeader>
  );
};

export default Header;