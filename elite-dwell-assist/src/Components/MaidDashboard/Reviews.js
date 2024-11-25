import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Reviews = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:5000/maid?email=${user.email}`
          );
          const data = await response.json();

          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (loggedUser && loggedUser.email) {
        try {
          const response = await fetch(`http://localhost:5000/review`);
          const data = await response.json();

          if (Array.isArray(data)) {
            const userReviews = data.filter(
              (review) => review.info === loggedUser.email
            );

            setReviews(userReviews);

            // Calculate average rating
            if (userReviews.length > 0) {
              const totalRating = userReviews.reduce(
                (acc, review) => acc + review.rating,
                0
              );
              const avgRating = totalRating / userReviews.length;
              setAverageRating(avgRating);

              // Post the average rating to the server
              try {
                await fetch("http://localhost:5000/averageRating", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    maidEmail: loggedUser.email,
                    averageRating: avgRating,
                  }),
                });
              } catch (error) {
                console.error("Error posting average rating:", error);
              }
            }
          } else {
            console.error("Invalid data received:", data);
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    };
    fetchReviews();
  }, [loggedUser]);

  return (
    <div className="reviews-container">
      <h2 className="text-3xl text-primary font-bold">My Reviews</h2>

      <div className="reviews">
        {reviews.length > 0 ? (
          <>
            <p className="text-lg pt-7">
              Average Rating:{" "}
              <span className="text-xl text-primary font-bold">
                {averageRating.toFixed(2)}
              </span>
            </p>
            {reviews.map((review) => (
              <div
                key={review._id}
                className="review-card bg-white p-4 rounded shadow-md my-4"
              >
                <p className="font-bold">Customer Email: {review?.userEmail}</p>
                <div className="rating flex items-center">
                  <p>Rating: {review.rating}</p>
                  <div className="stars ml-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`star ${
                          index < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-text">Review Text: {review.reviewText}</p>
              </div>
            ))}
          </>
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
