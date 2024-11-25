import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const DriverPost = () => {
  const [user] = useAuthState(auth);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [budget, setBudget] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [experience, setExperience] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [additionalPreferences, setAdditionalPreferences] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
      vehicleModel: data.vehicleModel,
      experience: data.experience,
      timeSlot,
    };
    try {
      await fetch("http://localhost:5000/driverSearchPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success(
            "You have successfully posted your driver search requirement"
          );
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
        Find a Driver for Your Needs
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3">
          <div className=" p-4 rounded-md mt-3">
            <div className="form-control w-full">
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
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
            </div>
            {/* Add more fields for the left column as needed */}
          </div>
          <div className="p-4 rounded-md">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-blue-700 font-bold text-md">
                  Contact
                </span>
              </label>
              <input
                type="text"
                placeholder="Your Contact number"
                name="contact"
                onChange={(e) => setContact(e.target.value)}
                className="input input-sm input-bordered w-full"
                {...register("contact", {
                  required: {
                    value: true,
                    message: "Contact is required",
                  },
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
            </div>
            {/* Add more fields for the right column as needed */}
          </div>{" "}
          <div className="p-4 rounded-md mt-3">
            {/* Right Column - White Background */}
            <div className="form-control w-full">
              <label className="text-primary font-bold text-md">Address</label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                className="input input-sm input-bordered w-full"
                onChange={(e) => setAddress(e.target.value)}
                {...register("address", {
                  required: {
                    value: true,
                    message: "Addresse is required",
                  },
                })}
              />
            </div>
            {/* Add more fields for the right column as needed */}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className=" p-4 rounded-md">
            {/* Left Column - Blue Background */}
            <div className="form-control w-full">
              <label className="text-primary font-bold text-md">
                Vehicle Model
              </label>
              <input
                type="text"
                placeholder="Vehicle Model (e.g., Toyota Camry)"
                name="vehicleModel"
                className="input input-sm input-bordered w-full"
                onChange={(e) => setVehicleModel(e.target.value)}
                {...register("vehicleModel", {
                  required: {
                    value: true,
                    message: "Vehicle Model is required",
                  },
                })}
              />
            </div>
            {/* Add more fields for the left column as needed */}
          </div>
          <div className=" p-4 rounded-md">
            {/* Left Column - Blue Background */}
            <div className="form-control w-full mb-3">
              <label className="text-primary font-bold text-md">
                Experience (Years)
              </label>
              <input
                type="number"
                placeholder="Years of Experience"
                name="experience"
                className="input input-sm input-bordered w-full"
                onChange={(e) => setExperience(e.target.value)}
                {...register("experience", {
                  required: {
                    value: true,
                    message: "Experience is required",
                  },
                })}
              />
            </div>
            {/* Add more fields for the left column as needed */}
          </div>{" "}
        </div>{" "}
        <div className="grid grid-cols-2">
          {/* <div className="p-4 rounded-md">
            <div className="form-control w-full">
              <label className="text-primary font-bold text-md">
                Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={handleTimeSlotChange}
                className="input input-sm input-bordered w-full"
              >
                <option value="">Select Time Slot</option>
                <option value="08.00 AM - 11.00 AM">08.00 AM - 11.00 AM</option>
                <option value="11.00 AM - 02.00 PM">11.00 AM - 02.00 PM</option>
                <option value="02.00 PM - 05.00 PM">
                  {" "}
                  02.00 PM - 05.00 PM
                </option>
                <option value="05.00 PM - 08.00 PM">05.00 PM - 08.00 PM</option>
              </select>
            </div>
          </div> */}
          <div className="p-4 rounded-md">
            <div className="form-control w-full">
              <label className="text-primary font-bold text-md">Budget</label>
              <input
                type="number"
                placeholder="Your Preferred Budget"
                name="budget"
                className="input input-sm input-bordered w-full"
                onChange={(e) => setBudget(e.target.value)}
                {...register("budget", {
                  required: {
                    value: true,
                    message: "Budget is required",
                  },
                })}
              />
            </div>
          </div>
          <div className="p-4 rounded-md">
            <div className="form-control w-full">
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
        </div>
        <div className="flex items-end justify-end">
          <input
            className="btn mt-5 btn-sm text-xs w-1/4 border-blue-500 text-white font-bold bg-primary"
            value="Request for a Driver"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default DriverPost;
