import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generateMockData = () => {
  const data = [];
  const startDate = new Date("2023-01-01");

  for (let i = 0; i < 10; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    data.push({
      date: date.toLocaleDateString(),
      user: Math.floor(Math.random() * 50) + 50,
      maid: Math.floor(Math.random() * 30) + 20,
      babysitter: Math.floor(Math.random() * 20) + 10,
      driver: Math.floor(Math.random() * 15) + 5,
    });
  }

  return data;
};

const LineCharts = () => {
  const mockData = generateMockData();

  return (
    <div>
      <h2 className="mt-20">User Account Creation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="user" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="mt-9">Maid Account Creation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="maid" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="mt-9">Babysitter Account Creation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="babysitter" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="mt-9">Driver Account Creation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="driver" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
