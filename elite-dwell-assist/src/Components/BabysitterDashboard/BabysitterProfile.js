import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const BabysitterProfile = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBabysitter, setUpdatedBabysitter] = useState({});
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
  const qualificationOptions = [
    { label: "CPR & First Aid", value: "CPR & First Aid" },
    {
      label: "Crisis Prevention Institute(CPI)",
      value: "Crisis Prevention Institute(CPI)",
    },
  ];

  const specialSkillOptions = [
    { label: "Story Telling", value: "Story Telling" },
    { label: "Arts & Crafts", value: "Arts & Crafts" },
    { label: "Singing", value: "Singing" },
    { label: "Excellent Listener", value: "Excellent Listener" },
    { label: "Fun & Engaging", value: "Fun & Engaging" },
  ];

  const availabilityOptions = [
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
  ];

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/babysitter?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
              setUpdatedBabysitter({ ...matchingUser });
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
    setUpdatedBabysitter({ ...loggedUser });
  };

  const handleSaveChanges = () => {
    // Send a PUT request to update the babysitter information
    fetch(`http://localhost:5000/babysitter/${loggedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBabysitter),
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
      const updatedValues = [...(updatedBabysitter[name] || [])];

      if (checked) {
        updatedValues.push(value);
      } else {
        const index = updatedValues.indexOf(value);
        if (index > -1) {
          updatedValues.splice(index, 1);
        }
      }

      setUpdatedBabysitter({
        ...updatedBabysitter,
        [name]: updatedValues,
      });
    } else {
      setUpdatedBabysitter({
        ...updatedBabysitter,
        [name]: value,
      });
    }
  };

  console.log(updatedBabysitter);
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
        <strong className="text-primary text-xl capitalize underline">
          {loggedUser.name}
        </strong>
        <div className="grid grid-cols-2 gap-16">
          <div>
            <p className="mt-2">
              <strong className="capitalize">Gender:</strong>
              <span className="capitalize">{updatedBabysitter.gender}</span>
            </p>
            <p>
              <strong className="capitalize">Date of Birth:</strong>{" "}
              {updatedBabysitter.dob}
            </p>
            <p>
              <strong className="capitalize">Email:</strong>{" "}
              {updatedBabysitter.email}
            </p>
            <strong className="capitalize">NID:</strong> {updatedBabysitter.nid}
          </div>
          <div>
            <p>
              <strong className="capitalize">Address:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={updatedBabysitter.address || ""}
                  onChange={handleInputChange}
                  className="input input-bordered my-3 text-gray-600"
                />
              ) : (
                updatedBabysitter.address
              )}
            </p>

            <p>
              <strong className="capitalize">Contact:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="contact"
                  value={updatedBabysitter.contact || ""}
                  onChange={handleInputChange}
                  className="input input-bordered my-3 text-gray-600"
                />
              ) : (
                updatedBabysitter.contact
              )}
            </p>
            <p>
              <strong className="capitalize">Experience:</strong>{" "}
              {isEditing ? (
                <input
                  type="number"
                  name="experience"
                  value={updatedBabysitter.experience || ""}
                  onChange={handleInputChange}
                  className="input input-bordered my-3 text-gray-600"
                />
              ) : (
                `${updatedBabysitter.experience} years`
              )}
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-5">
          <div>
            <p>
              <strong className="text-primary underline">
                Preferred Location:
              </strong>
              {isEditing ? (
                <div className="mt-2 capitalize">
                  <ul>
                    {locationOptions.map((location) => (
                      <li key={location.value}>
                        <label className="block mb-1">
                          <input
                            type="checkbox"
                            name="preferedLocation"
                            value={location.value}
                            checked={(
                              updatedBabysitter.preferedLocation || []
                            ).includes(location.value)}
                            onChange={handleInputChange}
                          />{" "}
                          {location.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : Array.isArray(updatedBabysitter.preferedLocation) &&
                updatedBabysitter.preferedLocation.length > 0 ? (
                <span className="capitalize">
                  <ul>
                    {updatedBabysitter.preferedLocation.map((loc) => (
                      <li key={loc} className="capitalize">
                        <strong>{loc}</strong>
                      </li>
                    ))}
                  </ul>
                </span>
              ) : (
                "No locations selected."
              )}
            </p>
          </div>
          <div>
            <p>
              <strong className="text-primary underline">
                Special Skills:
              </strong>
              {isEditing ? (
                <div className="mt-2 capitalize">
                  <ul>
                    {specialSkillOptions.map((skill) => (
                      <li key={skill.value}>
                        <label className="block mb-1 capitalize">
                          <input
                            type="checkbox"
                            name="specialSkills"
                            value={skill.value}
                            checked={(
                              updatedBabysitter.specialSkills || []
                            ).includes(skill.value)}
                            onChange={handleInputChange}
                          />{" "}
                          {skill.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : Array.isArray(updatedBabysitter.specialSkills) &&
                updatedBabysitter.specialSkills.length > 0 ? (
                <ul>
                  {updatedBabysitter.specialSkills.map((skill) => (
                    <li key={skill} className="capitalize">
                      <strong>{skill}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                "No special skills selected."
              )}
            </p>
          </div>
          <div>
            <p>
              <strong className="text-primary underline">
                Qualifications:
              </strong>
              {isEditing ? (
                <div className="mt-2 capitalize">
                  <ul>
                    {qualificationOptions.map((qualification) => (
                      <li key={qualification.value}>
                        <label className="block mb-1 capitalize">
                          <input
                            type="checkbox"
                            name="qualifications" // Make sure this matches the state property name
                            value={qualification.value}
                            checked={(
                              updatedBabysitter.qualifications || []
                            ).includes(qualification.value)}
                            onChange={handleInputChange}
                          />{" "}
                          {qualification.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : Array.isArray(updatedBabysitter.qualifications) &&
                updatedBabysitter.qualifications.length > 0 ? (
                <ul>
                  {updatedBabysitter.qualifications.map((qualification) => (
                    <li key={qualification} className="capitalize">
                      <strong>{qualification}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                "No qualifications selected."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabysitterProfile;
