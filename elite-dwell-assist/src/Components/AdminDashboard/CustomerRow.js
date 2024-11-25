import React from "react";

const CustomerRow = ({ user, index }) => {
  return (
    <tr>
      <td className="uppercase text-md font-bold text-left">
        {" "}
        {user.id ? user.id : index + 1}
      </td>
      <td className="font-semibold">{user.name}</td>
      <td className="font-semibold">{user.email}</td>
      <td className="font-semibold">{user.address}</td>
      <td className="font-semibold">{user.contact}</td>
    </tr>
  );
};

export default CustomerRow;
