import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillClockCircle } from "react-icons/ai"; // Icon for clock

const TvBookings = () => {
  const [dayBookings, setDayBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tvBill")
      .then((res) => res.json())
      .then((data) => {
        setDayBookings(data);
      });
  }, []);

  const calculateRemainingHours = (selectedDate) => {
    const currentTime = new Date();
    const targetDate = new Date(selectedDate);
    const timeDifference = targetDate - currentTime;
    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursRemaining;
  };

  return (
    <div>
      <h2 className="text-3xl text-blue-900 font-bold mb-6">
        Booking Notifications For Television
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {dayBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div
              className="p-2 bg-blue-200"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="text-lg font-bold">
                Booking from:{" "}
                <span className="uppercase font-bold text-primary">
                  {booking.userName}
                </span>
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-full">
                Acknowledge
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-medium">
                Customer Email:{" "}
                <span className="font-bold"> {booking.userEmail}</span>
              </h2>
              {booking.selectedDate && (
                <p className="text-lg font-medium">
                  Selected Date:{" "}
                  <span className="font-bold text-primary">
                    {/* {new Date(booking.selectedDate).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: false,
                    })}{" "}
                    (
                    {calculateRemainingHours(booking.selectedDate) > 0
                      ? `${calculateRemainingHours(
                          booking.selectedDate
                        )} hours remaining`
                      : "less than an hour remaining"}
                    ) */}
                    {booking.selectedDate.slice(0, 10)}
                  </span>
                  {/* <AiFillClockCircle className="inline-block text-primary text-lg ml-1" /> */}
                </p>
              )}
              <p className="text-lg font-medium">
                Selected Time Slot:{" "}
                <span className="font-bold capitalize">
                  {booking.selectedTimeSlot}
                </span>
              </p>
              <div className="text-lg font-medium">
                Selected Services:{" "}
                <span>
                  {booking.selectedServices.map((service, index) => (
                    <span key={index} className="font-bold">
                      {service.name}
                      {index < booking.selectedServices.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>

              <p className="text-lg font-medium">
                Address:{" "}
                <span className="font-semibold text-primary capitalize">
                  {`${booking.address.house} ,Road ${booking.address.road}, Block ${booking.address.block},Sector ${booking.address.sector}, ${booking.address.area}`}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvBookings;
