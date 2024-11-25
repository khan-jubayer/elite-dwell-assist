import React from "react";

const MaidRow = ({ user, index }) => {
  return (
    <tr>
      <td className="uppercase text-md font-bold text-left">
        {" "}
        {user.id ? user.id : index + 1}
      </td>
      <td className="font-semibold capitalize">{user.name}</td>
      <td className="font-semibold">{user.email}</td>
      <td className="font-semibold">{user.address}</td>
      <td className="font-semibold">{user.contact}</td>
      <td>
        <img className="w-28 h-28 rounded-full" src={user.img} alt="" />
      </td>
    </tr>
  );
};

export default MaidRow;
