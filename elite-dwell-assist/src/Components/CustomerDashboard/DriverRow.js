import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DriverRow = ({ booking, driverEmail, userEmail, index }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    checkIfUserHasAlreadyReviewedDriver(userEmail, driverEmail);
  }, [userEmail, driverEmail]);

  const [hasAlreadyReviewedDriver, setHasAlreadyReviewedDriver] =
    useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };
  const info = booking.driverEmail;

  const getUserReviews = async (userEmail, reviewType) => {
    try {
      const response = await fetch(
        `http://localhost:5000/reviews?userEmail=${userEmail}&reviewType=${reviewType}`
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch user reviews");
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      return [];
    }
  };
  const checkIfUserHasAlreadyReviewedDriver = async (
    userEmail,
    driverEmail
  ) => {
    const userReviews = await getUserReviews(userEmail, driverEmail);
    const alreadyReviewed = userReviews.length > 0;
    setHasAlreadyReviewedDriver(alreadyReviewed);
  };

  const submitReview = async () => {
    if (rating > 0 && reviewText) {
      if (hasAlreadyReviewedDriver) {
        toast.error("You have already reviewed this driver.");
      } else {
        const review = {
          userEmail,
          driverEmail,
          rating,
          reviewText,
          info,
          reviewType: "driver",
        };
        try {
          fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success("Thanks for your review.", {
                position: toast.POSITION.TOP_CENTER,
              });
              checkIfUserHasAlreadyReviewedDriver(userEmail, driverEmail);
            });
        } catch (error) {
          console.error("Error submitting review:", error);
        }
      }
    }
  };

  const rowColorClass = index % 2 === 0 ? "bg-white" : "bg-indigo-50";

  return (
    <tr className={`${rowColorClass} text-center`}>
      <td className="capitalize">{booking?.driverName}</td>
      <td>{booking?.driverEmail}</td>
      <td>
        {booking?.createdDate
          ? new Date(booking?.createdDate).toLocaleString()
          : "Invalid Date"}
      </td>
      <td>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="text-xl"
            onClick={() => handleRatingClick(index + 1)}
            style={{ cursor: "pointer", color: "green" }}
          >
            {index < rating ? "★" : "☆"}
          </span>
        ))}
        <textarea
          className="input input-bordered w-full my-3"
          placeholder="Write a review (max 100 characters)"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button
          className="btn btn-sm text-xs w-full border-blue-500 text-white font-bold bg-primary mb-5"
          onClick={submitReview}
        >
          Submit Review
        </button>
      </td>
    </tr>
  );
};

export default DriverRow;
