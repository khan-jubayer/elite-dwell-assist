import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ban1 from "../../images/add.png";
import ban2 from "../../images/add-user.png";
import ban3 from "../../images/customer.png";
import ban4 from "../../images/dashboard.png";

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isApplianceOpen, setIsApplianceOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAppliance = () => {
    setIsApplianceOpen(!isApplianceOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-indigo-50 p-4 min-h-screen">
        <ul className="menu">
          <li>
            <Link
              className="text-primary text-base font-bold hover:text-black"
              to="/adminDashboard"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban4} alt="" />
                Dashboard
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-primary mt-3 text-base font-bold hover:text-black"
              to="/adminDashboard/adminCreate"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban2} alt="" />
                Create Admin
              </span>
            </Link>
          </li>{" "}
          <hr />
          <li>
            <Link
              className="text-primary mt-3 text-base font-bold hover:text-black"
              to="/adminDashboard/adminMaidPerDayBookings"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban1} alt="" />
                Maid Per Day Bookings
              </span>
            </Link>
          </li>{" "}
          <hr />
          <li>
            <Link
              className="text-primary mt-3 text-base font-bold hover:text-black"
              to="/adminDashboard/acknowledgedMaidBookings"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban1} alt="" />
                Acknowledged Bookings
              </span>
            </Link>
          </li>{" "}
          <hr />
          <li>
            <button
              onClick={toggleDropdown}
              className="text-primary mt-3 text-base font-bold hover:text-black"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban3} alt="" />
                Information
                <span className="ml-2">{isDropdownOpen ? "▼" : "▶"}</span>
                <i
                  className={`ml-2 fas ${
                    isDropdownOpen ? "fa-caret-up" : "fa-caret-down"
                  }`}
                ></i>
              </span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <ul>
                  <li>
                    <Link
                      to="/adminDashboard/customer"
                      className="text-primary text-base font-bold hover:text-black"
                    >
                      Customer Information
                    </Link>
                  </li>{" "}
                  <hr />
                  <li>
                    <Link
                      to="/adminDashboard/maid"
                      className="text-primary text-base font-bold hover-text-black"
                    >
                      Maid Information
                    </Link>
                  </li>{" "}
                  <hr />
                  <li>
                    <Link
                      to="/adminDashboard/driver"
                      className="text-primary text-base font-bold hover-text-black"
                    >
                      Driver Information
                    </Link>
                  </li>{" "}
                  <hr />
                  <li>
                    <Link
                      to="/adminDashboard/babysitter"
                      className="text-primary text-base font-bold hover-text-black"
                    >
                      Babysitter Information
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>{" "}
          <hr />
          <li>
            <button
              onClick={toggleAppliance}
              className="text-primary mt-3 text-base font-bold hover:text-black"
            >
              <span className="flex gap-4">
                <img className="w-6" src={ban3} alt="" />
                Appliance Repair Bookings
                <span className="ml-2">{isApplianceOpen ? "▼" : "▶"}</span>
              </span>
            </button>
            {isApplianceOpen && (
              <div className="dropdown-content">
                <ul>
                  <li>
                    <Link
                      to="/adminDashboard/television"
                      className="text-primary text-base font-bold hover:text-black"
                    >
                      Television Information
                    </Link>
                  </li>{" "}
                  <hr />
                  <li>
                    <Link
                      to="/adminDashboard/washing-machine"
                      className="text-primary text-base font-bold hover-text-black"
                    >
                      Washing-machine Information
                    </Link>
                  </li>{" "}
                  <hr />
                  <li>
                    <Link
                      to="/adminDashboard/refrigerator"
                      className="text-primary text-base font-bold hover-text-black"
                    >
                      Refrigerator Information
                    </Link>
                  </li>{" "}
                  <hr />
                  <li>
                    <Link
                      to="/adminDashboard/oven"
                      className="text-primary text-base font-bold hover-text-black"
                    >
                      Oven Information
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          {/* Add other menu items here */}
        </ul>
      </div>

      {/* Content */}
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
