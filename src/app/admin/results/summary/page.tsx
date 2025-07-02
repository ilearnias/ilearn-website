"use client";

import React, { useState } from "react";
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
} from "antd";
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  BookOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./styles.scss";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface ProgrammeSummary {
  key: string;
  programme: string;
  totalStudents: number;
  passRate: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: {
    "A+": number;
    A: number;
    "B+": number;
    B: number;
    C: number;
    F: number;
  };
}

const ResultsSummary = () => {
  const [selectedProgramme, setSelectedProgramme] = useState<string>("all");
  const [dateRange, setDateRange] = useState<any>(null);

  // Sample data - replace with actual data from your backend
  const summaryData: ProgrammeSummary[] = [
    {
      key: "1",
      programme: "Web Development",
      totalStudents: 120,
      passRate: 85,
      averageScore: 78,
      highestScore: 98,
      lowestScore: 45,
      gradeDistribution: {
        "A+": 15,
        A: 25,
        "B+": 35,
        B: 25,
        C: 15,
        F: 5,
      },
    },
    {
      key: "2",
      programme: "Data Science",
      totalStudents: 80,
      passRate: 90,
      averageScore: 82,
      highestScore: 99,
      lowestScore: 52,
      gradeDistribution: {
        "A+": 20,
        A: 30,
        "B+": 25,
        B: 15,
        C: 8,
        F: 2,
      },
    },
    {
      key: "3",
      programme: "Cybersecurity",
      totalStudents: 60,
      passRate: 88,
      averageScore: 80,
      highestScore: 97,
      lowestScore: 48,
      gradeDistribution: {
        "A+": 18,
        A: 22,
        "B+": 30,
        B: 20,
        C: 8,
        F: 2,
      },
    },
  ];

  const getGradeColor = (grade: string) => {
    const colors: { [key: string]: string } = {
      "A+": "gold",
      A: "green",
      "B+": "cyan",
      B: "blue",
      C: "orange",
      F: "red",
    };
    return colors[grade] || "default";
  };

  const columns: ColumnsType<ProgrammeSummary> = [
    {
      title: "Programme",
      dataIndex: "programme",
      key: "programme",
      render: (text) => (
        <Space>
          <BookOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Total Students",
      dataIndex: "totalStudents",
      key: "totalStudents",
      render: (value) => (
        <Tag icon={<UserOutlined />} color="blue">
          {value}
        </Tag>
      ),
    },
    {
      title: "Pass Rate",
      dataIndex: "passRate",
      key: "passRate",
      render: (value) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 70 ? "success" : "normal"}
        />
      ),
      sorter: (a, b) => a.passRate - b.passRate,
    },
    {
      title: "Average Score",
      dataIndex: "averageScore",
      key: "averageScore",
      render: (value) => (
        <Tag color="blue">{value}%</Tag>
      ),
      sorter: (a, b) => a.averageScore - b.averageScore,
    },
    {
      title: "Score Range",
      key: "scoreRange",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tag icon={<RiseOutlined />} color="success">
            Highest: {record.highestScore}%
          </Tag>
          <Tag icon={<FallOutlined />} color="warning">
            Lowest: {record.lowestScore}%
          </Tag>
        </Space>
      ),
    },
    {
      title: "Grade Distribution",
      key: "gradeDistribution",
      render: (_, record) => (
        <Space wrap>
          {Object.entries(record.gradeDistribution).map(([grade, count]) => (
            <Tag key={grade} color={getGradeColor(grade)}>
              {grade}: {count}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  // Calculate overall statistics
  const overallStats = {
    totalStudents: summaryData.reduce((sum, item) => sum + item.totalStudents, 0),
    averagePassRate: Math.round(
      summaryData.reduce((sum, item) => sum + item.passRate, 0) / summaryData.length
    ),
    averageScore: Math.round(
      summaryData.reduce((sum, item) => sum + item.averageScore, 0) / summaryData.length
    ),
    totalProgrammes: summaryData.length,
  };

  return (
    <div className="results-summary-page">
      <div className="results-summary-header">
        <h1>Results Summary</h1>
        <p>Analytics and insights from student results</p>
      </div>

      <Row gutter={[16, 16]} className="results-summary-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={overallStats.totalStudents}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3b82f6" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Pass Rate"
              value={overallStats.averagePassRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Score"
              value={overallStats.averageScore}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#f59e0b" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Programmes"
              value={overallStats.totalProgrammes}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#8b5cf6" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="results-summary-filters">
        <Space size="large">
          <div>
            <label>Programme:</label>
            <Select
              value={selectedProgramme}
              onChange={setSelectedProgramme}
              style={{ width: 200, marginLeft: 8 }}
            >
              <Option value="all">All Programmes</Option>
              {summaryData.map((item) => (
                <Option key={item.key} value={item.programme}>
                  {item.programme}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Date Range:</label>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ marginLeft: 8 }}
            />
          </div>
        </Space>
      </div>

      <Card className="results-summary-table">
        <Table
          columns={columns}
          dataSource={
            selectedProgramme === "all"
              ? summaryData
              : summaryData.filter((item) => item.programme === selectedProgramme)
          }
          pagination={false}
          rowKey="key"
        />
      </Card>

      <Row gutter={[16, 16]} className="results-summary-charts">
        {summaryData.map((programme) => (
          <Col xs={24} md={12} lg={8} key={programme.key}>
            <Card title={programme.programme}>
              <div className="grade-distribution">
                {Object.entries(programme.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="grade-item">
                    <Tag color={getGradeColor(grade)}>{grade}</Tag>
                    <Progress
                      percent={Math.round((count / programme.totalStudents) * 100)}
                      size="small"
                      strokeColor={getGradeColor(grade)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ResultsSummary; 