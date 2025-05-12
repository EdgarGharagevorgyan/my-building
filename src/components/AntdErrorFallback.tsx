import React from "react";
import { Button, Result } from "antd";
import { FallbackProps } from "react-error-boundary";

const AntdErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={error?.message || "An unexpected error occurred. Please try again."}
      extra={[
        <Button type="primary" onClick={resetErrorBoundary} key="retry">
          Try Again
        </Button>,
      ]}
    />
  );
};

export default AntdErrorFallback;
