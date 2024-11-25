import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import LineCharts from "./LineCharts";

const AdminProfile = () => {
  const [user] = useAuthState(auth);
  const [customers, setCustomers] = useState([]);
  const [maids, setMaids] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [babysitters, setBabysitters] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/admin?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(user);
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
            }
          }
        });
    }
  }, [user]);

  const parseCreationTime = (timeString) => {
    const creationTime = new Date(timeString);
    return isNaN(creationTime) ? new Date("2023-11-01") : creationTime;
  };

  const aggregateData = (data, category) => {
    const aggregatedData = {};
    data.forEach((entry) => {
      const date = parseCreationTime(entry.createdAt).toLocaleDateString();
      if (!aggregatedData[date]) {
        aggregatedData[date] = { date, [category.toLowerCase()]: 1 };
      } else {
        aggregatedData[date][category.toLowerCase()] += 1;
      }
    });
    return Object.values(aggregatedData);
  };

  useEffect(() => {
    fetch("http://localhost:5000/customer")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/babysitter")
      .then((res) => res.json())
      .then((data) => {
        setBabysitters(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/maid")
      .then((res) => res.json())
      .then((data) => {
        setMaids(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/driver")
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data);
      });
  }, []);

  useEffect(() => {
    const mergedData = customers.concat(babysitters, maids, drivers);
    setCombinedData(mergedData);
  }, [customers, babysitters, maids, drivers]);

  return (
    <div>
      <h2 className="text-3xl mb-9 text-primary font-bold">
        {loggedUser?.name}
      </h2>

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Customer</h2>
            <p className="font-bold">Total : {customers.length}</p>
          </div>
        </div>
        <div className="card bg-teal-600 text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Maid</h2>
            <p className="font-bold">Total :{maids.length} </p>
          </div>
        </div>
        <div className="card bg-pink-600 text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Babysitter</h2>
            <p className="font-bold">Total : {babysitters.length}</p>
          </div>
        </div>
        <div className="card bg-yellow-600 text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Driver</h2>
            <p className="font-bold">Total : {drivers.length} </p>
          </div>
        </div>
      </div>
      <LineCharts />
    </div>
  );
};

export default AdminProfile;
