import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import bengaliLabels from "../../bengaliText";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import Select from "react-select";

const MaidRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  let signInError;

  const imageStorageKey = "81a2b36646ff008b714220192e61707d";

  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedSalaries, setSelectedSalaries] = useState({});
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const openSuccessModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the success modal
  const closeSuccessModal = () => {
    setIsModalOpen(false);
  };

  if (loading || updating) {
    return <Loading></Loading>;
  }

  if (error || updateError) {
    signInError = (
      <p className="text-red-500 text-xs mt-1">
        {error?.message || updateError?.message}
      </p>
    );
  }

  const handleExpertiseChange = (selectedOptions) => {
    setSelectedExpertise(selectedOptions);

    // Initialize selected salaries for the newly selected expertise
    const newSelectedSalaries = {};
    selectedOptions.forEach((expertise) => {
      newSelectedSalaries[expertise.value] =
        expertiseSalaries[expertise.value][0];
    });
    setSelectedSalaries(newSelectedSalaries);
  };

  const handleSalaryChange = (expertise, salary) => {
    setSelectedSalaries((prevSelectedSalaries) => ({
      ...prevSelectedSalaries,
      [expertise]: salary,
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

  const handleAvailability = (selectedOptions) => {
    setSelectedAvailability(selectedOptions);
  };
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
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const availabilityOptions = [
    { label: "08.00 AM - 11.00 AM", value: "sokal" },
    { label: "11.00 AM - 02.00 PM", value: "dupur" },
    { label: "02.00 PM - 05.00 PM", value: "bikal" },
    { label: "05.00 PM - 08.00 PM", value: "raat" },
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
    { value: 9, label: "9 year" },
    { value: 10, label: "more than 10 year" },
  ];
  const expertiseOptions = [
    { value: "mopping", label: "Mopping" },
    { value: "cooking", label: "Cooking" },
    { value: "cloth_washing", label: "Cloth Washing" },
    { value: "sweeping", label: "Sweeping" },
    { value: "dish_washing", label: "Dish Washing" },
  ];
  const expertiseSalaries = {
    mopping: [1000, 1500, 1200],
    cooking: [2000, 1800, 2200],
    cloth_washing: [1500, 1400, 1600],
    sweeping: [500, 600, 550],
    dish_washing: [1500, 1600, 1550],
  };

  const handleAddMaid = async (data) => {
    const formattedDob = selectedDate
      ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${selectedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`
      : "";

    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({
      displayName: data.name,
      address: data.address,
      contact: data.contact,
      password: data.password,
      dob: formattedDob,
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
          const maid = {
            name: data.name,
            role: "maid",
            email: data.email,
            specialty: data.specialty,
            img: imgData.data.url,
            address: data.address,
            contact: data.contact,
            gender: selectedGender ? selectedGender.value : null,
            experience: selectedExperience ? selectedExperience.value : null,
            education: data.education,
            availability: selectedAvailability.map((avail) => avail.value),
            location: selectedLocation.map((loc) => loc.value),
            nid: data.nid,
            dob: formattedDob,
            password: data.password,
            task: selectedExpertise.map((expertise) => expertise.value),
            salary: selectedExpertise.map(
              (expertise) => selectedSalaries[expertise.value]
            ),
          };
          const user = {
            name: data.name,
            email: data.email,
            role: "maid",
            img: imgData.data.url,
            dob: data.dob,
            password: data.password, // Add any other user-specific data you want to save
          };
          // save maid information to the database
          fetch("http://localhost:5000/maid", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(maid),
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
        <div className="card bg-transparent border-blue-300 border-4 shadow-xl">
          <div className="card-body">
            <h1
              style={{ fontFamily: "arial" }}
              className="text-center text-2xl text-blue-700 font-extrabold"
            >
              Register as <strong>MAID</strong>
            </h1>
            <p className="text-center ">{bengaliLabels.maid}</p>

            <form onSubmit={handleSubmit(handleAddMaid)}>
              <div className="grid lg:grid-cols-2 pt-5 gap-3">
                {/* name field */}
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Name /{bengaliLabels.name}
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
                      Email/{bengaliLabels.email}
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
              <div className="grid lg:grid-cols-2 pt-5 gap-3">
                {/* address */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Address/{bengaliLabels.address}
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
                {/* contact field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Contact/ {bengaliLabels.contact}
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
              </div>
              <div className="grid lg:grid-cols-3 pt-5 gap-3">
                {/* Gender field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-left text-blue-700 font-bold text-xs">
                      Gender/{bengaliLabels.gender}
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
                    <span className="label-text text-blue-700 font-bold text-sm">
                      Experience/{bengaliLabels.experience}
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
                    <span className="label-text text-left text-blue-700 font-bold text-xs">
                      Education/{bengaliLabels.education}
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
                    <option value="none">None/{bengaliLabels.none}</option>
                    <option value="ssc">SSC pass</option>
                    <option value="jsc">JSC pass</option>
                  </select>
                </div>
                <label>
                  {errors.education?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.education.message}
                    </span>
                  )}
                </label>
              </div>

              {/*expertise*/}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Expertise
                  </span>
                </label>
                <MultiSelect
                  name="expertise"
                  options={expertiseOptions}
                  value={selectedExpertise}
                  onChange={handleExpertiseChange}
                  labelledBy="Select expertise"
                />
              </div>
              <div className="form-control w-full">
                {selectedExpertise.map((expertise) => (
                  <div key={expertise.value} className="py-2">
                    <label className="label">
                      <span className="label-text text-blue-700 font-bold text-md">
                        {expertise.label} Salary
                      </span>
                    </label>
                    <select
                      value={selectedSalaries[expertise.value]}
                      onChange={(e) =>
                        handleSalaryChange(expertise.value, e.target.value)
                      }
                      className="input input-bordered w-full"
                    >
                      {expertiseSalaries[expertise.value].map((salary) => (
                        <option key={salary} value={salary}>
                          {salary} /-
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="grid lg:grid-cols-2 pt-5 gap-3">
                {/* availability */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Availability/{bengaliLabels.availability}
                    </span>
                  </label>
                  <MultiSelect
                    name="availability"
                    options={availabilityOptions}
                    value={selectedAvailability}
                    onChange={handleAvailability}
                    labelledBy={"Select availability"}
                    overrideStrings={{
                      selectSomeItems: "Select availability",
                    }}
                  />
                </div>
                {/* location */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Location/{bengaliLabels.location}
                    </span>
                  </label>
                  <MultiSelect
                    name="location"
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
              <div className="grid lg:grid-cols-2 pt-5 gap-3">
                {/* nid_no */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      NID_no
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
                {/* dob */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Date of Birth/{bengaliLabels.dob}
                    </span>
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="input input-sm input-bordered w-full"
                    placeholderText="yyyy-MM-dd"
                  />
                </div>
              </div>
              {/* Image upload field */}
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    photo
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

export default MaidRegistrationForm;
