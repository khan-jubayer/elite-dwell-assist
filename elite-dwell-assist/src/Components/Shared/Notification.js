import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../../redux/slices/notificationsSlice";

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) {
      dispatch(clearNotifications());
    }
  };

  return (
    <div className=" notification-container">
      <button className="notification-button" onClick={handleNotificationClick}>
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications.length > 0 && (
            <span className="badge badge-xs badge-primary indicator-item">
              {notifications.length}
            </span>
          )}
        </div>
      </button>
      {isDropdownOpen && (
        <div className="notification-dropdown">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-item"
              onClick={handleNotificationClick}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
