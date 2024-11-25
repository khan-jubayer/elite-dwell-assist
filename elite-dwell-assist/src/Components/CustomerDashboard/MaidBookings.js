import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import MaidRow from "./MaidRow";

const MaidBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/customer?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
            }
          }
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/bookings?customerEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
        })
        .catch((error) => {
          console.error("Error fetching customer bookings:", error);
        });
    }
  }, [user]);

  const filteredBookings = bookings.filter(
    (booking) => booking.customerEmail === user.email
  );

  return (
    <div>
      <h2 className="text-3xl text-primary font-bold">
        My Bookings for House-Helper
      </h2>
      {filteredBookings.length === 0 ? (
        <p className="text-red-600 pt-7">
          You have not made any booking till now.
        </p>
      ) : (
        <table className="border-collapse w-full mt-12">
          <thead>
            <tr>
              <th className="text-center text-primary underline w-1/6">
                Maid Name
              </th>
              <th className="text-center text-primary underline w-1/6">
                Maid Email
              </th>
              <th className="text-center text-primary underline w-1/6">
                Maid Task
              </th>
              <th className="text-center text-primary underline w-1/6">
                Created Time
              </th>
              <th className="text-center text-primary underline w-1/4">
                Review
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <MaidRow
                key={booking._id}
                booking={booking}
                index={index}
                userEmail={user.email}
                maidEmail={booking.maidEmail}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaidBookings;
