import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import BabysitterRow from "./BabysitterRow";

const BabysitterBookings = () => {
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
      fetch(
        `http://localhost:5000/babysitterBookings?customerEmail=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
        })
        .catch((error) => {
          console.error("Error fetching customer bookings:", error);
        });
    }
  }, [user]);

  // Filter bookings to display only if the logged user's email matches the customerEmail
  const filteredBookings = bookings.filter(
    (booking) => booking.customerEmail === user.email
  );
  console.log(filteredBookings);

  return (
    <div>
      <h2 className="text-3xl text-primary font-bold">
        My Bookings for Babysitter
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
                Babysitter Name
              </th>
              <th className="text-center text-primary underline w-1/6">
                Babysitter Email
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
              <BabysitterRow
                key={booking._id}
                booking={booking}
                userEmail={user.email}
                index={index}
                babysitterEmail={booking.babysitterEmail}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BabysitterBookings;
