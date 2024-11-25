import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const BabysitterRegistrationForm = () => {
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
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedWorkingHour, setSelectedWorkingHour] = useState([]);
  const [selectedSpecialSkills, setSelectedSpecialSkills] = useState([]);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [selectedLanguageSkills, setSelectedLanguageSkills] = useState([]);

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

  const handleExperienceChange = (selectedOptions) => {
    setSelectedExperience(selectedOptions);
  };

  const handleGender = (selected) => {
    setSelectedGender(selected);
  };
  // const handleGender = (selected) => {
  //   setSelectedGender([selected[selected.length - 1]]);
  // };

  const handleLocation = (selectedOptions) => {
    setSelectedLocation(selectedOptions);
  };

  const handleAvailability = (selectedOptions) => {
    setSelectedAvailability(selectedOptions);
  };

  const handleWorkingHour = (selectedOption) => {
    setSelectedWorkingHour(selectedOption);
  };

  const handleSpecialSkills = (selectedOptions) => {
    setSelectedSpecialSkills(selectedOptions);
  };

  const handleQualifications = (selectedOptions) => {
    setSelectedQualifications(selectedOptions);
  };

  const handleLanguageSkills = (selectedOptions) => {
    setSelectedLanguageSkills(selectedOptions);
  };

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
    { value: 9, label: "9 year" },
    { value: 10, label: "more than 10 year" },
  ];

  const locationOptions = [
    { label: "Dhanmondi", value: "dhanmondi" },
    { label: "Mirpur", value: "mirpur" },
    { label: "Savar", value: "savar" },
    { label: "Uttora", value: "uttora" },
    { label: "Gulshan", value: "gulshan" },
    { label: "Mohammadpur", value: "mohammadpur" },
    { label: "Banani", value: "banani" },
    { label: "Motijheel", value: "motijheel" },
  ];

  const availabilityOptions = [
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
  ];

  const workingHourOptions = [
    { label: "2-4 Hours", value: "2-4 Hours" },
    { label: "5-6 Hours", value: "5-6 Hours" },
    { label: "7-8 Hours", value: "7-8 Hours" },
    { label: "9-10 Hours", value: "9-10 Hours" },
    { label: "11-12 Hours", value: "11-12 Hours" },
  ];

  const specialSkillOptions = [
    { label: "Story Telling", value: "Story Telling" },
    { label: "Arts & Crafts", value: "Arts & Crafts" },
    { label: "Singing", value: "Singing" },
    { label: "Excellent Listener", value: "Excellent Listener" },
    { label: "Fun & Engaging", value: "Fun & Engaging" },
  ];

  const qualificationOptions = [
    { label: "CPR & First Aid", value: "CPR & First Aid" },
    {
      label: "Crisis Prevention Institute(CPI)",
      value: "Crisis Prevention Institute(CPI)",
    },
  ];

  const languageSkillOptions = [
    { label: "Bangla", value: "Bangla" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
  ];

  const handleAddBabysitter = async (data) => {
    // console.log("data", data);
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
      body: formData, //file erjnno
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const babysitter = {
            role: "babysitter",
            name: data.name,
            email: data.email,
            address: data.address,
            contact: data.contact,
            gender: selectedGender ? selectedGender.value : null,
            religion: data.religion,
            experience: selectedExperience ? selectedExperience.value : null,
            lastAchievedDegree: data.lastAchievedDegree,
            institute: data.institute,
            availability: selectedAvailability.map((avail) => avail.value),
            preferedLocation: selectedLocation.map((loc) => loc.value),
            workingHour: selectedWorkingHour ? selectedWorkingHour.value : null,
            expectedSalary: data.expectedSalary,
            specialSkills: selectedSpecialSkills.map((avail) => avail.value),
            qualifications: selectedQualifications.map((avail) => avail.value),
            languageSkills: selectedLanguageSkills.map((avail) => avail.value),
            nid: data.nid,
            dob: data.dob,
            img: imgData.data.url,
            password: data.password,
          };
          const user = {
            role: "babysitter",
            name: data.name,
            email: data.email,
            img: imgData.data.url,
            dob: data.dob,
            password: data.password, // Add any other user-specific data you want to save
          };
          // console.log("babysitter",babysitter);
          // console.log("user",user);

          // save babysitter information to the database
          fetch("http://localhost:5000/babysitter", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(babysitter),
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
              Register as <strong>Babysitter</strong>
            </h1>

            <form onSubmit={handleSubmit(handleAddBabysitter)}>
              <div className="grid grid-cols-2 pt-4 gap-3">
                {/* name field */}
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

              <div className="grid grid-cols-2 pt-1.5 gap-3">
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
              </div>

              <div className="grid grid-cols-3 pt-1.5 gap-3 pb-2">
                {/* Gender field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-left text-blue-700 font-bold text-md">
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

                {/* Religion field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-left text-blue-700 font-bold text-md">
                      Religion
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg: Islam"
                    name="religion"
                    className="input input-sm input-bordered w-full h-[37.7px] rounded-md "
                    {...register("religion")}
                  />
                </div>

                {/* Experience */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-sm">
                      Experience
                    </span>
                  </label>
                  <Select
                    name="experience"
                    options={experienceOptions}
                    value={selectedExperience}
                    onChange={handleExperienceChange}
                    placeholder="Select Experience"
                  />
                </div>

                {/* <label>
                  {errors.education?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.education.message}
                    </span>
                  )}
                </label> */}
              </div>

              <div className="grid grid-cols-2 pb-1.5 gap-3">
                {/* last achieved degree */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Last Achieved Degree
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg: BSc (CSE)"
                    name="lastAchievedDegree"
                    className="input input-sm input-bordered w-full"
                    {...register("lastAchievedDegree")}
                  />
                </div>
                {/* Institute*/}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Institute
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Institute name"
                    name="institute"
                    className="input input-sm input-bordered w-full "
                    {...register("institute")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 pt-1 gap-3">
                {/* availability */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Availability
                    </span>
                  </label>
                  <MultiSelect
                    name="availability"
                    options={availabilityOptions}
                    value={selectedAvailability}
                    onChange={handleAvailability}
                    // labelledBy={"Select availability"}
                    overrideStrings={{
                      selectSomeItems: "Select availability",
                    }}
                  />
                </div>
                {/* location */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Prefered Location
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

              <div className="grid grid-cols-2 pt-2 gap-3">
                {/* working hour */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Working Hour
                    </span>
                  </label>
                  <Select
                    name="workingHour"
                    options={workingHourOptions}
                    value={selectedWorkingHour}
                    onChange={handleWorkingHour}
                    placeholder="Select working hour"
                  />
                </div>

                {/* expected salary */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Expected Salary (BDT)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg: 10000"
                    name="expectedSalary"
                    className="input input-sm input-bordered w-full h-[37.7px] rounded "
                    {...register("expectedSalary")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 pt-2.5 gap-3 pb-2">
                {/* special skill */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-left text-blue-700 font-bold text-md">
                      Special Skills
                    </span>
                  </label>
                  <MultiSelect
                    options={specialSkillOptions}
                    value={selectedSpecialSkills}
                    onChange={handleSpecialSkills}
                    // labelledBy={"Select availability"}
                    overrideStrings={{
                      selectSomeItems: "Select special skills",
                    }}
                  />
                </div>

                {/* Qualifications */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-left text-blue-700 font-bold text-md">
                      Qualifications
                    </span>
                  </label>
                  <MultiSelect
                    options={qualificationOptions}
                    value={selectedQualifications}
                    onChange={handleQualifications}
                    overrideStrings={{
                      selectSomeItems: "Select qualifications",
                    }}
                  />
                </div>

                {/* Language skill */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-sm">
                      Language Skill
                    </span>
                  </label>
                  <MultiSelect
                    options={languageSkillOptions}
                    value={selectedLanguageSkills}
                    onChange={handleLanguageSkills}
                    overrideStrings={{
                      selectSomeItems: "Select language skills",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 pt-2 gap-3">
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
                      Date of Birth
                    </span>
                  </label>{" "}
                  <input
                    type="date"
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
              </div>
              {/* Image upload field */}
              <div className="form-control  w-full pt-2">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    photo
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="Your image"
                  name="image"
                  className="input input-sm input-bordered w-full h-[40px]"
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
              <div className="grid grid-cols-2 pt-2 gap-3">
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

export default BabysitterRegistrationForm;
