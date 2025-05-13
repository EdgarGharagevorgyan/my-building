import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Content: AntContent } = Layout;

const Content: React.FC = () => {
  const { token } = theme.useToken();

  const contentStyle: React.CSSProperties = {
    padding: 24,
    margin: "24px 16px",
    minHeight: 280,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <AntContent style={contentStyle}>
      <Outlet />
    </AntContent>
  );
};

export default Content;
