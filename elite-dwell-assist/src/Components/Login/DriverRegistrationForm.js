import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";
import Select from "react-select";

const DriverRegistrationForm = () => {
  //   const [selectedRole, setSelectedRole] = useState("");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  let signInError;

  const imageStorageKey = "81a2b36646ff008b714220192e61707d";
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedSalaries, setSelectedSalaries] = useState({});
  const [selectedLocation, setSelectedLocation] = useState([]);

  const handleVehicleTypeChange = (selectedOptions) => {
    setSelectedVehicleType(selectedOptions);

    // Initialize selected salaries for the newly selected vehicleType
    const newSelectedSalaries = {};
    selectedOptions.forEach((vehicleType) => {
      newSelectedSalaries[vehicleType.value] =
        vehicleTypeSalaries[vehicleType.value][0];
    });
    setSelectedSalaries(newSelectedSalaries);
  };

  const handleSalaryChange = (vehicleType, salary) => {
    setSelectedSalaries((prevSelectedSalaries) => ({
      ...prevSelectedSalaries,
      [vehicleType]: salary,
    }));
  };

  const handleExperienceChange = (selectedOptions) => {
    setSelectedExperience(selectedOptions);
  };
  const handleGender = (selected) => {
    setSelectedGender(selected);
  };

  const handleLocation = (selectedOptions) => {
    setSelectedLocation(selectedOptions);
  };

  if (loading) {
    return Loading;
  }

  const locationOptions = [
    {
      label: "Dhanmondi",
      value: "dhanmondi",
    },
    { label: "Mirpur", value: "mirpur" },
    { label: "Savar", value: "savar" },
    { label: "Uttora", value: "uttora" },
    { label: "Gulshan", value: "gulshan" },
    { label: "Mohammadpur", value: "mohammadpur" },
    { label: "Banani", value: "banani" },
    { label: "Motijheel", value: "motijheel" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const experienceOptions = [
    { value: 1, label: "1 year" },
    { value: 2, label: "2 year" },
    { value: 3, label: "3 year" },
    { value: 4, label: "4 year" },
    { value: 5, label: "5 year" },
    { value: 6, label: "6 year" },
    { value: 7, label: "7 year" },
    { value: 8, label: "8 year" },
    { value: 9, label: "more than 9 year" },
  ];

  const vehicleTypeOptions = [
    { value: "car", label: "Car" },
    { value: "van", label: "Van" },
    { value: "truck", label: "Truck" },
  ];

  const vehicleTypeSalaries = {
    car: [10000, 15001, 2000],
    van: [200, 400, 500],
    truck: [300, 500, 700],
  };

  const handleAddDriver = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({
      displayName: data.name,
      address: data.address,
      contact: data.contact,
      password: data.password,
      dob: data.dob,
    });
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const driver = {
            name: data.name,
            role: "driver",
            email: data.email,
            img: imgData.data.url,
            address: data.address,
            contact: data.contact,
            gender: selectedGender ? selectedGender.value : null,
            experience: selectedExperience ? selectedExperience.value : null,
            education: data.education,
            location: selectedLocation.map((loc) => loc.value),
            nid: data.nid,
            salary: data.salary,
            dob: data.dob,
            license: data.license,
            password: data.password,
          };
          const user = {
            name: data.name,
            email: data.email,
            role: "driver",
            img: imgData.data.url,
            dob: data.dob,
            password: data.password,
          };
          fetch("http://localhost:5000/driver", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(driver),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} thanks for your registration`);
            });
          fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} welcome to Elite-Dwell-Assist`);
            });
        }
      });
    navigate("/");
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl">
        <div className="card border-blue-200 border-4 shadow-xl">
          <div className="card-body">
            <h1
              style={{ fontFamily: "arial" }}
              className="text-center text-2xl text-blue-700 font-extrabold"
            >
              Register as <strong>DRIVER</strong>
            </h1>

            <form onSubmit={handleSubmit(handleAddDriver)}>
              <div className="grid grid-cols-2 pt-5 gap-3">
                {/* name  */}
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    className="input input-sm input-bordered w-full"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                  />
                  <label>
                    {errors.name?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                </div>

                {/* email field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    name="email"
                    className="input input-sm input-bordered w-full "
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      unique: { value: true },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Provide a valid email",
                      },
                    })}
                  />
                  <label>
                    {errors.email?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 pt-5 gap-3">
                {/* contact field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Contact
                    </span>
                  </label>
                  <input
                    type="digit"
                    placeholder="Your Contact number"
                    name="contact"
                    className="input input-sm input-bordered w-full "
                    {...register("contact", {
                      required: {
                        value: true,
                        message: "contact is required",
                      },
                      unique: { value: true },
                      pattern: {
                        value: /[0-9]*/,
                        message: " Your Contact number should have digits only",
                      },
                      minLength: {
                        value: 11,
                        message: "Provide a valid contact",
                      },
                      maxLength: {
                        value: 11,
                        message: "Provide a valid contact",
                      },
                    })}
                  />
                  <label>
                    {errors.contact?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.contact.message}
                      </span>
                    )}
                    {errors.contact?.type === "pattern" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.contact.message}
                      </span>
                    )}
                    {errors.contact?.type === "minLength" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.contact.message}
                      </span>
                    )}
                    {errors.contact?.type === "maxLength" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.contact.message}
                      </span>
                    )}
                  </label>
                </div>
                {/* address */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Address
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your address"
                    name="address"
                    className="input input-sm input-bordered w-full"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                    })}
                  />
                  <label>
                    {errors.address?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.address.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-3 pt-5 gap-3">
                {/* Gender field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Gender
                    </span>
                  </label>
                  <Select
                    value={selectedGender}
                    options={genderOptions}
                    onChange={handleGender}
                    isSearchable={false}
                    placeholder="Select Gender"
                  />
                </div>

                {/* Experience dropdown */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Experience
                    </span>
                  </label>
                  <Select
                    options={experienceOptions}
                    value={selectedExperience}
                    onChange={handleExperienceChange}
                    isSearchable={false}
                    placeholder="Select experiences"
                  />
                </div>

                {/* Education field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Education
                    </span>
                  </label>
                  <select
                    className="input select input-sm input-bordered w-full"
                    name="education"
                    {...register("education", {
                      required: {
                        value: true,
                        message: "Education is required",
                      },
                    })}
                  >
                    <option value="none">None</option>
                    <option value="ssc">SSC pass</option>
                    <option value="jsc">JSC pass</option>
                  </select>
                  <label>
                    {errors.education?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.education.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-control w-full">
                  {selectedVehicleType.map((vehicleType) => (
                    <div key={vehicleType.value} className="py-2">
                      <label className="label">
                        <span className="label-text text-blue-700 font-bold text-md">
                          {vehicleType.label} Salary
                        </span>
                      </label>
                      <select
                        value={selectedSalaries[vehicleType.value]}
                        onChange={(e) =>
                          handleSalaryChange(vehicleType.value, e.target.value)
                        }
                        className="input input-sm input-bordered w-full"
                      >
                        {vehicleType.value === "car"
                          ? vehicleTypeSalaries[vehicleType.value].map(
                              (salary) => (
                                <option key={salary} value={salary}>
                                  {salary} bdt per month
                                </option>
                              )
                            )
                          : vehicleTypeSalaries[vehicleType.value].map(
                              (salary) => (
                                <option key={salary} value={salary}>
                                  {salary} bdt per km/h
                                </option>
                              )
                            )}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditionally render the "availability" field for van/truck */}
              {selectedVehicleType.some((vehicleType) =>
                ["van", "truck"].includes(vehicleType.value)
              )}
              <div className="grid grid-cols-2 pt-5 gap-3">
                {/* dob */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Date of Birth
                    </span>
                  </label>{" "}
                  <input
                    type="text"
                    placeholder="yyyy--mm-dd"
                    name="dob"
                    className="input input-sm input-bordered w-full "
                    {...register("dob", {
                      required: {
                        value: true,
                        message: "DOB is required",
                      },
                      pattern: {
                        value:
                          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                        message: "Follow yyyy--mm-dd format",
                      },
                    })}
                  />
                  <label>
                    {errors.dob?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.dob.message}
                      </span>
                    )}
                    {errors.dob?.type === "pattern" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.dob.message}
                      </span>
                    )}
                  </label>
                </div>

                {/* location */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Location
                    </span>
                  </label>
                  <MultiSelect
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={handleLocation}
                    labelledBy={"Select location"}
                    overrideStrings={{
                      selectSomeItems: "Select preferred location",
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 pt-5 gap-3">
                {/* nid_no */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      NID No
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg: 1234567890111"
                    name="nid"
                    className="input input-sm input-bordered w-full "
                    {...register("nid", {
                      required: {
                        value: true,
                        message: "nid is required",
                      },
                      unique: { value: true },
                      pattern: {
                        value: /[0-9]*/,
                        message: "Provide a valid nid",
                      },
                    })}
                  />
                  <label>
                    {errors.nid?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.nid.message}
                      </span>
                    )}
                    {errors.nid?.type === "pattern" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.nid.message}
                      </span>
                    )}
                  </label>
                </div>
                {/* Driving license */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Driving license no
                    </span>
                  </label>
                  <input
                    type="text"
                    name="license"
                    placeholder="eg : DD-123456789"
                    className="input input-sm input-bordered w-full"
                    {...register("license", {
                      required: {
                        value: true,
                        message: "license is required",
                      },
                      unique: {
                        value: true,
                        message: "Provide a unique license",
                      },
                    })}
                  />
                  <label>
                    {errors.license?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.license.message}
                      </span>
                    )}
                    {errors.license?.type === "unique" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.license.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 pt-5 gap-3">
                {/* Image upload field */}
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Photo
                    </span>
                  </label>
                  <input
                    type="file"
                    placeholder="Your image"
                    name="image"
                    className="input input-sm input-bordered w-full"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "image is required",
                      },
                    })}
                  />
                  <label>
                    {errors.image?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.image.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      {" "}
                      Salary
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Your salary"
                    name="salary"
                    className="input input-sm input-bordered w-full"
                    {...register("salary", {
                      required: {
                        value: true,
                        message: "Salary is required",
                      },
                    })}
                  />
                  <label>
                    {errors.salary?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.salary.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 pt-5 gap-3">
                {/* Password field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-primary font-bold text-md">
                      New Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="input input-sm input-bordered w-full"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                  />
                  <label>
                    {errors.password?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>

                {/* Confirm Password field */}
                <div className="form-control w-full pb-11">
                  <label className="label">
                    <span className="label-text text-primary font-bold text-md">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="input input-sm input-bordered w-full"
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Password confirmation is required",
                      },
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match", // Check if it matches the "password" field
                    })}
                  />
                  <label>
                    {errors.confirmPassword?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                    {errors.confirmPassword?.type === "validate" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              {signInError}
              <input
                className="btn btn-sm text-xs w-full border-blue-500 text-white font-bold bg-primary"
                value="register"
                type="submit"
              />
            </form>
            <p className="text-center">
              <small className="font-semibold">
                Already have an account at elite-dwell-assist?
                <Link className="text-blue-700" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistrationForm;
