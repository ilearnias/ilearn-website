"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
  Statistic,
  Progress,
  Button,
  Switch,
} from "antd";
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  BookOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./styles.scss";
import { resultService, IResult } from "@/services/results.service";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ResultsSummary = () => {
  const [data, setData] = useState<IResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: any = await resultService.getAllResults();
      if (response.status) {
        setData(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<IResult> = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  // Simple stats
  const total = data.length;
  const active = data.filter((d) => d.isActive).length;
  const inactive = total - active;
  const years = Array.from(new Set(data.map((d) => d.year))).length;

  return (
    <div className="results-summary-page">
      <div className="results-summary-header">
        <h1>Results Summary</h1>
        <p>Summary of all results entries</p>
      </div>
      <Row gutter={[16, 16]} className="results-summary-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div>
              Total Entries: <b>{total}</b>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div>
              Active: <b>{active}</b>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div>
              Inactive: <b>{inactive}</b>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div>
              Years: <b>{years}</b>
            </div>
          </Card>
        </Col>
      </Row>
      <Card className="results-summary-table">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default ResultsSummary;
