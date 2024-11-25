import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { Link } from "react-router-dom";

const DriverPerMonthCard = ({ driver, setBookDriver }) => {
  const { img, name, location, salary, averageRating, email } = driver;
  const [bookedDrivers, setBookedDrivers] = useState([]);
  const [user] = useAuthState(auth);
  console.log(email);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/averageRatingDriver/${email}`
        );
        const data = await response.json();
        // Use the average rating data as needed
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [email]);

  const handleKnowMoreClick = () => {
    if (!bookedDrivers.includes(driver)) {
      setBookedDrivers([...bookedDrivers, driver]);
      setBookDriver(driver);
    }
  };

  return (
    <div>
      <div className="w-80 h-80 rounded-3xl border-2 pb-[16.67%] text-black relative bg-slate-100 m-4 hover:scale-105 cursor-grab transition-all duration-300 ease-in-out">
        <div>
          <figure className="absolute top-3 left-3 right-0 h-full">
            <img src={img} alt="Driver" className="h-28 w-28 rounded-full" />
          </figure>
          <div className="p-7 text-right text-black font-bold ">
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-black">
          <p>
            <strong className="text-indigo-800 underline">
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
          <p className="pt-2">
            <strong className="text-indigo-800 underline">Salary :</strong>{" "}
            {salary}
          </p>
          {averageRating > 0 && (
            <p>
              <strong className="text-indigo-800 underline">
                Average Rating:
              </strong>{" "}
              <span className="text-lg text-yellow-700 font-bold">
                {averageRating.toFixed(2)}
              </span>
            </p>
          )}
          <div className="mt-2">
            <label
              htmlFor="booking-Driver"
              onClick={handleKnowMoreClick}
              className="px-4 btn-md bg-secondary text-white font-bold rounded-full hover:bg-opacity-80 transition duration-300"
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

export default DriverPerMonthCard;
