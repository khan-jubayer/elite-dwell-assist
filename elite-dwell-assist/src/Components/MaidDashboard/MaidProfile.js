import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { updatePassword } from "firebase/auth";

const MaidProfile = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMaid, setUpdatedMaid] = useState({});
  const locationOptions = [
    { label: "dhanmondi", value: "dhanmondi" },
    { label: "mirpur", value: "mirpur" },
    { label: "savar", value: "savar" },
    { label: "uttora", value: "uttora" },
    { label: "gulshan", value: "gulshan" },
    { label: "mohammadpur", value: "mohammadpur" },
    { label: "banani", value: "banani" },
    { label: "motijheel", value: "motijheel" },
  ];
  const expertiseOptions = [
    { value: "mopping", label: "Mopping" },
    { value: "cooking", label: "Cooking" },
    { value: "cloth_washing", label: "Cloth Washing" },
    { value: "sweeping", label: "Sweeping" },
    { value: "dish_washing", label: "Dish Washing" },
  ];
  const availabilityOptions = [
    { label: "08.00 AM - 11.00 AM", value: "sokal" },
    { label: "11.00 AM - 02.00 PM", value: "dupur" },
    { label: "02.00 PM - 05.00 PM", value: "bikal" },
    { label: "05.00 PM - 08.00 PM", value: "raat" },
  ];

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/maid?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
              setUpdatedMaid({ ...matchingUser });
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
    setUpdatedMaid({ ...loggedUser });
  };

  const handleSaveChanges = () => {
    // Send a PUT request to update the maid information
    fetch(`http://localhost:5000/maid/${loggedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMaid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Handle success or error
        setIsEditing(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedValues = [...(updatedMaid[name] || [])];

      if (checked) {
        updatedValues.push(value);
      } else {
        const index = updatedValues.indexOf(value);
        if (index > -1) {
          updatedValues.splice(index, 1);
        }
      }

      setUpdatedMaid({
        ...updatedMaid,
        [name]: updatedValues,
      });
    } else {
      setUpdatedMaid({
        ...updatedMaid,
        [name]: value,
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {isEditing ? (
          <div className="absolute top-36 right-24">
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
          <div className="absolute top-32 right-28 ">
            <button
              className="bg-primary text-white font-semibold px-6 py-2 rounded-lg mt-6"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
        )}
        <h1 className="text-2xl text-primary text-center mb-8 font-bold">
          {isEditing ? "Update Profile" : "Profile"}
        </h1>
        <strong className="text-primary text-xl underline">
          {loggedUser.name}
        </strong>
        <div className="grid grid-cols-2 gap-16 ">
          <div>
            <p className="mt-2">
              <strong className="capitalize"> Gender: </strong>
              <span className="capitalize">{updatedMaid.gender}</span>
            </p>{" "}
            <p>
              <strong className="capitalize">Date of Birth:</strong>{" "}
              {updatedMaid.dob}
            </p>{" "}
            <p>
              <strong className="capitalize">Email:</strong> {updatedMaid.email}
            </p>
            <strong className="capitalize">NID:</strong> {updatedMaid.nid}
          </div>
          <div>
            <p>
              <strong className="capitalize">Address:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={updatedMaid.address || ""}
                  onChange={handleInputChange}
                  className="input input-bordered my-3 text-gray-600"
                />
              ) : (
                updatedMaid.address
              )}
            </p>

            <p>
              <strong className="capitalize">Contact:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="contact"
                  value={updatedMaid.contact || ""}
                  onChange={handleInputChange}
                  className="input input-bordered my-3 text-gray-600"
                />
              ) : (
                updatedMaid.contact
              )}
            </p>
            <p>
              <strong className="capitalize">Experience:</strong>{" "}
              {isEditing ? (
                <input
                  type="number"
                  name="experience"
                  value={updatedMaid.experience || ""}
                  onChange={handleInputChange}
                  className="input input-bordered my-3 text-gray-600"
                />
              ) : (
                `${updatedMaid.experience} years`
              )}
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-5">
          <div>
            <p>
              <strong className="text-primary underline">Location:</strong>
              {isEditing ? (
                <div className="mt-2 capitalize">
                  <ul>
                    {locationOptions.map((location) => (
                      <li key={location.value}>
                        <label className="block mb-1">
                          <input
                            type="checkbox"
                            name="location"
                            value={location.value}
                            checked={(updatedMaid.location || []).includes(
                              location.value
                            )}
                            onChange={handleInputChange}
                          />{" "}
                          {location.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : Array.isArray(updatedMaid.location) &&
                updatedMaid.location.length > 0 ? (
                <ul>
                  {updatedMaid.location.map((loc) => (
                    <li key={loc} className="capitalize">
                      <strong>{loc}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                "No locations selected."
              )}
            </p>
          </div>
          <div>
            {" "}
            <strong className="text-primary underline">Task : </strong>
            {isEditing ? (
              <div className="mt-2 capitalize">
                <ul>
                  {expertiseOptions.map((expertise) => (
                    <li key={expertise.value}>
                      <label className="block mb-1 capitalize">
                        <input
                          type="checkbox"
                          name="task"
                          value={expertise.value}
                          checked={(updatedMaid.task || []).includes(
                            expertise.value
                          )}
                          onChange={handleInputChange}
                        />{" "}
                        {expertise.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ) : Array.isArray(updatedMaid.task) &&
              updatedMaid.task.length > 0 ? (
              <ul>
                {updatedMaid.task.map((task) => (
                  <li key={task} className="capitalize">
                    <strong>{task}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              "No task selected."
            )}
          </div>
          <div>
            <p>
              <strong className="text-primary underline">Availability:</strong>
              {isEditing ? (
                <div className="mt-2">
                  {availabilityOptions.map((option) => (
                    <label key={option.value} className="block mb-1">
                      <input
                        type="checkbox"
                        name="availability"
                        value={option.value}
                        checked={(updatedMaid.availability || []).includes(
                          option.value
                        )}
                        onChange={handleInputChange}
                      />{" "}
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : Array.isArray(updatedMaid.availability) &&
                updatedMaid.availability.length > 0 ? (
                <ul>
                  {updatedMaid.availability.map((selectedOption, index) => (
                    <li key={index}>
                      <strong>
                        {
                          availabilityOptions.find(
                            (option) => option.value === selectedOption
                          )?.label
                        }
                      </strong>
                    </li>
                  ))}
                </ul>
              ) : (
                "No availability selected."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidProfile;
