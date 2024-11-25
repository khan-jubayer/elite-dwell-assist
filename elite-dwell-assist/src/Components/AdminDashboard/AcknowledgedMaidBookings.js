import React, { useEffect, useState } from "react";
import up from "../../images/up-arrow-svgrepo-com.svg";
import down from "../../images/down-arrow-svgrepo-com.svg";
import AcknowledgedMaidBookingsRow from "./AcknowledgedMaidBookingsRow";

const AcknowledgedMaidBookings = () => {
  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:5000/acknowledgeBooking")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      // Toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set the new column for sorting
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (columnName) => {
    return (
      <span>
        {sortColumn === columnName && sortDirection === "asc" && (
          <img className="w-3" src={up} alt="Ascending" />
        )}
        {sortColumn === columnName && sortDirection === "desc" && (
          <img className="w-3" src={down} alt="Descending" />
        )}
      </span>
    );
  };
  console.log(users);

  return (
    <div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Name
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Email
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Selected Date
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Time Slot
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Services
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                Area
              </th>
              <th className="uppercase underline text-lg text-primary font-extrabold text-left">
                BookingType
              </th>{" "}
              <th className="uppercase underline text-lg text-primary font-extrabold text-left w-1/5">
                Time left
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <AcknowledgedMaidBookingsRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcknowledgedMaidBookings;
