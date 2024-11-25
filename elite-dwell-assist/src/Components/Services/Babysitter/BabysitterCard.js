import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";

const BabysitterCard = ({ babysitter, setBookBabysitter }) => {
  const {
    img,
    name,
    preferedLocation,
    availability,
    expectedSalary,
    workingHour,
    averageRating,
    email,
  } = babysitter;
  const [bookedBabysitters, setBookedBabysitters] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const handleKnowMoreClick = () => {
    if (!bookedBabysitters.includes(babysitter)) {
      setBookedBabysitters([...bookedBabysitters, babysitter]);
      setBookBabysitter(babysitter);
    }
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/averageRatingBabysitter/${email}`
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [email]);

  return (
    <div>
      <div className="cursor-pointer w-[290px] max-w-sm h-96 rounded-xl border-2 pb-[2%] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  relative bg-slate-100 m-4 hover:scale-105  transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center p-4">
          <img
            src={img}
            alt="Babysitter"
            className="w-[104px] h-[104px] mb-3 object-cover rounded-full shadow-lg"
          />
          <h5 className="text-xl text-center text-[1.2rem] text-[#28252e] font-semibold overflow-hidden pb-1">
            {name}
          </h5>
          <div className=" text-left text-[1.03rem] text-[#3b3939] overflow-hidden">
            <text className="text-[#3b3939] font-medium">Area:&nbsp;</text>
            {Array.isArray(preferedLocation)
              ? preferedLocation.length <= 2
                ? preferedLocation
                    .map(
                      (loc) => loc.trim()[0].toUpperCase() + loc.trim().slice(1)
                    )
                    .join(", ")
                : `${preferedLocation
                    .slice(0, 2)
                    .map(
                      (loc) => loc.trim()[0].toUpperCase() + loc.trim().slice(1)
                    )
                    .join(", ")} ...`
              : "None"}
          </div>
          <div className=" text-left text-[1.03rem] text-[#3b3939] overflow-hidden">
            <text className=" text-[#3b3939] font-medium">Availability: </text>
            {Array.isArray(availability)
              ? availability.length <= 2
                ? availability
                    .map(
                      (loc) => loc.trim()[0].toUpperCase() + loc.trim().slice(1)
                    )
                    .join(", ")
                : `${availability
                    .slice(0, 2)
                    .map(
                      (loc) => loc.trim()[0].toUpperCase() + loc.trim().slice(1)
                    )
                    .join(", ")} ...`
              : "None"}
          </div>
          <div className=" text-left text-[1.03rem] text-[#3b3939] overflow-hidden">
            <text className=" text-[#3b3939] font-medium">Salary: </text>
            {expectedSalary ? expectedSalary : "None"}
          </div>
          <div className=" text-left text-[1.03rem] text-[#3b3939] overflow-hidden">
            <text className=" text-[#3b3939] font-medium">Working Hour: </text>
            {workingHour ? workingHour : "None"}
          </div>{" "}
          {averageRating > 0 && (
            <p className="mt-2">
              <strong className="text-blue-800 underline">
                Average Rating:
              </strong>{" "}
              <span className="text-lg text-yellow-700 font-bold">
                {averageRating.toFixed(2)}
              </span>
            </p>
          )}
          <div className="pt-2">
            <label
              htmlFor="booking-babysitter"
              onClick={handleKnowMoreClick}
              className="px-4 btn-md mt-3 bg-primary text-white font-bold rounded-full hover:bg-opacity-80 transition duration-300"
            >
              Know More
            </label>

            {user ? (
              <p></p>
            ) : (
              <p>
                <Link
                  to="/login"
                  className="text-red-500 text-xs font-bold rounded-full hover:bg-opacity-80 transition duration-300 px-2 btn-sm mt-1"
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

export default BabysitterCard;
