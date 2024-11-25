import React from 'react';

const RoleCard = ({ role, icon, label, selectedRole, handleRoleSelect }) => (
  <div
    className={`cursor-pointer p-4 rounded-lg border-2 ${
      selectedRole === role ? "bg-sky-300 text-black" : "text-center"
    }`}
    onClick={() => handleRoleSelect(role)}
  >
    <img className="w-8 mx-auto mb-2" src={icon} alt={label} />
    {label}
  </div>
);

export default RoleCard;