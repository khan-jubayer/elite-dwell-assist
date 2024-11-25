import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
// import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = ({ openAboutModal }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      // window.location.reload();
    }, 10000);
  }, []);
  //service dropdown from 8-31
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
  };
  const closeDropdowns = () => {
    setIsServiceDropdownOpen(false);
  };
  const handleServiceClick = (service) => {
    closeDropdowns();
  };
  const getNavbarColorClass = (role) => {
    switch (role) {
      case "maid":
        return "bg-indigo-700";
      case "babysitter":
        return "bg-pink-700";
      case "admin":
        return "bg-red-700";
      case "customer":
        return "bg-orange-700";
      case "driver":
        return "bg-teal-700";
      default:
        return "bg-primary"; // Default color
    }
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    signOut(auth);
    navigate("/");
  };

  const userRole = localStorage.getItem("userRole");
  return (
    <div className="bg-primary text-white font-bold ">
      {/* <div
       className={`bg-primary text-white font-bold ${getNavbarColorClass(
        userRole
     )}`}
    > */}
      <div class="navbar sticky">
        <div className="navbar-start">
          <Link to={"/"}>
            <img className="ml-10 rounded-full w-16" src={logo} alt="" />
          </Link>
        </div>

        <div class="navbar-end pr-10">
          {/* <div className="pr-10">
            <LanguageSwitcher />
          </div> */}
          {/* Services */}
          <div className="relative inline-block text-right">
            <button
              style={{ zIndex: 1000 }}
              onClick={toggleServiceDropdown}
              className="text-white font-bold hover:text-black pr-7"
            >
              Services
            </button>
            {isServiceDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                onClick={closeDropdowns}
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-labelledby="options-menu"
                >
                  <Link to="/maidPerDay">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left"
                      role="menuitem"
                    >
                      House-Keeper Per Day
                    </button>
                  </Link>
                  <Link to="/maidPerMonth">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left"
                      role="menuitem"
                    >
                      House-Keeper Per Month
                    </button>
                  </Link>
                  <Link to="/babysitter">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left"
                      role="menuitem"
                    >
                      Babysitter
                    </button>
                  </Link>
                  <Link to="/driverPerMonth">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left"
                      role="menuitem"
                    >
                      Driver
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* Appliance-Repair */}
          <div className="relative inline-block text-right">
            <a
              className="text-white font-bold hover:text-black pr-7"
              href="#applianceRepair"
            >
              Appliance-Repair
            </a>
          </div>
          {/* maid dashboard */}
          {userRole === "maid" ? (
            <Link to="/maidDashboard">
              <button className="text-white font-bold hover:text-black pr-7 ">
                <div class="indicator">Dashboard</div>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {/* babysitter dashboard */}
          {userRole === "babysitter" ? (
            <Link to="/babysitterDashboard">
              <button className="text-white font-bold hover:text-black pr-7 ">
                <div class="indicator">Dashboard</div>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {/* admin dashboard */}
          {userRole === "admin" ? (
            <Link to="/adminDashboard">
              <button className="text-white font-bold hover:text-black pr-7 ">
                <div class="indicator">Dashboard</div>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {/* customer dashboard */}
          {userRole === "customer" ? (
            <Link to="/customerDashboard">
              <button className="text-white font-bold hover:text-black pr-7 ">
                <div class="indicator">Dashboard</div>
              </button>
            </Link>
          ) : (
            <></>
          )}
          {/* driver dashboard */}
          {userRole === "driver" ? (
            <Link to="/driverDashboard">
              <button className="text-white font-bold hover:text-black pr-7 ">
                <div class="indicator">Dashboard</div>
              </button>
            </Link>
          ) : (
            <></>
          )}

          <button
            onClick={openAboutModal}
            className=" text-white font-bold hover:text-black pr-7 "
          >
            About
          </button>

          {userRole ? (
            <button
              onClick={logout}
              className="text-white font-bold hover:text-black pr-7 "
            >
              <div class="indicator">Signout</div>
            </button>
          ) : (
            <Link to="/login">
              <button className="text-white font-bold hover:text-black pr-7 ">
                <div class="indicator">Login</div>
              </button>
            </Link>
          )}
          {/* {userRole === "maid" ? <Notification /> : <></>} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
