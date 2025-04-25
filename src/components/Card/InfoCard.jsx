import React from "react";
import { Card } from "antd";

const InfoCard = ({ title, value }) => {
  return (
    <Card title={title} bordered={false} style={{ width: 300 }}>
      <p>{value}</p>
    </Card>
  );
};

export default InfoCard;
