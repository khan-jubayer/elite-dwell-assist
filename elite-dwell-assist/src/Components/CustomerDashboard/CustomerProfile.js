import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const CustomerProfile = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [newPassword, setNewPassword] = useState("");

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
              setUpdatedUser(matchingUser);
            }
          }
        });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedUser(loggedUser);
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:5000/customer/${loggedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Handle success or error
        setIsEditing(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleChangePassword = () => {
    console.log("Changing password to:", newPassword);
    setNewPassword("");
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl text-primary font-bold">{loggedUser?.name}</h2>
      </div>
      <div className="text-right">
        {isEditing ? (
          <div>
            <button
              className="bg-primary text-white font-semibold px-6 py-2 rounded-lg"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="text-primary font-semibold px-6 py-2 ml-4"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-primary text-white font-semibold px-6 py-2 rounded-lg"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        )}
      </div>
      <div>
        <h3 className="text-xl text-primary underline font-semibold mb-3">
          Personal Information
        </h3>
        <ul className="mb-4">
          <li className="mb-2">
            <span className="text-md font-medium text-primary">Gender:</span>

            <span className="ml-4 font-bold capitalize">
              {updatedUser.gender}
            </span>
          </li>
          <li className="mb-2">
            <span className="text-md font-medium text-primary">
              Date of Birth:
            </span>
            {isEditing ? (
              <input
                type="text"
                name="dob"
                value={updatedUser.dob}
                onChange={handleInputChange}
                className="input input-bordered input-sm ml-4 font-bold capitalize"
              />
            ) : (
              <span className="ml-4 font-bold">{updatedUser.dob}</span>
            )}
          </li>
        </ul>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="text-xl underline text-primary font-semibold mb-3">
          Contact Information
        </h3>
        <ul className="mb-4">
          <li className="mb-2">
            <span className="text-md font-medium text-primary">Address:</span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={updatedUser.address}
                onChange={handleInputChange}
                className="input input-bordered input-sm ml-4 font-bold capitalize"
              />
            ) : (
              <span className="ml-4 font-bold">{updatedUser.address}</span>
            )}
          </li>
          <li className="mb-2">
            <span className="text-md font-medium text-primary">Email:</span>
            <span className="ml-4 font-bold">{loggedUser?.email}</span>
          </li>
          <li className="mb-2">
            <span className="text-lg font-medium text-primary">Contact:</span>
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={updatedUser.contact}
                onChange={handleInputChange}
                className="input input-bordered input-sm ml-4 font-bold capitalize"
              />
            ) : (
              <span className="ml-4 font-bold">{updatedUser.contact}</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerProfile;
