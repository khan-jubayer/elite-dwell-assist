import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { Link } from "react-router-dom";

const MaidPerMonthCard = ({ maid, setBookMaid }) => {
  const { img, name, location, availability, averageRating, email } = maid;
  const [bookedMaids, setBookedMaids] = useState([]);
  const [user] = useAuthState(auth);

  const availabilityOptions = [
    { label: "08.00 AM - 11.00 AM", value: "sokal" },
    { label: "11.00 AM - 02.00 PM", value: "dupur" },
    { label: "02.00 PM - 05.00 PM", value: "bikal" },
    { label: "05.00 PM - 08.00 PM", value: "raat" },
  ];
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/averageRating/${email}`
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [email]);

  const handleKnowMoreClick = () => {
    if (!bookedMaids.includes(maid)) {
      setBookedMaids([...bookedMaids, maid]);
      setBookMaid(maid);
    }
  };

  return (
    <div>
      <div className="w-80 h-96 rounded-3xl border-2 pb-[16.67%] text-black relative bg-slate-100 m-4 hover:scale-105 cursor-grab transition-all duration-300 ease-in-out">
        <div>
          <figure className="absolute top-3 left-3 right-0 h-full">
            <img src={img} alt="Maid" className="h-32 w-32 rounded-full" />
          </figure>
          <div className="p-7 text-right text-black font-bold ">
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-right text-black">
          <p>
            <strong className="text-blue-800 underline">
              Preferred Location:
            </strong>
            {Array.isArray(location)
              ? location
                  .map(
                    (loc) => loc.trim()[0].toUpperCase() + loc.trim().slice(1)
                  )
                  .join(", ")
              : location}
          </p>
          <p>
            <strong className="text-blue-800 underline">Availability:</strong>
            <ul>
              {Array.isArray(availability)
                ? availability.map((daySlot, index) => (
                    <li key={index}>
                      <strong>
                        {
                          availabilityOptions.find(
                            (option) => option.value === daySlot
                          )?.label
                        }
                      </strong>
                    </li>
                  ))
                : "Availability not specified"}
            </ul>
          </p>
          {averageRating > 0 && (
            <p className="mt-1">
              <strong className="text-blue-800 underline">
                Average Rating:
              </strong>{" "}
              <span className="text-yellow-600 font-bold">
                {averageRating.toFixed(2)}
              </span>
            </p>
          )}
          <div className="mt-2">
            <label
              htmlFor="booking-maid"
              onClick={handleKnowMoreClick}
              className="px-4 btn-md bg-primary text-white font-bold rounded-full hover:bg-opacity-80 transition duration-300"
            >
              Know More
            </label>

            {user ? (
              <p></p>
            ) : (
              <p>
                <Link
                  to="/login"
                  className="text-red-500 text-xs font-bold rounded-full hover:bg-opacity-80 transition duration-300 px-2 btn-sm"
                >
                  Login for details
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidPerMonthCard;
