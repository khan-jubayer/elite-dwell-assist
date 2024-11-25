import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const BabysitterSearchJob = () => {
  const [dayBookings, setDayBookings] = useState([]);
  const [user] = useAuthState(auth);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/babysitterSearchPost")
      .then((res) => res.json())
      .then((data) => {
        setDayBookings(data);
      });
  }, []);
  console.log(dayBookings);
  const handleBooking = (booking) => {
    if (!booking.bookingSuccess) {
      const updatedBooking = {
        ...booking,
        bookingSuccess: true,
      };

      const bookingData = {
        babysitterName: user?.displayName,
        babysitterEmail: user?.email,
        customerEmail: booking.userEmail,
        bookingInfo: updatedBooking,
        bookingFrom: "Babysitter",
      };
      document.getElementById(`button-${booking._id}`).disabled = true;
      fetch("http://localhost:5000/customerBookingByBabysitter", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success(`Request sent to ${booking.userName}`, {
              position: toast.POSITION.TOP_CENTER,
            });
            setSelectedJobId(booking);
          }
        })
        .catch((error) => {
          toast.error("Failed to create booking");
        });
    }
  };

  const job = dayBookings.includes(
    (booking) => booking[0]?._id === selectedJobId?._id
  );

  return (
    <div>
      <h2 className="text-xl pl-5 uppercase text-blue-900 font-bold">
        Search job
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {dayBookings.map((booking) => (
          <div
            key={booking._id}
            className="card border-2 my-6 shadow-xl transform transition-transform hover:scale-95 hover:shadow-lg"
          >
            <div className="card-title pt-7 pb-5 bg-blue-50">
              <p className="font-sm ml-6">
                Request from:{" "}
                <span className="uppercase text-primary font-bold">
                  {booking.userName}
                </span>
              </p>{" "}
              <button
                id={`button-${booking._id}`}
                onClick={() => handleBooking(booking)}
                className={`btn btn-sm rounded-full absolute w-1/8 right-5 my-7 text-xs border-blue-500 text-white font-bold bg-green-600 w-1/4 btn-primary`}
                disabled={selectedJobId === booking._id}
              >
                {selectedJobId === booking._id ? "Request Sent" : "Interested"}
              </button>
            </div>
            <div className="card-body">
              <h2 className="font-medium">
                Customer Email :{" "}
                <span className="font-bold"> {booking.userEmail}</span>
              </h2>
              <p className="font-medium">
                Contact:{" "}
                <span className="uppercase font-extrabold">
                  {booking.contact}
                </span>
              </p>
              <p className="font-medium">
                Address:{" "}
                <span className="uppercase font-extrabold">
                  {booking.address}
                </span>
              </p>
              <p className="font-medium">
                Expected Salary:{" "}
                <span className="uppercase text-primary font-extrabold">
                  {booking.expectedSalary} tk
                </span>
              </p>{" "}
              <p className="font-medium">
                Experience :{" "}
                <span className="uppercase text-primary font-extrabold">
                  {booking.experience} years
                </span>
              </p>
              <p className="font-medium">
                Additional Preferences:{" "}
                <span className="uppercase font-extrabold">
                  {booking.additionalPreferences}
                </span>
              </p>
              <p className="font-medium">
                Religion:{" "}
                <span className="uppercase font-extrabold">
                  {booking.religion}
                </span>
              </p>
              <p className="font-medium">
                Gender:{" "}
                <span className="uppercase font-extrabold">
                  {Array.isArray(booking.gender)
                    ? booking.gender.join(", ")
                    : booking.gender}
                </span>
              </p>
              <p className="font-medium">
                Special Skills:{" "}
                <span className="uppercase font-extrabold">
                  {booking?.specialSkills.join(", ")}
                </span>
              </p>
              <p className="font-medium">
                Preferred Locations:{" "}
                <span className="uppercase font-extrabold">
                  {Array.isArray(booking.preferredLocations)
                    ? booking.preferredLocations.join(", ")
                    : booking.preferredLocations}
                </span>
              </p>
              <p className="font-medium">
                Availability:{" "}
                <span className="uppercase font-extrabold">
                  {Array.isArray(booking.availability)
                    ? booking.availability.join(", ")
                    : booking.availability}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BabysitterSearchJob;
