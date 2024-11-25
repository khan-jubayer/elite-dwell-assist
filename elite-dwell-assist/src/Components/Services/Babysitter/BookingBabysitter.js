import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { addNotification } from "../../../redux/slices/notificationsSlice";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const BookingBabysitter = ({ bookBabysitter, user }) => {
  const {
    id,
    img,
    name,
    experience,
    availability,
    preferedLocation,
    gender,
    religion,
    institute,
    lastAchievedDegree,
    education,
    qualifications,
    languageSkills,
    specialSkills,
    dob,
    expectedSalary,
  } = bookBabysitter;

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const dispatch = useDispatch();
  const [notificationIdCounter, setNotificationIdCounter] = useState(1);
  const [gUser, loading, error] = useAuthState(auth);
  const availabilityOptions = [
    { label: "08.00 AM - 11.00 AM", value: "Morning" },
    { label: "11.00 AM - 02.00 PM", value: "Afternoon" },
    { label: "02.00 PM - 05.00 PM", value: "Evening" },
    { label: "05.00 PM - 08.00 PM", value: "Night" },
  ];

  const closeSuccessModal = () => {
    setBookingSuccess(false);
  };

  const handleBooking = () => {
    if (!bookingSuccess) {
      setBookingSuccess(true);

      const bookingData = {
        babysitterId: bookBabysitter.id,
        customerName: gUser?.displayName || "",
        babysitterName: bookBabysitter.name,
        babysitterEmail: bookBabysitter.email,
        customerEmail: gUser?.email || "",
        availability: bookBabysitter.availability,
        experience: bookBabysitter.experience,
      };
      console.log(bookBabysitter);

      fetch("http://localhost:5000/babysitterBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Booking created successfully") {
            toast.success(
              `Booking created successfully for ${bookBabysitter.name}`
            );
          }
        })
        .catch((error) => {
          toast.error("Failed to create booking");
        });

      const newNotification = {
        id: notificationIdCounter,
        message: `You have a new booking from ${bookBabysitter.name}`,
      };
      dispatch(addNotification(newNotification));
      setNotificationIdCounter(notificationIdCounter + 1);
    }
  };

  return (
    <div className="bg-transparent">
      <input type="checkbox" id="booking-babysitter" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl h-full">
          <label
            htmlFor="booking-babysitter"
            className="btn btn-sm btn-circle btn-ghost bg-red-500 absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="card bg-transparent">
            <figure>
              <h2 className="card-title">
                <img
                  className="w-40 h-40 rounded-full"
                  src={img}
                  alt="babysitter"
                />
                <strong className="text-primary">{name}</strong> for your Baby
              </h2>
            </figure>
            <div className="card-body relative top-8">
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <p>
                    <strong>Gender:</strong>{" "}
                    <span className="capitalize">{gender}</span>
                  </p>
                  {religion ? (
                    <p>
                      <strong>Religion:</strong> {religion}
                    </p>
                  ) : (
                    <p>
                      <strong>Religion:</strong> Islam
                    </p>
                  )}
                  <p>
                    <strong>Date of Birth:</strong> {dob}
                  </p>
                  <p className="capitalize">
                    <strong>Location:</strong>{" "}
                    {preferedLocation ? (
                      <ul>
                        {preferedLocation.map((loc, index) => (
                          <li key={index}>{loc}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    {availability ? (
                      <ul>
                        {availability.map((day, index) => (
                          <li key={index}>{day}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                  <p>
                    <strong>Experience:</strong> {experience} years
                  </p>
                  {lastAchievedDegree ? (
                    <p>
                      <strong>Last Achieved Degree:</strong>{" "}
                      {lastAchievedDegree}
                    </p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div>
                  {institute ? (
                    <p>
                      <strong>Institute:</strong> {institute}
                    </p>
                  ) : (
                    ""
                  )}
                  <p>
                    <strong>Qualifications:</strong>{" "}
                    {qualifications ? (
                      <ul>
                        {qualifications.map((qual, index) => (
                          <li key={index}>{qual}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                  <p>
                    <strong>Language Skills:</strong>{" "}
                    {languageSkills ? (
                      <ul>
                        {languageSkills.map((lang, index) => (
                          <li key={index}>{lang}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                  <p>
                    <strong>Special Skills:</strong>{" "}
                    {specialSkills ? (
                      <ul>
                        {specialSkills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                  <p>
                    <strong>Expected Salary:</strong> {expectedSalary}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <button
                  htmlFor="booking-babysitter"
                  onClick={handleBooking}
                  className={`btn btn-sm text-white font-bold w-1/4 btn-primary ${
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
            className="text-2xl font-bold text-primary text-center py-2 px-7"
            style={{ fontFamily: "arial" }}
          >
            Booking sent to{" "}
            <span className="text-2xl italic uppercase font-black text-primary text-center pl-2 py-5">
              {name}
            </span>
            !
          </h1>

          <button
            onClick={closeSuccessModal}
            className="btn btn-sm text-xs w-1/4 ml-32 mt-10 border-blue-500 text-white font-bold bg-primary"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default BookingBabysitter;
