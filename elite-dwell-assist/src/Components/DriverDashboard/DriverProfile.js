import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import React, { useState, useEffect } from "react";
import axios from "axios";

const DriverProfile = () => {
  const [user] = useAuthState(auth);
  const [loggedUser, setLoggedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    expectedSalary: "",
    location: "",
    password: "",
    reenterPassword: "",
  });

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
              setFormData(matchingUser);
            }
          }
        });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to update the user information
      await axios.put(
        `http://localhost:5001/driver/${loggedUser._id}`,
        formData
      );
      // Handle success (e.g., show a success message)
      setIsEditing(false);
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  function calculateAge(birthDate) {
    // Parse the birthDate string into a Date object
    const birthDateObject = new Date(birthDate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    const age = currentDate.getFullYear() - birthDateObject.getFullYear();

    // Check if the birthday for this year has occurred or not
    if (
      currentDate.getMonth() < birthDateObject.getMonth() ||
      (currentDate.getMonth() === birthDateObject.getMonth() &&
        currentDate.getDate() < birthDateObject.getDate())
    ) {
      // If the birthday hasn't occurred this year yet, subtract 1 from the age
      return age - 1;
    } else {
      return age;
    }
  }
  const age = calculateAge(loggedUser.dob);

  return (
    <div className="w-full h-full text-left text-2xl text-darkslategray-100 font-montserrat">
      <div className="absolute top-[100.98px] left-[calc(50%_-_397.33px)] w-[727.46px] h-[159.8px]">
        <div className="absolute top-[70.4px] left-[calc(50%_-_177.07px)] w-[220.09px] h-[27.37px]"></div>
        <div className="flex flex-row items-center justify-end">
          {!isEditing && (
            <button
              className="btn btn-sm text-xs w-20 border-blue-500 text-white font-bold bg-primary"
              onClick={handleEdit}
            >
              <Link
                to="/driverDashboard/driverUpdate"
                className="btn btn-sm text-xs w-20 border-blue-500 text-white font-bold bg-primary"
              >
                Edit
              </Link>
            </button>
          )}
        </div>
        <img
          className="absolute top-[30.75px] w-[129.12px] h-[123.7px] object-cover"
          id="driver_image"
          alt=""
          src={loggedUser?.img}
        />
      </div>{" "}
      {/* Profile details */}
      <div className="relative w-[1440px] h-[1138px] hidden" />
      <div className="absolute top-[290.09px] left-[calc(50%_-_404.03px)] w-[167.35px] h-[22.88px] text-slateblue">
        <b className="absolute top-[-5px] left-[calc(50%_-_83.68px)] [text-decoration:underline] inline-block w-[167.35px] h-[22.88px]">
          Profile details:
        </b>
      </div>
      <b className="absolute top-[73px] left-[calc(50%_-_400px)] inline-block w-[216px] h-[27px]">
        {loggedUser?.name}
      </b>
      <div className="absolute top-[327px] left-[calc(50%_-_399px)] w-[704px] h-[275px] overflow-hidden text-base text-black">
        <div className="absolute capitalize top-[128px] left-[77px] inline-block w-[323px] h-[23px]">
          {loggedUser?.gender}
        </div>
        <div className="absolute top-[154px] left-[117px] inline-block w-[323px] h-[23px]">
          {loggedUser?.dob}
        </div>
        <div className="absolute top-[177px] left-[44px] inline-block w-[323px] h-[23px]">
          {age} Years
        </div>
        <div className="absolute top-[202px] left-[169px] inline-block w-[323px] h-[23px]">
          {loggedUser?.license}
        </div>
        <div className="absolute top-[225px] left-[53px] inline-block w-[323px] h-[23px]">
          {loggedUser?.nid}
        </div>
        <div className="absolute top-[249px] left-[70px] inline-block w-[323px] h-[23px]">
          {loggedUser?.salary} tk
        </div>
        <div className="absolute top-[106px] left-[90px] capitalize inline-block w-[323px] h-[23px]">
          {loggedUser?.location && loggedUser.location.join(", ")}
        </div>
        <div className="absolute top-[79px] left-[4px] font-semibold inline-block w-[97px] h-[17px] text-darkslategray-100">
          <span>Experience</span>
          <span className="text-darkslategray-200">:</span>
        </div>
        <div className="absolute top-[4px] left-[4px] font-semibold text-darkslategray-100 inline-block w-[51px] h-[23px]">
          Email:
        </div>
        <div className="absolute top-[155px] left-[4px] font-semibold text-darkslategray-100 inline-block w-[111px] h-5">
          Date of Birth:
        </div>
        <div className="absolute top-[177px] left-[4px] font-semibold text-darkslategray-100 inline-block w-10 h-5">
          Age:
        </div>
        <div className="absolute top-[201px] left-[3px] font-semibold text-darkslategray-100 inline-block w-40 h-5">
          Driving License No:
        </div>
        <div className="absolute top-[226px] left-[4px] font-semibold text-darkslategray-100 inline-block w-10 h-5">
          NID:
        </div>
        <div className="absolute top-[248px] left-[4px] font-semibold text-darkslategray-100 inline-block w-[58px] h-5">
          Salary:
        </div>
        <div className="absolute top-[31px] left-[4px] font-semibold text-darkslategray-100 inline-block w-[58px] h-[17px]">
          Phone:
        </div>
        <div className="absolute top-[54px] left-[4px] text-darkslategray-200 inline-block w-[75px] h-[17px]">
          <span className="font-semibold">Address:</span>
        </div>
        <div className="absolute top-[106px] left-[4px] font-semibold inline-block w-[79px] h-5 text-darkslategray-100">
          <span>Location</span>
          <span className="text-darkslategray-200">:</span>
        </div>
        <div className="absolute top-[130px] left-[4px] font-semibold text-darkslategray-100 inline-block w-[66px] h-5">
          Gender:
        </div>
        <div className="absolute top-[4px] left-[62px] inline-block w-[323px] h-[23px]">
          {loggedUser?.email}
        </div>
        <div className="absolute top-[31px] left-[70px] inline-block w-[323px] h-[23px]">
          {loggedUser?.contact}
        </div>
        <div className="absolute top-[55px] left-[79px] capitalize inline-block w-[323px] h-[23px]">
          {loggedUser?.address}
        </div>
        <div className="absolute top-[80px] left-[106px] inline-block w-[323px] h-[23px]">
          {loggedUser?.experience} Years
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
