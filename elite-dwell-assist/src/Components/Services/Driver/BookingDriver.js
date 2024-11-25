import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { addNotification } from "../../../redux/slices/notificationsSlice";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const BookingDriver = ({ bookDriver, user }) => {
  const {
    img,
    name,
    experience,
    location,
    gender,
    education,
    license,
    dob,
    salary,
  } = bookDriver;
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const dispatch = useDispatch();
  const [notificationIdCounter, setNotificationIdCounter] = useState(1);
  const [gUser, loading, error] = useAuthState(auth);

  // Function to close the success modal
  const closeSuccessModal = () => {
    setBookingSuccess(false);
  };
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleBooking = () => {
    if (!bookingSuccess) {
      setBookingSuccess(true);

      const bookingData = {
        driverId: bookDriver.id,
        customerName: gUser?.displayName || "",
        driverName: bookDriver.name,
        driverEmail: bookDriver.email,
        customerEmail: gUser?.email || "",
        availability: bookDriver.availability,
      };
      console.log(bookDriver);

      fetch("http://localhost:5000/driverBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.success);
          if (data.message === "Booking created successfully") {
            toast.success(
              `Booking created successfully for ${bookDriver.name}`
            );
          }
        })
        .catch((error) => {
          toast.error("Failed to create booking");
        });

      const newNotification = {
        id: notificationIdCounter,
        message: `You have a new booking from ${bookDriver.name}`,
      };
      dispatch(addNotification(newNotification));
      setNotificationIdCounter(notificationIdCounter + 1);
    }
  };

  // const age = calculateAge(dob);

  return (
    <div className=" bg-transparent">
      <input type="checkbox" id="booking-Driver" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box h-96 max-w-xl w-screen">
          <label
            for="booking-Driver"
            class="btn btn-sm btn-circle btn-ghost bg-red-500 absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="card bg-transparent">
            <figure>
              <img
                className="w-24 h-24 rounded-full absolute top-0 left-5"
                src={img}
                alt="Driver"
              />
              <h2 className="card-title">
                <strong className="text-indigo-900">{name}</strong> for your Car
              </h2>
            </figure>
            <div class="card-body relative top-16">
              <div className="flex">
                <div className="w-1/2 pr-4">
                  <p className="pt-2">
                    <strong className="text-indigo-800 underline">
                      Salary :
                    </strong>{" "}
                    {salary}
                  </p>
                  <p>
                    <strong className="text-indigo-800 underline">
                      Preferred Location:
                    </strong>{" "}
                    <ul>
                      {Array.isArray(location) ? (
                        location.map((loc, index) => (
                          <li key={index}>
                            {loc.trim()[0].toUpperCase() + loc.trim().slice(1)}
                          </li>
                        ))
                      ) : (
                        <li>{location}</li>
                      )}
                    </ul>
                  </p>

                  <p className="pt-2">
                    <strong className="text-indigo-800 underline">Age:</strong>{" "}
                    {calculateAge(dob)} years
                  </p>
                </div>
                <div className="w-1/2 pl-4">
                  <p className="pt-2">
                    <strong className="text-indigo-800 underline">
                      Experience :
                    </strong>{" "}
                    {experience}
                  </p>
                  <p className="pt-2">
                    <strong className="text-indigo-800 underline">
                      Driving license no :
                    </strong>{" "}
                    {license}
                  </p>
                  <p className="pt-2">
                    <strong className="text-indigo-800 underline">
                      Education :
                    </strong>{" "}
                    <span className="uppercase">{education}</span>
                  </p>
                  <p className="pt-2">
                    <strong className="text-indigo-800 underline">
                      Gender :
                    </strong>{" "}
                    <span className="capitalize"> {gender}</span>
                  </p>
                </div>
              </div>
              <div class="flex items-end justify-end">
                <button
                  htmlFor="booking-Driver"
                  onClick={handleBooking}
                  className={`btn btn-sm text-white font-bold w-1/4 btn-secondary ${
                    bookingSuccess ? "disabled" : ""
                  }`}
                  disabled={bookingSuccess}
                >
                  {bookingSuccess ? "Booked" : "Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Success Modal */}
        <Modal
          isOpen={bookingSuccess}
          contentLabel="Success Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "400px",
              height: "200px",
              margin: "auto",
            },
          }}
        >
          <h1
            className="text-2xl font-bold text-secondary text-center py-2 px-7"
            style={{ fontFamily: "arial" }}
          >
            Booking sent to{" "}
            <span className="text-2xl italic uppercase font-black text-secondary text-center pl-2 py-5">
              {bookDriver.name}
            </span>
            !
          </h1>

          <button
            onClick={closeSuccessModal}
            className="btn btn-sm text-xs w-1/4 ml-32 mt-10 border-indigo-500
          text-white font-bold bg-secondary"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default BookingDriver;
