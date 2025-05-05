import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Space } from "antd";
import { Search } from "lucide-react";

const CountriesPage = () => {
  const [data, setData] = useState([]);
  const [searches, setSearches] = useState({
    name: "",
    capital: "",
    language: "",
    currency: "",
    callingCode: "",
  });

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleSearchChange = (key, value) => {
    setSearches((prev) => ({ ...prev, [key]: value }));
  };

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

    return (
      fullName.toLowerCase().includes(searches.name.toLowerCase()) &&
      capital.toLowerCase().includes(searches.capital.toLowerCase()) &&
      languageNames.toLowerCase().includes(searches.language.toLowerCase()) &&
      currencyNames.toLowerCase().includes(searches.currency.toLowerCase()) &&
      callingCode.toLowerCase().includes(searches.callingCode.toLowerCase())
    );
  });


  const renderSearchInput = (placeholder, key) => (
    <Input
      placeholder={placeholder}
      prefix={<Search size={14} />}
      onChange={(e) => handleSearchChange(key, e.target.value)}
    />
  );

  const columns = [
    {
      title: renderSearchInput("Search Name", "name"),
      dataIndex: ["name", "official"],
      key: "name",
      render: (_, record) => record.name?.official || "-",
    },
    {
      title: renderSearchInput("Search Capital", "capital"),
      dataIndex: "capital",
      key: "capital",
      render: (capital) => capital?.[0] || "-",
    },
    {
      title: renderSearchInput("Search Language", "language"),
      key: "languages",
      render: (_, record) => (record.languages ? Object.values(record.languages).join(", ") : "-"),
    },
    {
      title: renderSearchInput("Search Currency", "currency"),
      key: "currencies",
      render: (_, record) =>
        record.currencies
          ? Object.values(record.currencies)
              .map((c) => c.name)
              .join(", ")
          : "-",
    },
    {
      title: renderSearchInput("Search Calling Code", "callingCode"),
      key: "callingCode",
      render: (_, record) =>
        record.idd?.root && record.idd?.suffixes?.length
          ? record.idd.root + record.idd.suffixes[0]
          : "-",
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.name?.official}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </Space>
  );
};

export default CountriesPage;
