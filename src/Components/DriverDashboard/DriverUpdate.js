import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const DriverUpdate = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/driver?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === user.email
            );
            if (matchingUser) {
              setLoggedUser(matchingUser);
              setUpdatedDriver({
                email: matchingUser.email,
                password: "",
                experience: matchingUser.experience.toString(),
                salary: matchingUser.salary.toString(),
                gender: matchingUser.gender,
                location: matchingUser.location,
                contact: matchingUser.contact,
              });
            }
          }
        });
    }
  }, [user]);

  const [updatedDriver, setUpdatedDriver] = useState({
    email: "",
    password: "",
    experience: "",
    salary: "",
    gender: "",
    location: [],
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "location") {
      // Handle location checkboxes
      setUpdatedDriver((prevData) => ({
        ...prevData,
        location: checked
          ? [...prevData.location, value]
          : prevData.location.filter((loc) => loc !== value),
      }));
    } else {
      // Handle other input fields
      const fieldValue = type === "checkbox" ? checked : value;
      setUpdatedDriver((prevData) => ({
        ...prevData,
        [name]: fieldValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(updatedDriver);

    try {
      fetch(`http://localhost:5000/driver/${loggedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDriver),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // Handle success or error
        });
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };
  const handleCancelClick = () => {
    // Implement logic to handle cancel button click
    // For example, redirecting to the driver profile page
    // Example using React Router: history.push('/driver-profile');
  };

  return (
    <div className="relative rounded-3xl bg-peak-primary w-full h-[1074px] overflow-hidden text-left text-base text-darkslategray-100 font-montserrat">
      <div className="relative w-[1440px] h-[1138px] hidden" />
      <div className="absolute top-[1px] left-[7px] w-[1333px] h-[943px]">
        <b className="absolute top-[386px] left-[calc(50%_-_658.5px)] inline-block w-[121px]">
          Email Address
        </b>
        <input
          className="bg-peak-primary absolute top-[415px] left-[calc(50%_-_661.5px)] rounded-lg box-border w-[339px] h-10 border-[1px] border-solid border-lightgray-100"
          name="email"
          placeholder=" e.g. abc@google.com"
          type="text"
          onChange={handleChange}
        />

        <b className="absolute top-[571px] left-[576px] inline-block w-[84px] h-[23px]">
          Location
        </b>
        <b className="absolute top-[658px] left-[7px] inline-block w-40 h-7">
          Experience(Years)
        </b>
        <input
          className="bg-peak-primary absolute top-[599px] left-[4px] rounded-lg box-border w-[342px] h-11 border-[1px] border-solid border-lightgray-100"
          name="salary"
          placeholder=" enter expected salary"
          type="text"
          onChange={handleChange}
        />
        <div className="absolute top-[153.7px] left-[-110px] w-[278.4px] h-[104.6px] overflow-hidden text-xl">
          <b className="absolute top-[8.3px] left-[calc(50%_-_20px)] inline-block w-[159.2px]">
            {loggedUser.name}
          </b>
          <div className="absolute top-[40.3px] left-[calc(50%_-_20px)] inline-block w-[158.2px]">
            {loggedUser.role}
          </div>
        </div>
        <div className="absolute top-[309px] left-[8px] w-[748px] h-5 overflow-hidden flex flex-row items-start justify-start gap-[435px]">
          <b className="relative inline-block w-[132px] h-2.5 shrink-0">
            Phone Number
          </b>
          <b className="relative inline-block w-[181px] shrink-0">Gender</b>
        </div>
        <input
          className="bg-peak-primary absolute bottom-[568px] left-[calc(50%_-_661.5px)] rounded-lg box-border w-[339px] h-10 border-[1px] border-solid border-lightgray-100"
          name="contact"
          placeholder=" e.g. 01XXXXXXXXX"
          type="text"
          onChange={handleChange}
        />
        <select
          className="absolute top-[336.5px] left-[579px] rounded-md [background:linear-gradient(#fffdfd,_#fffdfd),_#fff] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[199px] h-[37px] flex flex-row items-center justify-end pt-2.5 px-[8.83319091796875px] pb-[9px] box-border gap-[50px]"
          required={true}
          name="gender"
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <b className="absolute top-[482px] left-[calc(50%_-_660.5px)] inline-block w-[147.4px]">
          New Password
        </b>
        <b className="absolute top-[482px] left-[calc(50%_-_92.1px)] inline-block w-[203.4px]">
          Confirm New Password
        </b>
        <div className="absolute top-[553px] left-[calc(50%_-_105.5px)] w-[28.3px] h-7" />
        <input
          className="bg-peak-primary absolute top-[512px] left-[calc(50%_-_663.5px)] rounded-lg box-border w-[341px] h-[41px] border-[1px] border-solid border-lightgray-100"
          name="password"
          placeholder=" enter new password"
          type="password"
          onChange={handleChange}
        />
        <b className="absolute top-[386px] left-[calc(50%_-_84.5px)] inline-block w-[147.4px]">
          Lisence no.
        </b>
        <input
          className="bg-peak-primary absolute top-[414px] left-[calc(50%_-_87.5px)] rounded-lg box-border w-[341px] h-[41px] border-[1px] border-solid border-lightgray-100"
          name="lisence"
          placeholder=" enter lisence no."
          type="text"
          onChange={handleChange}
        />
        <input
          className="bg-peak-primary absolute top-[515px] left-[calc(50%_-_91.5px)] rounded-lg box-border w-[356px] h-[38px] border-[1px] border-solid border-lightgray-100"
          name="password"
          placeholder=" retype the password"
          type="password"
        />
        <b className="absolute top-[569px] left-[7px] inline-block w-[203px] h-[18px]">
          Expected Salary (Taka)
        </b>
        <input
          className="[border:none] font-montserrat text-mini bg-gray absolute top-[690px] left-[9px] rounded-md shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[199px] h-[37px] overflow-hidden flex flex-row items-center justify-end pt-2.5 px-2.5 pb-[9px] box-border"
          placeholder=" enter years"
          type="text"
          name="experience"
          onChange={handleChange}
        />
        <div className="absolute top-20 right-80 w-80 h-[59px] overflow-hidden flex flex-row items-center justify-start gap-10">
          <button
            className="cursor-pointer py-2 px-0 bg-primary rounded-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] box-border w-20 h-10 flex flex-row items-center justify-center border-[1px] border-solid border-black"
            id="cancel_button"
            onClick={handleCancelClick}
          >
            <Link
              to="/driverDashboard"
              className="cursor-pointer py-2 px-0 text-white rounded-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] box-border w-20 h-10 flex flex-row items-center justify-center border-[1px] border-solid border-black"
            >
              Cancel
            </Link>
          </button>
          <button
            className="cursor-pointer [border:none] bg-primary py-[17px] bg-mediumslateblue rounded-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-20 h-10 flex flex-col items-start justify-end box-border border-black"
            id="Save_Changes_Button"
            onClick={handleSubmit}
          >
            <b className="absolute text-base leading-[400%] inline-block text-white text-center w-20 h-10 border-black">
              Save
            </b>
          </button>
        </div>
        <b className="absolute top-20 left-[calc(50%_-_666.5px)] text-[24px] leading-[20px] flex font-lato text-center items-center justify-center w-[173px]">
          Update Profile
        </b>
        <img
          className="absolute top-[51.7px] left-[calc(50%_-_660.2px)] w-[143px] h-px"
          alt=""
          src="/vector-75.svg"
        />
        <div className="absolute top-[605px] left-[576px] text-mini text-black inline-block w-[140px] h-[18px]">
          Motijheel
        </div>
        <div className="absolute top-[668px] left-[574px] text-mini text-black inline-block w-[140px] h-[18px]">
          Savar
        </div>
        <div className="absolute top-[694px] left-[574px] text-mini text-black inline-block w-[140px] h-[18px]">
          Uttora
        </div>
        <div className="absolute top-[605px] left-[826px] text-mini text-black inline-block w-[122px] h-[18px]">
          Mohammadpur
        </div>
        <div className="absolute top-[637px] left-[826px] text-mini text-black inline-block w-[120px] h-4">
          Banani
        </div>
        <div className="absolute top-[668px] left-[826px] text-mini text-black inline-block w-[120px] h-[18px]">
          Gulshan
        </div>
        <div className="absolute top-[638px] left-[576px] text-mini text-black inline-block w-[141px] h-[18px]">{`Mirpur `}</div>
        <input
          className="absolute top-[609px] left-[728px] bg-gainsboro w-[17px] h-3"
          id="Motijheel"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
        <input
          className="absolute top-[609px] left-[965px] bg-gainsboro w-[17px] h-3"
          id="Mohammadpur"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
        <input
          className="absolute top-[671px] left-[965px] bg-gainsboro w-[17px] h-3"
          id="Gulshan"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
        <input
          className="absolute top-[639px] left-[965px] bg-gainsboro w-[17px] h-3"
          id="Banani"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
        <input
          className="absolute top-[697px] left-[728px] bg-gainsboro w-[17px] h-3"
          id="Uttora"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
        <input
          className="absolute top-[671px] left-[728px] bg-gainsboro w-[17px] h-3"
          id="Savar"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
        <input
          className="absolute top-[642px] left-[728px] bg-gainsboro w-[17px] h-3"
          id="Mirpur"
          type="checkbox"
          name="location"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DriverUpdate;
