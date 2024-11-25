import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MaidNotifications = () => {
  const [user, loading, error] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          setBookingId(item._id);
        });
      });
  }, []);

  useEffect(() => {
    if (user) {
      const loggedInMaidEmail = user?.email;
      if (bookingId) {
        const loggedInMaidEmail = user?.email;
      }
      fetch(`http://localhost:5000/bookings/${loggedInMaidEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setNotifications(data);
          } else {
            toast.warning(`No notifications for ${user?.displayName}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [user, bookingId]);

  const clearNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification._id !== notificationId
    );
    setNotifications(updatedNotifications);
    toast.success("Notification cleared successfully");
  };

  useEffect(() => {
    fetch("http://localhost:5000/customer")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDetails(data);
        } else {
          toast.warning("Customer details not found");
        }
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error("Authentication error:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification) => {
          const customerDetails = details.find(
            (customer) => customer.email === notification.customerEmail
          );

          return (
            <div key={notification._id} className="my-4">
              <div className="card lg:w-full my-4 border-2 shadow-xl transform transition-transform hover:scale-95 hover:bg-gradient-to-t from-blue-100 to-blue-50 hover:shadow-lg">
                <div className="card-body">
                  <h2 className="text-md font-bold">
                    Customer Email:{" "}
                    <span className="text-lg text-blue-900 font-bold">
                      {notification.customerEmail}
                    </span>
                  </h2>
                  {customerDetails ? (
                    <div>
                      <h2 className="text-md font-bold">
                        Address:{" "}
                        <span className="text-md text-blue-900 font-bold">
                          {customerDetails.address}
                        </span>
                      </h2>
                      <h2 className="text-md font-bold">
                        Contact:{" "}
                        <span className="text-md text-blue-900 font-bold">
                          {customerDetails.contact}
                        </span>
                      </h2>
                      <h2 className="text-md font-bold">
                        Gender:{" "}
                        <span className="text-md text-blue-900 font-bold">
                          {customerDetails.gender}
                        </span>
                      </h2>
                    </div>
                  ) : null}
                  <p className="text-xs absolute top-24 right-10 font-semibold">
                    Request Time:{" "}
                    {new Date(notification?.createdDate).toLocaleString()}
                  </p>
                  <button
                    onClick={() => clearNotification(notification._id)}
                    className="btn btn-sm rounded-full absolute lg:w-1/5 top-10 right-5 my-3 text-xs border-blue-500 text-white font-bold bg-red-600"
                  >
                    Clear Notifications
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No notifications found for {user?.displayName}</p>
      )}
    </div>
  );
};

export default MaidNotifications;
