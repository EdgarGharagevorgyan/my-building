import React from "react";
import { Button, Result } from "antd";

interface AntdErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const AntdErrorFallback: React.FC<AntdErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <Result
    status="error"
    title="Something went wrong"
    subTitle={error.message || "An unexpected error occurred. Please try again."}
    extra={[
      <Button type="primary" onClick={resetErrorBoundary} key="retry">
        Try Again
      </Button>,
    ]}
  />
);

export default AntdErrorFallback;
