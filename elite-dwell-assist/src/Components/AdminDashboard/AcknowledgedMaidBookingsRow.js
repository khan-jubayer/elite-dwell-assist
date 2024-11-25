import React from "react";
import CountdownTimer from "./CountdownTimer";

const AcknowledgedMaidBookingsRow = ({ user }) => {
  return (
    <tr>
      <td className="text-md capitalize">{user?.userName}</td>
      <td className="text-md">{user?.userEmail}</td>
      <td className="text-md">
        {new Date(user?.selectedDate).toLocaleDateString()}
      </td>
      <td className="text-md">{user?.selectedTimeSlot}</td>
      <td className="text-md">
        {user?.selectedServices.map((service, index) => (
          <div key={index}>
            {typeof service === "string"
              ? service
              : `${service.name} (${service.count})`}
          </div>
        ))}
      </td>
      <td className="text-md capitalize">{user?.address.area}</td>
      <td className="text-md capitalize">
        {user?.acknowledgeBookingType || "Maid Per Day"}
      </td>
      <td className="text-lg">
        <CountdownTimer selectedDate={user?.selectedDate} />
      </td>
    </tr>
  );
};

export default AcknowledgedMaidBookingsRow;
