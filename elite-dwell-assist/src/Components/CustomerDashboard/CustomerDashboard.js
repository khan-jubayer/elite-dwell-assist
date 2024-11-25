import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ban1 from "../../images/notification.png";
import ban2 from "../../images/job-search.png";
import ban3 from "../../images/booking.svg";
import ban4 from "../../images/avatar.png";
import ban5 from "../../images/icons/maid.png";
import ban6 from "../../images/icons/driver.png";
import ban7 from "../../images/icons/motherhood.png";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const CustomerDashboard = () => {
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState({});

  const toggleBookings = () => {
    setIsBookingsOpen(!isBookingsOpen);
  };

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/customer?email=${user.email}`)
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

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 h-screen text-base-content">
          <ul className="menu p-4 mt-16">
            <img
              src={loggedUser.img}
              alt="user"
              className="w-32 h-32 rounded-full mb-4 mx-auto"
            />
            <hr />
            <li>
              <Link
                className="text-primary mt-3 text-base font-bold hover:text-black"
                to="/customerDashboard"
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
                className="text-primary mt-3 text-base font-bold hover:text-black"
                to="/customerDashboard/customerNotification"
              >
                <span className="flex gap-4">
                  <img className="w-6" src={ban1} alt="" />
                  Notification
                </span>
              </Link>
            </li>{" "}
            <hr />
            <li>
              <Link
                className="text-primary mt-3 text-base font-bold hover:text-black"
                to="/customerDashboard/createPostForMaid"
              >
                <span className="flex gap-4">
                  <img className="w-6" src={ban2} alt="" />
                  Create Post For Home-service
                </span>
              </Link>
            </li>{" "}
            <hr />
            <li>
              <Link
                className="text-primary mt-3 text-base font-bold hover:text-black"
                to="/customerDashboard/createPostForDriver"
              >
                <span className="flex gap-4">
                  <img className="w-6" src={ban2} alt="" />
                  Create Post For Driver
                </span>
              </Link>
            </li>{" "}
            <hr />
            <li>
              <Link
                className="text-primary mt-3 text-base font-bold hover:text-black"
                to="/customerDashboard/createPostForBabysitter"
              >
                <span className="flex gap-4">
                  <img className="w-6" src={ban2} alt="" />
                  Create Post For Babysitter
                </span>
              </Link>
            </li>{" "}
            <hr />
            <li>
              <div className="relative group">
                <input
                  type="checkbox"
                  id="bookingsDropdown"
                  className="hidden input-sm"
                />
                <label
                  htmlFor="bookingsDropdown"
                  onClick={toggleBookings}
                  className="text-primary mt-3 text-base font-bold hover:text-black"
                >
                  <span className="flex gap-4">
                    <img className="w-6" src={ban3} alt="" />
                    Bookings
                    <span className="ml-2">{isBookingsOpen ? "▼" : "▶"}</span>
                  </span>
                </label>
                {isBookingsOpen && (
                  <ul className="bg-sky-50 p-2 border rounded border-gray-300 absolute top-16 left-0">
                    <li>
                      <Link
                        to="/customerDashboard/bookingsForMaid"
                        className="text-primary text-base font-bold hover:text-black"
                      >
                        <span className="flex gap-4">
                          <img className="w-6" src={ban5} alt="" />
                          Maid Bookings
                        </span>
                      </Link>
                    </li>{" "}
                    <hr />
                    <li>
                      <Link
                        to="/customerDashboard/bookingsForDriver"
                        className="text-primary mt-3 text-base font-bold hover:text-black"
                      >
                        <span className="flex gap-4">
                          <img className="w-6" src={ban6} alt="" />
                          Driver Bookings
                        </span>
                      </Link>
                    </li>{" "}
                    <hr />
                    <li>
                      <Link
                        to="/customerDashboard/bookingsForBabysitter"
                        className="text-primary mt-3 text-base font-bold hover:text-black"
                      >
                        <span className="flex gap-4">
                          <img className="w-6" src={ban7} alt="" />
                          Babysitter Bookings
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
