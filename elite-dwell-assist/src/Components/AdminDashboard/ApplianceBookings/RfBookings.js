import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RfBookings = () => {
  const [dayBookings, setDayBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/rfBill")
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

  const acknowledgeBooking = (booking) => {
    if (booking.acknowledged) {
      toast.info("This booking has already been acknowledged.");
      return;
    }

    fetch("http://localhost:5000/acknowledgeBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking: { ...booking, acknowledgeBookingType: "Refrigerator Bill" },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDayBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === booking._id ? { ...b, acknowledged: true } : b
          )
        );
        toast.success("TV Booking acknowledged", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error acknowledging TV booking:", error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl text-blue-900 font-bold mb-6">
        Booking Notifications For Refrigerator
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
              <button
                onClick={() => acknowledgeBooking(booking)}
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-full"
              >
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
                    {booking.selectedDate.slice(0, 10)}
                  </span>
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

export default RfBookings;
