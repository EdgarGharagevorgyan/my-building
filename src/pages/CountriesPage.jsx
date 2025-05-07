import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table, Input, Space, Spin } from "antd";
import { Search } from "lucide-react";
import { debounce } from "lodash";

const CountriesPage = () => {
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSetSearchTerm = useMemo(() => debounce((value) => setSearchTerm(value), 300), []);

  useEffect(() => () => debouncedSetSearchTerm.cancel(), [debouncedSetSearchTerm]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setOriginalData(response.data);
        setTableData(response.data);
      })
      .catch(() => {
        setOriginalData([]);
        setTableData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setTableData(originalData);
      return;
    }

    const filtered = originalData.filter((country) => {
      const officialName = country?.name?.official?.toLowerCase() || "";
      const capitalCity = country?.capital?.[0]?.toLowerCase() || "";
      const languageList = country?.languages
        ? Object.values(country.languages).join(" ").toLowerCase()
        : "";
      const currencyList = country?.currencies
        ? Object.values(country.currencies)
            .map((c) => c.name)
            .join(" ")
            .toLowerCase()
        : "";
      const callingCode =
        country?.idd?.root && country?.idd?.suffixes?.length
          ? (country.idd.root + country.idd.suffixes[0]).toLowerCase()
          : "";

      const combined = `${officialName} ${capitalCity} ${languageList} ${currencyList} ${callingCode}`;
      return combined.includes(query);
    });

    setTableData(filtered);
  }, [searchTerm, originalData]);

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
          placeholder="Search by name, capital, language, currency, or calling code"
          prefix={<Search size={14} />}
          onChange={(e) => debouncedSetSearchTerm(e.target.value)}
          style={{ maxWidth: 400 }}
        />
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "24px auto" }} />
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey={(record) => record.name?.official || record.name?.common}
            bordered
            loading={false}
          />
        )}
      </Space>
    </div>
  );
};

export default CountriesPage;
