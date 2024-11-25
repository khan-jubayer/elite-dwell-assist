import React, { useState } from "react";

import BabysitterPerMonth from "./BabysitterPerMonth";

const BabysitterSearchSegment = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSelectedSalary(e.target.value);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 pt-5 gap-24 pl-48 pr-48 pb-6 ">
        {/* <div> */}
        <div className="form-control w-full h-full">
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder="Select Location"
            className="cursor-pointer h-12 w-full resize-x overflow-auto will-change-transform    rounded-md    hover:bg-indigo-300/50 md:active:bg-indigo-500/50 focus:bg-indigo-300/50      hover:ring hover:ring-violet-300 focus:ring focus:ring-violet-300      border-2 border-indigo-500       focus:outline-none       shadow-lg shadow-indigo-300 hover:shadow-none     text-lg text-indigo-800/90 text-center md:focus:text-left  font-semibold "
          >
            <option value="" disabled selected hidden>
              --Select Location--
            </option>
            <option value="Dhanmondi">Dhanmondi</option>
            <option value="Mirpur">Mirpur</option>
            <option value="Savar">Savar</option>
            <option value="Uttara">Uttara</option>
            <option value="Gulshan">Gulshan</option>
            <option value="Mohammadpur">Mohammadpur</option>
            <option value="Banani">Banani</option>
            <option value="Motijheel">Motijheel</option>
          </select>
        </div>
        <div className="form-control w-full h-full">
          <select
            value={selectedAvailability}
            onChange={handleAvailabilityChange}
            className="cursor-pointer h-12 w-full   rounded-md    hover:bg-indigo-300/50 md:active:bg-indigo-500/50 focus:bg-indigo-300/50      hover:ring hover:ring-violet-300 focus:ring focus:ring-violet-300      border-2 border-indigo-500       focus:outline-none       shadow-lg shadow-indigo-300 hover:shadow-none     text-lg text-indigo-800/90 text-center md:focus:text-left  font-semibold "
          >
            <option value="" disabled selected hidden>
              --Select Availability--
            </option>
            <option value="Morning"> Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div className="form-control w-full h-full">
          <select
            value={selectedSalary}
            onChange={handleSalaryChange}
            className="cursor-pointer h-12 w-full   rounded-md    hover:bg-indigo-300/50 md:active:bg-indigo-500/50 focus:bg-indigo-300/50      hover:ring hover:ring-violet-300 focus:ring focus:ring-violet-300      border-2 border-indigo-500       focus:outline-none       shadow-lg shadow-indigo-300 hover:shadow-none     text-lg text-indigo-800/90 text-center md:focus:text-left  font-semibold "
          >
            <option value="" disabled selected hidden>
              --Select Salary(BDT)--
            </option>
            <option value="1">5k</option>
            <option value="2">5-10K</option>
            <option value="3">10-15K</option>
            <option value="4">15-20K</option>
            <option value="5">20-25K</option>
            <option value="6">25-30K</option>
            <option value="7">30K and above</option>

            {/* <option value="5000">5k</option>
            <option value="10000">5-10K</option>
            <option value="15000">10-15K</option>
            <option value="20000">15-20K</option>
            <option value="25000">20-25K</option>
            <option value="30000">25-30K</option>
            <option value="35000">30K and above</option> */}
          </select>
        </div>
      </div>
      <div className="pl-48 pr-48">
        <hr className="border-indigo-500 border-2 rounded-full " />
      </div>

      <BabysitterPerMonth
        selectedLocation={selectedLocation}
        selectedAvailability={selectedAvailability}
        selectedSalary={selectedSalary}
      />
    </div>
  );
};

export default BabysitterSearchSegment;
