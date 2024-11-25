import React, { useEffect, useState } from "react";
import { Link, Outlet, Route } from "react-router-dom";
import frwrd from "../../images/forward.png";
import rewrd from "../../images/rewind.png";
import ban4 from "../../images/avatar.png";
import ban1 from "../../images/notification.png";
import ban2 from "../../images/job-search.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const DriverDashboard = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/driver?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div>
      <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""}`}>
        <input id="driver-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content p-11">
          <Outlet />
          <label
            for="driver-drawer"
            class="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          {isSidebarOpen ? (
            <button
              className="btn absolute rounded-full top-2 left-2 z-10 btn-transparent btn-sm"
              onClick={toggleSidebar}
            >
              <img className="w-4" src={rewrd} alt="" />
            </button>
          ) : (
            <button
              className="btn absolute top-0 rounded-full left-0 btn-secondary btn-sm"
              onClick={toggleSidebar}
            >
              <img className="w-4" src={frwrd} alt="" />
            </button>
          )}
        </div>
        <div class="drawer-side">
          <label
            for="driver-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-indigo-50 text-base-content">
            {/* <!-- Sidebar content here --> */}

            <ul className="mt-16">
              <img
                src={loggedUser.img}
                alt="user"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <li>
                {" "}
                <Link
                  className={`text-primary mt-3 text-base font-bold hover:text-black ${
                    selectedLink === "profile" ? "text-white bg-primary" : ""
                  }`}
                  to="/driverDashboard"
                  onClick={() => handleLinkClick("profile")}
                >
                  <span className="flex gap-4">
                    <img className="w-6" src={ban4} alt="" />
                    Profile
                  </span>
                </Link>
              </li>
              <hr />
              <li>
                {" "}
                <Link
                  className={`text-primary mt-3 text-base font-bold hover:text-black ${
                    selectedLink === "notification"
                      ? "text-white bg-primary"
                      : ""
                  }`}
                  to="/driverDashboard/DriverNotifications"
                  onClick={() => handleLinkClick("notification")}
                >
                  <span className="flex gap-4">
                    <img className="w-6" src={ban1} alt="" />
                    Notification
                  </span>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  className={`text-primary mt-3 text-base font-bold hover:text-black ${
                    selectedLink === "searchJob" ? "text-white bg-primary" : ""
                  }`}
                  to="/driverDashboard/searchJob"
                  onClick={() => handleLinkClick("searchJob")}
                >
                  <span className="flex gap-4">
                    <img className="w-6" src={ban2} alt="" />
                    Search Job
                  </span>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  className={`text-primary mt-3 text-base font-bold hover:text-black ${
                    selectedLink === "maidReview" ? "text-white bg-primary" : ""
                  }`}
                  to="/driverDashboard/driverReview"
                  onClick={() => handleLinkClick("reviews")}
                >
                  <span className="flex gap-4">
                    <img className="w-6" src={ban2} alt="" />
                    Reviews
                  </span>
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
