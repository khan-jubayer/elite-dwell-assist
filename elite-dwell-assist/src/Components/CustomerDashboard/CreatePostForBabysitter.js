import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const CreatePostForBabysitter = () => {
  const [user] = useAuthState(auth);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [additionalPreferences, setAdditionalPreferences] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState([]);
  const [experience, setExperience] = useState("");
  const [specialSkills, setSpecialSkills] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
    { label: "dhanmondi", value: "dhanmondi" },
    { label: "mirpur", value: "mirpur" },
    { label: "savar", value: "savar" },
    { label: "uttora", value: "uttora" },
    { label: "gulshan", value: "gulshan" },
    { label: "mohammadpur", value: "mohammadpur" },
    { label: "banani", value: "banani" },
    { label: "motijheel", value: "motijheel" },
  ];

  const availabilityOptions = [
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
  ];

  const specialSkillOptions = [
    { label: "Story Telling", value: "Story Telling" },
    { label: "Arts & Crafts", value: "Arts & Crafts" },
    { label: "Singing", value: "Singing" },
    { label: "Excellent Listener", value: "Excellent Listener" },
    { label: "Fun & Engaging", value: "Fun & Engaging" },
  ];

  const handlePreferredLocationsChange = (e) => {
    setPreferredLocations(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSpecialSkillsChange = (e) => {
    const skill = e.target.value;
    if (specialSkills.includes(skill)) {
      setSpecialSkills(specialSkills.filter((item) => item !== skill));
    } else {
      setSpecialSkills([...specialSkills, skill]);
    }
  };

  const onSubmit = async (data) => {
    const postDetails = {
      userName: user?.displayName,
      userEmail: user?.email,
      contact: data.contact,
      address: data.address,
      expectedSalary: data.expectedSalary,
      additionalPreferences: data.additionalPreferences,
      religion: data.religion,
      gender,
      experience: data.experience,
      specialSkills,
      preferredLocations,
      availability,
    };
    console.log(postDetails);
    try {
      await fetch("http://localhost:5000/babysitterSearchPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetails),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("You have successfully posted your babysitter profile");
          reset();
        });
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="card-body bg-transparent border-2 shadow-md">
      <h1
        style={{ fontFamily: "arial" }}
        className="text-center text-2xl text-primary font-extrabold"
      >
        Search for a Babysitter
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 pt-5 gap-3">
          {/* Email */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={user?.email}
              name="email"
              className="input input-sm input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          {/* Phone */}
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
              onChange={(e) => setContact(e.target.value)}
              className="input input-sm input-bordered w-full "
              {...register("contact", {
                required: {
                  value: true,
                  message: "Contact is required",
                },
                unique: { value: true },
                pattern: {
                  value: /[0-9]*/,
                  message: "Your Contact number should have digits only",
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
          {/* Address */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">Address</label>
            <input
              type="text"
              placeholder="Your Address"
              name="address"
              className="input input-sm input-bordered w-full"
              onChange={(e) => setAddress(e.target.value)}
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
        <div className="grid lg:grid-cols-3 pt-5 gap-3">
          {/* Religion */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">Religion</label>
            <input
              type="text"
              placeholder="Your Religion"
              name="religion"
              className="input input-sm input-bordered w-full"
              onChange={(e) => setReligion(e.target.value)}
              {...register("religion", {
                required: {
                  value: true,
                  message: "Religion is required",
                },
              })}
            />
            <label>
              {errors.religion?.type === "required" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.religion.message}
                </span>
              )}
            </label>
          </div>
          {/* Expected Salary */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">
              Expected Salary
            </label>
            <input
              type="number"
              placeholder="Your Expected Salary"
              name="expectedSalary"
              className="input input-sm input-bordered w-full"
              onChange={(e) => setExpectedSalary(e.target.value)}
              {...register("expectedSalary", {
                required: {
                  value: true,
                  message: "Expected Salary is required",
                },
                pattern: {
                  value: /[0-9]*/,
                  message: "Provide a valid Expected Salary",
                },
              })}
            />
            <label>
              {errors.expectedSalary?.type === "pattern" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.expectedSalary.message}
                </span>
              )}
            </label>
            <label>
              {errors.expectedSalary?.type === "required" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.expectedSalary.message}
                </span>
              )}
            </label>
          </div>
          {/* Additional Preferences */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">
              Additional Preferences
            </label>
            <input
              type="text"
              placeholder="Your Additional Preferences, if no, then write N/A"
              name="additionalPreferences"
              className="input input-sm input-bordered w-full"
              onChange={(e) => setAdditionalPreferences(e.target.value)}
              {...register("additionalPreferences", {
                required: {
                  value: true,
                  message: "Additional Preferences are required",
                },
              })}
            />
            <label>
              {errors.additionalPreferences?.type === "required" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.additionalPreferences.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 pt-5 gap-3">
          {/* Gender */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">Gender</label>
            {genderOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={() => setGender(option.value)}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>

          {/* Special Skills */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">
              Special Skills
            </label>
            {specialSkillOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={specialSkills.includes(option.value)}
                  onChange={handleSpecialSkillsChange}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
          {/* Preferred Locations */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">
              Preferred Locations
            </label>
            {locationOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  checked={preferredLocations.includes(option.value)}
                  onChange={handlePreferredLocationsChange}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
          {/* Availability */}
          <div className="form-control mt-3 w-full">
            <label className="text-primary font-bold text-md">
              Availability
            </label>
            {availabilityOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={availability.includes(option.value)}
                  onChange={handleAvailabilityChange}
                />{" "}
                {option.label}
              </label>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 pt-5 gap-3"></div>
        <div className="flex items-end justify-end">
          <input
            className="btn mt-5 btn-sm text-xs w-1/4 border-blue-500 text-white font-bold bg-primary uppercase"
            value="Request for a Babysitter"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePostForBabysitter;
