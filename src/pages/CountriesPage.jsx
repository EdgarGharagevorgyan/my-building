import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Space } from "antd";
import { Search } from "lucide-react";

const CountriesPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setData(res.data);
    });
  }, []);

  const filteredData = data.filter((country) => {
    const fullName = country?.name?.official || "";
    const capital = country?.capital?.[0] || "";
    const languageNames = country?.languages ? Object.values(country.languages).join(", ") : "";
    const currencyNames = country?.currencies
      ? Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")
      : "";
    const callingCode =
      country?.idd?.root && country?.idd?.suffixes?.length
        ? country.idd.root + country.idd.suffixes[0]
        : "";

    const combined =
      `${fullName} ${capital} ${languageNames} ${currencyNames} ${callingCode}`.toLowerCase();
    return combined.includes(search.trim().toLowerCase());
  });

  const columns = [
    {
      title: "Full Name",
      dataIndex: ["name", "official"],
      key: "name",
      render: (_, record) => record.name?.official || "-",
    },
    {
      title: "Capital",
      dataIndex: "capital",
      key: "capital",
      render: (capital) => capital?.[0] || "-",
    },
    {
      title: "Language",
      key: "languages",
      render: (_, record) => (record.languages ? Object.values(record.languages).join(", ") : "-"),
    },
    {
      title: "Currency",
      key: "currencies",
      render: (_, record) =>
        record.currencies
          ? Object.values(record.currencies)
              .map((c) => c.name)
              .join(", ")
          : "-",
    },
    {
      title: "Calling Code",
      key: "callingCode",
      render: (_, record) =>
        record.idd?.root && record.idd?.suffixes?.length
          ? record.idd.root + record.idd.suffixes[0]
          : "-",
    },
  ];

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Search"
          prefix={<Search size={14} />}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.name?.official || record.name?.common}
          bordered
          // pagination={{ pageSize: 10, showSizeChanger: false }}
        />
      </Space>
    </div>
  );
};

export default CountriesPage;
