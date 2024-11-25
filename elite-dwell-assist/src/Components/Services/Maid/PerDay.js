import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import banner1 from "../../../images/maid/1.jpg";
import banner2 from "../../../images/maid/2.jpeg";
import banner3 from "../../../images/maid/3.jpeg";
import banner4 from "../../../images/maid/4.jpg";
import Footer from "../../Shared/Footer";
import { format, isBefore } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const PerDay = () => {
  const [user] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [isBookButtonDisabled, setIsBookButtonDisabled] = useState(true);
  const [area, setArea] = useState("");
  const userRole = localStorage.getItem("userRole");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(user);
  const handleServiceSelect = (service) => {
    const updatedServices = [...selectedServices];
    const serviceIndex = updatedServices.indexOf(service);

    if (serviceIndex !== -1) {
      updatedServices.splice(serviceIndex, 1);
    } else {
      updatedServices.push(service);
    }
    setSelectedServices(updatedServices);
    setIsBookButtonDisabled(updatedServices.length === 0);
  };

  const handleDateSelect = (date) => {
    const today = new Date(); // Get today's date
    if (isBefore(date, today)) {
      toast.error("You cannot select a date earlier than today.");
    } else {
      setSelectedDate(date);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const notify = () => {
    if (
      !errors.address &&
      !errors.road &&
      !errors.block &&
      !errors.sector &&
      area &&
      selectedDate &&
      selectedTimeSlot &&
      selectedServices.length > 0
    ) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      console.log("Selected Date:", formattedDate);
      console.log("Selected Time Slot:", selectedTimeSlot);
      console.log("Selected Services:", selectedServices);

      const servicesText = selectedServices.length
        ? `Services: ${selectedServices.join(", ")}`
        : "";

      toast.success(
        `Thanks for your order! Date: ${formattedDate}, Time Slot: ${selectedTimeSlot}, ${servicesText}`,
        {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            reset();
          },
        }
      );
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  const displaySelectedInfo = () => {
    let info = "Selected Date: ";
    if (selectedDate) {
      info += selectedDate.toDateString();
    }
    if (selectedTimeSlot) {
      info += " | Selected Time Slot: " + selectedTimeSlot;
    }

    return info;
  };

  const onSubmit = async (data) => {
    const bookingData = {
      selectedDate,
      selectedTimeSlot,
      selectedServices,
      userName: user?.displayName,
      userEmail: user?.email,
      address: {
        house: data.house,
        road: data.road,
        block: data.block,
        sector: data.sector,
        area,
      },
    };

    try {
      await fetch("http://localhost:5000/perDayMaidBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((result) => {
          notify();
        });
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div>
      <h1
        className="text-3xl pt-12 text-center font-black text-primary  px-7"
        style={{ fontFamily: "arial" }}
      >
        Your Home-Our Expertise
      </h1>
      {userRole !== "customer" ? (
        <p className="text-red-500 text-xs text-center mt-1">
          You do not have permission to access this page. Please login first.
        </p>
      ) : (
        <></>
      )}
      <div className="bg-white p-4 mt-7 rounded-lg shadow-md mb-4">
        <p className="text-lg text-center text-black font-semibold">
          {displaySelectedInfo()}
        </p>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-7">
        <div className="lg:flex md:flex">
          <div className="ml-12">
            <div>
              <div className="time-slot-container pt-20">
                <strong className="text-lg mx-5 font-bold text-center text-primary">
                  Select a Time Slot :
                </strong>
                <select
                  className="input input-bordered input-sm"
                  value={selectedTimeSlot}
                  onChange={(e) => handleTimeSlotSelect(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary mx-5 pt-5 text-center">
                  Select a Date
                </h1>
                <div className="calendar-container">
                  <DayPicker
                    selected={selectedDate}
                    onDayClick={handleDateSelect}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-10 sm:mx-10 mt-20">
            {/* Sweeping */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={banner1} alt="Sweeping Icon" className="w-8 h-8" />
                  <label className="text-lg font-medium">Sweeping</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sweeping"
                    className="form-checkbox h-6 w-6 text-primary"
                    onChange={() => handleServiceSelect("Sweeping")}
                  />
                  <label
                    htmlFor="sweeping"
                    className="text-lg font-medium text-primary"
                  >
                    BDT 150
                  </label>
                </div>
              </div>
            </div>{" "}
            {/* Washing_dishes */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={banner1}
                    alt="Washing_dishes Icon"
                    className="w-8 h-8"
                  />
                  <label className="text-lg font-medium">Washing Dishes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="washing_dishes"
                    className="form-checkbox h-6 w-6 text-primary"
                    onChange={() => handleServiceSelect("Washing_dishes")}
                  />
                  <label
                    htmlFor="washing_dishes"
                    className="text-lg font-medium text-primary"
                  >
                    BDT 100
                  </label>
                </div>
              </div>
            </div>
            {/* Mopping */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={banner2} alt="Mopping Icon" className="w-8 h-8" />
                  <label className="text-lg font-medium">Mopping</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="mopping"
                    className="form-checkbox h-6 w-6 text-primary"
                    onChange={() => handleServiceSelect("Mopping")}
                  />
                  <label
                    htmlFor="mopping"
                    className="text-lg font-medium text-primary"
                  >
                    BDT 200
                  </label>
                </div>
              </div>
            </div>
            {/* Cooking */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={banner3} alt="Cooking Icon" className="w-8 h-8" />
                  <label className="text-lg font-medium">Cooking</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cooking"
                    className="form-checkbox h-6 w-6 text-primary"
                    onChange={() => handleServiceSelect("Cooking")}
                  />
                  <label
                    htmlFor="cooking"
                    className="text-lg font-medium text-primary"
                  >
                    BDT 120
                  </label>
                </div>
              </div>
            </div>
            {/* Washing Clothes */}
            <div className="bg-white w-80 p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={banner4}
                    alt="Washing Clothes Icon"
                    className="w-8 h-8"
                  />
                  <label className="text-lg font-medium">Washing Clothes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="washing-clothes"
                    className="form-checkbox h-6 w-6 text-primary"
                    onChange={() => handleServiceSelect("Washing Clothes")}
                  />
                  <label
                    htmlFor="washing-clothes"
                    className="text-lg font-medium text-primary"
                  >
                    BDT 100
                  </label>
                </div>
              </div>
            </div>
            {/* Display selected services and date */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-9 mb-4">
              <h2 className="text-lg font-bold text-primary">
                Selected Services:
              </h2>
              {selectedServices.length === 0 ? (
                <p className="text-red-500">Select at least one service</p>
              ) : (
                <ul>
                  {selectedServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="lg:mx-20 pt-12 pb-20">
            <div>
              <div className="card w-full bg-transparent border-4 rounded-3xl border-blue-200 text-blue-800">
                <div className="card-body">
                  <h2 className="card-title">Address</h2>
                  <p>Expert will arrive at the address given below</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {userRole === "customer" && (
                      <div className="form-control grid grid-cols-2 gap-5 pt-5 w-full">
                        <div>
                          <label className="label">
                            <span className="label-text text-blue-700 font-bold text-xs">
                              Name
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Display Name"
                            className="input input-bordered input-xs w-full"
                            value={user?.displayName}
                            disabled
                          />
                        </div>
                        <div>
                          {" "}
                          <label className="label">
                            <span className="label-text text-blue-700 font-bold text-xs">
                              Email
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Email"
                            className="input input-bordered input-xs w-full"
                            value={user?.email}
                            disabled
                          />{" "}
                        </div>
                      </div>
                    )}
                    <div className="form-control pt-5 w-full">
                      <label className="label">
                        <span className="label-text text-blue-700 font-bold text-xs">
                          House
                        </span>
                      </label>
                      <input
                        type="text"
                        name="house"
                        placeholder="Your address"
                        className="input input-bordered input-xs w-full"
                        {...register("house", {
                          required: {
                            value: true,
                            message: "House is required",
                          },
                        })}
                      />
                      <label>
                        {errors.house?.type === "required" && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.house.message}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-control pt-5 w-full">
                      <label className="label">
                        <span className="label-text text-blue-700 font-bold text-xs">
                          Selected Services
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered input-xs w-full"
                        value={selectedServices.join(", ")}
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control pt-5 w-full">
                        <label className="label">
                          <span className="label-text text-blue-700 font-bold text-xs">
                            Road no
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Road no"
                          name="road"
                          className="input input-bordered input-xs w-full"
                          {...register("road", {
                            required: {
                              value: true,
                              message: "Road no is required",
                            },
                          })}
                        />
                        <label>
                          {errors.road?.type === "required" && (
                            <span className="text-red-500 text-xs mt-1">
                              {errors.road.message}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="form-control pt-5 w-full">
                        <label className="label">
                          <span className="label-text text-blue-700 font-bold text-xs">
                            Block
                          </span>
                        </label>
                        <input
                          type="text"
                          name="block"
                          placeholder="Block no"
                          className="input input-bordered input-xs w-full"
                          {...register("block", {
                            required: {
                              value: true,
                              message: "Block is required",
                            },
                          })}
                        />
                        <label>
                          {errors.block?.type === "required" && (
                            <span className="text-red-500 text-xs mt-1">
                              {errors.block.message}
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control pt-5 w-full">
                        <label className="label">
                          <span className="label-text text-blue-700 font-bold text-xs">
                            Sector
                          </span>
                        </label>
                        <input
                          type="text"
                          name="sector"
                          placeholder="Sector no"
                          className="input input-bordered input-xs w-full"
                          {...register("sector", {
                            required: {
                              value: true,
                              message: "Sector is required",
                            },
                          })}
                        />
                        <label>
                          {errors.sector?.type === "required" && (
                            <span className="text-red-500 text-xs mt-1">
                              {errors.sector.message}
                            </span>
                          )}
                        </label>
                      </div>
                      {/* area field */}
                      <div className="form-control pt-5  w-full">
                        <label className="label">
                          <span className="label-text text-left text-blue-700 font-bold text-xs">
                            Area
                          </span>
                        </label>
                        <div>
                          <select
                            required
                            className=" select input input-xs input-bordered text-left w-full "
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                          >
                            <option disabled value="">
                              Select your Area
                            </option>
                            <option value="mirpur">Mirpur</option>
                            <option value="mohammadpur">Mohammadpur</option>
                            <option value="gulshan">Gulshan</option>
                            <option value="dhanmondi">Dhanmondi</option>
                            <option value="banani">Banani</option>
                            <option value="savar">Savar</option>
                            <option value="motijheel">Motijheel</option>
                            <option value="uttora">Uttora</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {userRole === "customer" ? (
                      <div className="pl-36 pt-9">
                        <input
                          className="btn w-2/3 btn-sm border-blue-500 text-white text-xs font-bold bg-primary"
                          value="BOOK"
                          type="submit"
                          disabled={isBookButtonDisabled}
                        />
                      </div>
                    ) : (
                      <div className="pl-36 pt-9">
                        <input
                          className="btn w-2/3 btn-sm border-blue-500 text-white text-xs font-bold bg-primary"
                          value="BOOK"
                          type="submit"
                          disabled
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerDay;
