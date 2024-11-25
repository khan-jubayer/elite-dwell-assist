import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Footer from "../../Shared/Footer";
import { format, subDays } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const WMBill = () => {
  const [house, setHouse] = useState("");
  const [road, setRoad] = useState("");
  const [block, setBlock] = useState("");
  const [sector, setSector] = useState("");
  const pdfGenerate = () => {
    const pdf = new jsPDF();
    let yPos = 20;

    // Add blue bars at the top and bottom
    pdf.setDrawColor(52, 152, 219); // Set the draw color to blue
    pdf.setLineWidth(2); // Set the line width to 2
    pdf.line(10, 10, 200, 10); // Top blue bar
    pdf.line(10, 287, 200, 287); // Bottom blue bar

    // Add the image
    const imgData = "./logo.png";
    const imgWidth = 30;
    const imgHeight = 25;
    const imgx = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
    pdf.addImage(imgData, "PNG", imgx, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 10;

    // Set the title and subtitle
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#4285F4"); // Set text color to blue
    pdf.setFontSize(26);
    pdf.text("Elite Dwell Assist", 105, yPos, null, null, "center");
    pdf.setFontSize(18);
    pdf.setTextColor("#707070"); // Set text color to grey
    yPos += 10;
    pdf.text("Service Bill", 105, yPos, null, null, "center");
    pdf.setFont("helvetica", "normal");
    yPos += 10;

    // Add date and time
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#4285F4"); // Set text color to blue
    pdf.text(15, yPos, "Booking Date and Time");
    pdf.setFont("helvetica", "normal");
    yPos += 10;
    const now = new Date();
    const date = `Date: ${now.toLocaleDateString()}`;
    const time = `Time: ${now.toLocaleTimeString()}`;
    pdf.setFontSize(14);
    pdf.setTextColor("#707070"); // Set text color to grey
    pdf.text(15, yPos, date);
    yPos += 10;
    pdf.text(15, yPos, time);
    yPos += 10;

    // Add user information
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#4285F4"); // Set text color to blue
    pdf.text(15, yPos, "User Information");
    pdf.setFont("helvetica", "normal");
    yPos += 10;
    pdf.setTextColor("#707070"); // Set text color to grey
    pdf.text(15, yPos, `Name: ${user?.displayName}`);
    pdf.text(156, yPos, `Block: ${block}`);
    yPos += 10;
    pdf.text(15, yPos, `Email: ${user?.email}`);
    pdf.text(156, yPos, `Sector: ${sector}`);
    yPos += 10;
    pdf.text(15, yPos, `House: ${house}`);
    pdf.text(156, yPos, `Area: ${area}`);
    yPos += 10;
    pdf.text(15, yPos, `Road: ${road}`);
    yPos += 10;

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#4285F4"); // Set text color to blue
    pdf.text(15, yPos, "Time and Date");
    pdf.setFont("helvetica", "normal");
    yPos += 10;
    pdf.setTextColor("#707070");
    pdf.text(15, yPos, `Visiting Time: ${selectedTimeSlot}`);
    yPos += 10;
    pdf.text(15, yPos, `Visiting Date: ${selectedDate}`);
    yPos += 10;

    // Create table
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#4285F4"); // Set text color to blue
    pdf.text(15, yPos, "Selected Services");
    pdf.setFont("helvetica", "normal");
    yPos += 10;

    const tableColumn = ["Selected Services", "Price", "Quantity"];
    const tableRows = [
      ["Refrigerator Checking", "1000", wmChecking.toString()],
      ["Washing Machine Installation", "1000", wmInstallation.toString()],
      ["Washing Machine Servicing", "1000", wmServicing.toString()],
    ];

    pdf.autoTable({
      startY: yPos,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 14, // Adjust the font size as needed
      },
    });

    yPos = pdf.lastAutoTable.finalY + 10;

    // Calculate the total bill
    const totalBill = total;
    const formattedTotal = totalBill.toLocaleString();

    // Define the rectangle for the total bill
    const rectWidth = 60;
    const rectHeight = 10;
    const rectX = 135;
    const rectY = yPos;
    const rectColor = [52, 152, 219]; // Blue color

    // Draw the rectangle with a blue border
    pdf.setDrawColor(rectColor[0], rectColor[1], rectColor[2]);
    pdf.setLineWidth(0.5);
    pdf.rect(rectX, rectY, rectWidth, rectHeight);

    // Add the "Total Bill" text and value
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(rectColor[0], rectColor[1], rectColor[2]);
    pdf.text("Total Bill:", rectX + 2, rectY + 6);
    pdf.text(formattedTotal + " TK", rectX + rectWidth - 30, rectY + 6);

    // Adjust the y position
    yPos += 20;

    // Save the PDF
    pdf.save("slip.pdf");
  };
  const [wmChecking, setwmChecking] = useState(0);
  const [wmServicing, setwmServicing] = useState(0);
  const [wmInstallation, setwmInstallation] = useState(0);
  const [user] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [area, setArea] = useState("");
  const [isBookButtonDisabled, setIsBookButtonDisabled] = useState(true);

  const itemPrice = 1000;
  const total =
    wmChecking * itemPrice +
    wmServicing * itemPrice +
    wmInstallation * itemPrice;

  const userRole = localStorage.getItem("userRole");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleServiceSelect = () => {
    const updatedServices = [];
    if (wmChecking > 0) {
      updatedServices.push({
        name: "Washing Machine Checking",
        count: wmChecking,
      });
    }
    if (wmServicing > 0) {
      updatedServices.push({
        name: "Washing Machine Servicing",
        count: wmServicing,
      });
    }

    if (wmInstallation > 0) {
      updatedServices.push({
        name: "Washing Machine Installation",
        count: wmInstallation,
      });
    }
    setSelectedServices(updatedServices);
    setIsBookButtonDisabled(selectedServices.length < 0);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
      console.error("Please fill out all required fields.");
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
      await fetch("http://localhost:5000/wmBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((result) => {
          notify();
          reset();
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
      {userRole !== "customer" && (
        <p className="text-red-500 text-xs text-center mt-1">
          You do not have permission to access this page.
        </p>
      )}
      <div className="bg-white p-4 mt-7 mx-96 rounded-lg shadow-md mb-4">
        <p className="text-lg text-center text-black font-semibold">
          {displaySelectedInfo()}
        </p>
      </div>
      <div className="flex pb-32">
        <div className="grid grid-cols-2">
          <div className="ml-10">
            <div className="time-slot-container pt-20">
              <strong className="text-lg mx-16 font-bold text-center text-primary">
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
              <div>
                <h1 className="text-lg font-bold text-primary mx-16 pt-14 text-left">
                  Select a Date
                </h1>
                <div className="mx-10 calendar-container">
                  <DayPicker
                    selected={selectedDate}
                    onDayClick={handleDateSelect}
                    disabled={(date) => date < subDays(new Date(), 1)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-5 pt-6">
            <div>
              <div className="card w-full bg-transparent border-4 rounded-3xl border-blue-300 text-blue-800">
                <div className="card-body">
                  <h2 className="card-title">Address</h2>
                  <p>Expert will arrive at the address given below</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {userRole === "customer" && (
                      <div className="form-control grid grid-cols-2 gap-7 pt-5 w-full">
                        <div>
                          <label className="label">
                            <span className="label-text text-blue-700 font-bold text-sm">
                              Name
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Display Name"
                            className="input input-bordered input-sm w-full"
                            value={user?.displayName}
                            disabled
                          />
                        </div>
                        <div>
                          {" "}
                          <label className="label">
                            <span className="label-text text-blue-700 font-bold text-sm">
                              Email
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Email"
                            className="input input-bordered input-sm w-full"
                            value={user?.email}
                            disabled
                          />{" "}
                        </div>
                      </div>
                    )}
                    <div className="form-control pt-5 w-full">
                      <label className="label">
                        <span className="label-text text-blue-700 font-bold text-sm">
                          House
                        </span>
                      </label>
                      <input
                        type="text"
                        name="house"
                        placeholder="Your address"
                        className="input input-bordered input-sm w-full"
                        {...register("house", {
                          required: {
                            value: true,
                            message: "House is required",
                          },
                        })}
                        onChange={(e) => setHouse(e.target.value)}
                      />
                      <label>
                        {errors.house?.type === "required" && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.house.message}
                          </span>
                        )}
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control pt-5 w-full">
                        <label className="label">
                          <span className="label-text text-blue-700 font-bold text-sm">
                            Road no
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Road no"
                          name="road"
                          className="input input-bordered input-sm w-full"
                          {...register("road", {
                            required: {
                              value: true,
                              message: "Road no is required",
                            },
                          })}
                          onChange={(e) => setRoad(e.target.value)}
                        />
                        <label>
                          {errors.road?.type === "required" && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.road.message}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="form-control pt-5 w-full">
                        <label className="label">
                          <span className="label-text text-blue-700 font-bold text-sm">
                            Block
                          </span>
                        </label>
                        <input
                          type="text"
                          name="block"
                          placeholder="Block no"
                          className="input input-bordered input-sm w-full"
                          {...register("block", {
                            required: {
                              value: true,
                              message: "Block is required",
                            },
                          })}
                          onChange={(e) => setBlock(e.target.value)}
                        />
                        <label>
                          {errors.block?.type === "required" && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.block.message}
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control pt-5 w-full">
                        <label className="label">
                          <span className="label-text text-blue-700 font-bold text-sm">
                            Sector
                          </span>
                        </label>
                        <input
                          type="text"
                          name="sector"
                          placeholder="Sector no"
                          className="input input-bordered input-sm w-full"
                          {...register("sector", {
                            required: {
                              value: true,
                              message: "Sector is required",
                            },
                          })}
                          onChange={(e) => setSector(e.target.value)}
                        />
                        <label>
                          {errors.sector?.type === "required" && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.sector.message}
                            </span>
                          )}
                        </label>
                      </div>
                      {/* area field */}
                      <div className="form-control pt-5  w-full">
                        <label className="label">
                          <span className="label-text text-left text-blue-700 font-bold text-sm">
                            Area
                          </span>
                        </label>
                        <div>
                          <select
                            required
                            className=" select input input-sm input-bordered text-left w-full "
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
                    <div className="pl-20 pt-9">
                      {userRole === "customer" ? (
                        <input
                          className="btn w-2/3 btn-sm border-blue-500 text-white text-sm font-bold bg-primary"
                          value="BOOK"
                          type="submit"
                          disabled={isBookButtonDisabled}
                        />
                      ) : (
                        <input
                          className="btn w-2/3 btn-sm border-blue-500 text-white text-sm font-bold bg-primary"
                          value="BOOK"
                          type="submit"
                          disabled
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-28 w-96 text-center text-base">
          {/* washing machine checking */}
          <div className="absolute top-[220px] left-[27.5px] w-[376px] h-[137px]">
            <div className=" box-border w-96 h-36 border-2 border-gray-300" />
            {/* taka icon */}
            <img
              className="absolute top-4 right-4 w-8 h-8 "
              alt=""
              src="/tablercurrencytaka2.svg"
            />
            {/* trash button */}
            <button
              className="cursor-pointer absolute top-20 right-4 w-6 h-6"
              id="cancel_button"
              onClick={() => {
                setwmServicing(0);
                handleServiceSelect("TV Power Supply Problem");
              }}
            >
              <img
                className="absolute h-[20.83%] w-[8.33%] top-[45.83%] right-[54.17%] bottom-[33.33%] left-[37.5%] rounded-sm max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector-8.svg"
              />
              <img
                className="absolute h-[20.83%] w-[8.33%] top-[45.83%] right-[37.5%] bottom-[33.33%] left-[54.17%] rounded-sm max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector-8.svg"
              />
              <img
                className="absolute h-[62.5%] w-[79.17%] top-[25%] right-[8.33%] bottom-[12.5%] left-[12.5%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/rectangle-41.svg"
              />
              <div className="absolute h-[12.5%] w-3/12 top-[8.33%] right-[20.83%] bottom-[79.17%] left-[54.17%] rounded-[50%] box-border [transform:_rotate(180deg)] [transform-origin:0_0] border-[2px] border-solid border-line-icon" />
            </button>
            {/* 1000 er div */}
            <div className="absolute top-5 right-14 font-bold text-gray-400">
              1000
            </div>
            {/* plus minus segment */}
            <div className="absolute h-8 w-24 bottom-2 left-28 text-sm">
              <button
                className="cursor-pointer absolute top-0 right-16 bottom-0 left-0 rounded-sm shadow-sm border-2"
                id="tv_power_minus"
                onClick={() => {
                  setwmServicing(Math.max(wmServicing - 1, 0));
                  handleServiceSelect("TV Power Supply Problem");
                }}
              >
                <span className="text-2xl">-</span>
              </button>

              <div className="absolute h-7 w-full flex items-center justify-center">
                {wmServicing}
              </div>
              <button
                className="cursor-pointer absolute top-0 right-0 bottom-0 left-16 rounded-sm shadow-sm border-2"
                id="tv_power_plus"
                onClick={() => {
                  setwmServicing(wmServicing + 1);
                  handleServiceSelect("TV Power Supply Problem");
                }}
              >
                <span className="text-2xl">+</span>
              </button>
            </div>
            {/* header */}
            <div className="absolute top-4 left-28 text-xl text-left w-44">
              Washing Machine Servicing
            </div>
            {/* image section */}
            <img
              className="absolute top-[23px] left-[19px] w-[71px] h-[93px] object-cover"
              alt=""
              src="/WM2.jpg"
            />
          </div>

          {/* Washing Machine installation*/}
          <div className="absolute top-[390px] left-[27px] w-[376px] h-[137px]">
            <div className=" box-border w-96 h-36 border-2 border-gray-300" />
            {/* taka icon */}
            <img
              className="absolute top-4 right-4 w-8 h-8 "
              alt=""
              src="/tablercurrencytaka2.svg"
            />
            {/* trash button */}
            <button
              className="cursor-pointer absolute top-20 right-4 w-6 h-6"
              id="cancel_button"
              onClick={() => {
                handleServiceSelect("TV Mounting");
                setwmInstallation(0);
              }}
            >
              <img
                className="absolute h-[20.83%] w-[8.33%] top-[45.83%] right-[54.17%] bottom-[33.33%] left-[37.5%] rounded-sm max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector-8.svg"
              />
              <img
                className="absolute h-[20.83%] w-[8.33%] top-[45.83%] right-[37.5%] bottom-[33.33%] left-[54.17%] rounded-sm max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector-8.svg"
              />
              <img
                className="absolute h-[62.5%] w-[79.17%] top-[25%] right-[8.33%] bottom-[12.5%] left-[12.5%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/rectangle-41.svg"
              />
              <div className="absolute h-[12.5%] w-3/12 top-[8.33%] right-[20.83%] bottom-[79.17%] left-[54.17%] rounded-[50%] box-border [transform:_rotate(180deg)] [transform-origin:0_0] border-[2px] border-solid border-line-icon" />
            </button>
            {/* 1000 er div */}
            <div className="absolute top-5 right-14 font-bold text-gray-400">
              1000
            </div>

            {/* plus minus segment */}
            <div className="absolute h-8 w-24 bottom-2 left-28 text-sm">
              <button
                className="cursor-pointer absolute top-0 right-16 bottom-0 left-0 rounded-sm shadow-sm border-2"
                id="tv_mounting_minus"
                onClick={() => {
                  setwmInstallation(Math.max(wmInstallation - 1, 0));
                  handleServiceSelect("TV Mounting");
                }}
              >
                <span className="text-2xl">-</span>
              </button>

              <div className="absolute h-7 w-full flex items-center justify-center">
                {wmInstallation}
              </div>
              <button
                className="cursor-pointer absolute top-0 right-0 bottom-0 left-16 rounded-sm shadow-sm border-2"
                id="tv_mounting_plus"
                onClick={() => {
                  setwmInstallation(wmInstallation + 1);
                  handleServiceSelect("TV Mounting");
                }}
              >
                <span className="text-2xl">+</span>
              </button>
            </div>
            {/* header */}
            <div className="absolute top-[calc(50%_-_46.5px)] left-[calc(50%_-_81px)] text-xl font-actor text-left inline-block w-[166px] h-[19px]">
              Washing Machine Installation
            </div>
            {/* image section */}
            <img
              className="absolute top-[23px] left-[18px] w-[71px] h-[94px] object-cover"
              alt=""
              src="/WM3.jfif"
            />
          </div>

          {/* Washing Machine Checking */}
          <div className="absolute top-[50px] left-[27px] w-[376px] h-[137px]">
            <div className=" box-border w-96 h-36 border-2 border-gray-300" />
            {/* taka icon */}
            <img
              className="absolute top-4 right-4 w-8 h-8 "
              alt=""
              src="/tablercurrencytaka2.svg"
            />

            <button
              className="cursor-pointer p-0 bg-[transparent] absolute top-[80px] left-[333px] box-border w-6 h-6 border-[1px] border-solid border-white"
              id="cancel_button"
              onClick={() => {
                handleServiceSelect("TV Sound Problem");
                setwmChecking(0);
              }}
            >
              <img
                className="absolute h-[20.83%] w-[8.33%] top-[45.83%] right-[54.17%] bottom-[33.33%] left-[37.5%] rounded-sm max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector-8.svg"
              />
              <img
                className="absolute h-[20.83%] w-[8.33%] top-[45.83%] right-[37.5%] bottom-[33.33%] left-[54.17%] rounded-sm max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector-8.svg"
              />
              <img
                className="absolute h-[62.5%] w-[79.17%] top-[25%] right-[8.33%] bottom-[12.5%] left-[12.5%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/rectangle-41.svg"
              />
              <div className="absolute h-[12.5%] w-3/12 top-[8.33%] right-[20.83%] bottom-[79.17%] left-[54.17%] rounded-[50%] box-border [transform:_rotate(180deg)] [transform-origin:0_0] border-[2px] border-solid border-line-icon" />
            </button>
            {/* 1000 er div */}
            <div className="absolute top-5 right-14 font-bold text-gray-400">
              1000
            </div>

            {/* plus minus segment */}
            <div className="absolute h-8 w-24 bottom-2 left-28 text-sm">
              <button
                className="cursor-pointer absolute top-0 right-16 bottom-0 left-0 rounded-sm shadow-sm border-2"
                id="tv_sound_minus"
                onClick={() => {
                  setwmChecking(Math.max(wmChecking - 1, 0));
                  handleServiceSelect("TV Sound Problem");
                }}
              >
                <span className="text-2xl">-</span>
              </button>

              <div className="absolute h-7 w-full flex items-center justify-center">
                {wmChecking}
              </div>
              <button
                className="cursor-pointer absolute top-0 right-0 bottom-0 left-16 rounded-sm shadow-sm border-2"
                id="tv_sound_plus"
                onClick={() => {
                  setwmChecking(wmChecking + 1);
                  handleServiceSelect("TV Sound Problem");
                }}
              >
                <span className="text-2xl">+</span>
              </button>
            </div>
            {/* header */}
            <div className="absolute top-4 left-28 w-40 text-xl text-left">
              Washing Machine Checking
            </div>
            {/* image section */}
            <img
              className="absolute top-[calc(50%_-_49.5px)] left-[calc(50%_-_167px)] w-[70px] h-[93px] object-cover"
              alt=""
              src="/WM1.jpg"
            />
          </div>

          <img
            className="absolute top-[calc(50%_-_25px)] right-[320px] w-[45px] h-[42px]"
            alt=""
            src="/setting-fill.svg"
          />
          {/* total */}
          <div className="absolute top-[550px] left-[31.5px] w-[347px] py-[13px] text-left text-lg text-black">
            <div className="flex flex-row items-start justify-start">
              <div className="flex-1 relative h-[26px]">
                <div className="font-semibold">Total</div>
                <div className="absolute top-[calc(50%_-_13px)] right-[0px] font-semibold text-right">
                  {total}
                </div>
              </div>
            </div>
            <button
              className="absolute top-[calc(50%_-_-30px)] right-[-20px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={pdfGenerate}
            >
              Download Slip
            </button>
          </div>
          <div className="absolute top-[562px] left-[384.5px] text-lg font-semibold text-right">
            tk
          </div>
          <div className="text-left ml-14  text-xl font-medium">Services</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WMBill;
