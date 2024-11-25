import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const UserComparisonGraph = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/customer")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const days = [];
  const newUsersData = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(lastWeek.getTime() + i * 24 * 60 * 60 * 1000);
    const nextDay = new Date(
      lastWeek.getTime() + (i + 1) * 24 * 60 * 60 * 1000
    );
    const newUsers = users.filter(
      (user) =>
        new Date(user.timestamp) >= day && new Date(user.timestamp) < nextDay
    ).length;
    const formattedDate = day.toLocaleDateString();

    days.push(formattedDate);
    newUsersData.push({ date: formattedDate, newUsers });
  }

  return (
    <div>
      <h2>User Comparison Line Chart</h2>
      <LineChart width={600} height={400} data={newUsersData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="newUsers"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default UserComparisonGraph;
