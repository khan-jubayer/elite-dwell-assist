import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const CreatePostForMaid = () => {
  const [user] = useAuthState(auth);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [gender, setGender] = useState("");
  const [budget, setBudget] = useState("");
  const [additionalPreferences, setAdditionalPreferences] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleServiceChange = (e) => {
    const service = e.target.value;
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((item) => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleTimeSlotChange = (e) => {
    const selectedValue = e.target.value;
    if (timeSlot.includes(selectedValue)) {
      setTimeSlot(timeSlot.filter((item) => item !== selectedValue));
    } else {
      setTimeSlot([...timeSlot, selectedValue]);
    }
  };

  const onSubmit = async (data) => {
    const bookingData = {
      userName: user?.displayName,
      userEmail: user?.email,
      contact: data.contact,
      address: data.address,
      budget: data.budget,
      additionalPreferences: data.additionalPreferences,
      timeSlot,
      selectedServices,
    };
    console.log(bookingData);
    try {
      await fetch("http://localhost:5000/maidSearchPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("You have successfully posted your requirement");
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
        Discover Home Services Tailored to You
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
            </label>{" "}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
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
          {/* Time Slot */}
          <div className="form-control mt-3  w-full">
            <label className="text-primary font-bold text-md">Time Slot</label>
            <select
              value={timeSlot}
              onChange={handleTimeSlotChange}
              className="input input-sm input-bordered w-full"
            >
              <option value="">Select Time Slot</option>
              <option value="08.00 AM - 11.00 AM">08.00 AM - 11.00 AM</option>
              <option value="11.00 AM - 02.00 PM">11.00 AM - 02.00 PM</option>
              <option value="02.00 PM - 05.00 PM"> 02.00 PM - 05.00 PM</option>
              <option value="05.00 PM - 08.00 PM">05.00 PM - 08.00 PM</option>
            </select>
          </div>
          {/* Budget */}
          <div className="form-control mt-3  w-full">
            <label className="text-primary font-bold text-md">
              Offered amount
            </label>
            <input
              type="number"
              placeholder="Your Budget"
              name="budget"
              className="input input-sm input-bordered w-full"
              onChange={(e) => setBudget(e.target.value)}
              {...register("budget", {
                required: {
                  value: true,
                  message: "budget is required",
                },
                pattern: {
                  value: /[0-9]*/,
                  message: "Provide a valid budget",
                },
              })}
            />
            <label>
              {errors.budget?.type === "pattern" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.budget.message}
                </span>
              )}
            </label>
            <label>
              {errors.budget?.type === "required" && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.budget.message}
                </span>
              )}
            </label>
          </div>
          {/* Additional Preferences */}
          <div className="form-control mt-3  w-full">
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
                  message: "additionalPreferences is required",
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
        <div className="grid grid-cols-2 pt-5 gap-3">
          {/* Services Needed */}
          <div className="form-control mt-3  w-full">
            <label className="text-primary font-bold text-md">
              Services Needed
            </label>
            <label>
              <input
                type="checkbox"
                value="Mopping"
                checked={selectedServices.includes("Mopping")}
                onChange={handleServiceChange}
              />{" "}
              Mopping <br />
              <input
                type="checkbox"
                value="Cooking"
                checked={selectedServices.includes("Cooking")}
                onChange={handleServiceChange}
              />{" "}
              Cooking
              <br />
              <input
                type="checkbox"
                value="Sweeping"
                checked={selectedServices.includes("Sweeping")}
                onChange={handleServiceChange}
              />
              Sweeping
              <br />
              <input
                type="checkbox"
                value="Washing Dishes"
                checked={selectedServices.includes("Washing Dishes")}
                onChange={handleServiceChange}
              />{" "}
              Washing Dishes
              <br />
              <input
                type="checkbox"
                value="Washing Clothes"
                checked={selectedServices.includes("Washing Clothes")}
                onChange={handleServiceChange}
              />{" "}
              Washing Clothes
            </label>
          </div>
          {/* Maid's Gender */}
          <div className="form-control mt-3  w-full">
            <label className="text-primary font-bold text-md">
              Maid's Gender
            </label>
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                value="noPreference"
                checked={gender === "noPreference"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              No Preference
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-end justify-end">
          <input
            className="btn mt-5 btn-sm text-xs w-1/4 border-blue-500 text-white font-bold bg-primary"
            value="Request for Home-service"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePostForMaid;
