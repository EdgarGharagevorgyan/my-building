import { Layout, Button, theme } from 'antd';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, toggleCollapsed }) => {
  const { token } = theme.useToken();
  
  

  return (
    <AntHeader className={'headerStyle'}>
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
      <h1>Building Management System</h1>
      <h1>BMS</h1>
    </AntHeader>
  );
};

export default Header;