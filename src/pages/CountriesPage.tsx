import React, { useState, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import { Table, Input, Space, Button, Spin } from "antd";
import { Search } from "lucide-react";
import type { ColumnsType } from "antd/es/table";

interface Country {
  name: {
    official?: string;
    common?: string;
  };
  capital?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string }>;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}

const stripPlus = (str: string): string => str.replace(/^\+/, "");

const CountriesPage: React.FC = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [displayData, setDisplayData] = useState<Country[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setAllCountries(response.data);
        setDisplayData(response.data);
      })
      .catch(() => {
        setAllCountries([]);
        setDisplayData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setDisplayData(allCountries);
      return;
    }

    setLoading(true);
    const isNumericQuery = /^\+?\d+$/.test(searchTerm.trim());
    const endpoints = [
      `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`,
      `https://restcountries.com/v3.1/capital/${encodeURIComponent(query)}`,
      `https://restcountries.com/v3.1/lang/${encodeURIComponent(query)}`,
      `https://restcountries.com/v3.1/currency/${encodeURIComponent(query)}`,
    ];

    Promise.allSettled(endpoints.map((url) => axios.get<Country[]>(url)))
      .then((results) => {
        const merged: Country[] = [];
        const seen = new Set<string>();
        results.forEach((r) => {
          if (r.status === "fulfilled") {
            r.value.data.forEach((country) => {
              const key = country.name?.official || country.name?.common;
              if (key && !seen.has(key)) {
                seen.add(key);
                merged.push(country);
              }
            });
          }
        });
        if (isNumericQuery) {
          const queryString = stripPlus(query);
          allCountries.forEach((country) => {
            const internationalDirectDialing =
              country.idd?.root && country.idd?.suffixes?.length
                ? country.idd.root + country.idd.suffixes[0]
                : "";
            const code = stripPlus(internationalDirectDialing).toLowerCase();
            if (code.includes(queryString)) {
              const key = country.name?.official || country.name?.common;
              if (key && !seen.has(key)) {
                seen.add(key);
                merged.push(country);
              }
            }
          });
        }
        setDisplayData(merged);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [searchTerm, allCountries]);

  const columns: ColumnsType<Country> = [
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
      render: (cap: string[] | undefined) => cap?.[0] || "-",
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

  const handleSearch = (): void => {
    if (inputValue.trim() !== "") {
      setSearchTerm(inputValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: 24, overflowX: "auto" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Input
            placeholder="Search"
            prefix={<Search size={14} />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ maxWidth: 400 }}
          />
          <Button type="primary" icon={<Search size={14} />} onClick={handleSearch}>
            Search
          </Button>
        </Space>
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "24px auto" }} />
        ) : (
          <Table
            columns={columns}
            dataSource={displayData}
            rowKey={(record) => record.name?.official || record.name?.common || "unknown"}
            bordered
          />
        )}
      </Space>
    </div>
  );
};

export default CountriesPage;
