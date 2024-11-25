import React, { useState } from "react";
import MaidPerMonth from "./MaidPerMonth";

const MaidSearchSegment = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
  };

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };

  return (
    <div className="flex">
      <div className="search-options border-r pr-80">
        <div className="search-form">
          <div className="search-options-content">
            <ul className="menu p-4 w-80 h-screen fixed top-20 text-base-content">
              <div className="search-options-section">
                <p className="mt-14 mb-3 text-primary font-bold text-lg">
                  Search by location
                </p>
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="select select-bordered select-primary w-full"
                >
                  <option value="">Select Location</option>
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
              <div className="search-options-section">
                <p className="mt-14 mb-3 text-primary font-bold text-lg">
                  Search by availability
                </p>
                <select
                  value={selectedAvailability}
                  onChange={handleAvailabilityChange}
                  className="select select-bordered select-primary w-full" // Added w-full to set the width to 100%
                >
                  <option value="">Select Availability</option>
                  <option value="sokal">08.00 AM - 11.00 AM</option>
                  <option value="dupur">11.00 AM - 02.00 PM</option>
                  <option value="bikal">02.00 PM - 05.00 PM</option>
                  <option value="raat">05.00 PM - 08.00 PM</option>
                </select>
              </div>
              <div className="search-options-section">
                <p className="mt-14 mb-3 text-primary font-bold text-lg">
                  Search by task
                </p>
                <select
                  value={selectedTask}
                  onChange={handleTaskChange}
                  className="select select-bordered select-primary w-full"
                >
                  <option value="">Select Task</option>
                  <option value="mopping">Mopping</option>
                  <option value="cooking">Cooking</option>
                  <option value="cloth_washing">Cloth Washing</option>
                  <option value="sweeping">Sweeping</option>
                  <option value="dish_washing">Dish Washing</option>
                </select>
              </div>{" "}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <MaidPerMonth
          selectedLocation={selectedLocation}
          selectedTask={selectedTask}
          selectedAvailability={selectedAvailability}
        />
      </div>
    </div>
  );
};

export default MaidSearchSegment;
