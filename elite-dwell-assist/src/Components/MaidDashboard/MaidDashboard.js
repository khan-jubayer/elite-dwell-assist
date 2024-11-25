import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ban4 from "../../images/avatar.png";
import ban1 from "../../images/notification.png";
import ban2 from "../../images/job-search.png";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const MaidDashboard = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState({});
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/maid?email=${user.email}`)
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

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/5 h-screen text-base-content">
          <ul className="menu p-4 mt-24">
            <img
              src={loggedUser.img}
              alt="user"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <hr />
            <li>
              <Link
                className={`text-primary mt-3 text-base font-bold hover:text-black ${
                  selectedLink === "profile" ? "text-white bg-primary" : ""
                }`}
                to="/maidDashboard"
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
              <Link
                className={`text-primary mt-3 text-base font-bold hover:text-black ${
                  selectedLink === "notification" ? "text-white bg-primary" : ""
                }`}
                to="/maidDashboard/maidNotification"
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
                to="/maidDashboard/searchJob"
                onClick={() => handleLinkClick("searchJob")}
              >
                <span className="flex gap-4">
                  <img className="w-6" src={ban2} alt="" />
                  Search Job
                </span>
              </Link>
            </li>{" "}
            <hr />
            <li>
              <Link
                className={`text-primary mt-3 text-base font-bold hover:text-black ${
                  selectedLink === "maidReview" ? "text-white bg-primary" : ""
                }`}
                to="/maidDashboard/maidReview"
                onClick={() => handleLinkClick("maidReview")}
              >
                <span className="flex gap-4">
                  <img className="w-6" src={ban2} alt="" />
                  Reviews
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-4/5 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MaidDashboard;
