import React, { useState } from "react";
import DriverPerMonth from "./DriverPerMonth";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const DriverSearchSegment = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState([10000, 30000]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSalaryChange = (value) => {
    setSelectedSalary(value);
  };

  return (
    <div className="flex">
      <div className="search-options border-r pr-80">
        <div className="search-form">
          <div className="search-options-content">
            <ul className="menu p-4 w-80 h-screen fixed text-base-content">
              <div className="search-options-section">
                <p className="mt-20 mb-3 text-primary font-bold text-lg">
                  Search by location:
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
                  <option value="Uttora">Uttora</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Mohammadpur">Mohammadpur</option>
                  <option value="Banani">Banani</option>
                  <option value="Motijheel">Motijheel</option>
                </select>
              </div>
              <div className="search-options-section">
                <p className="mt-14 mb-3 text-primary font-bold text-lg">
                  Search by salary:
                </p>
                <Slider
                  min={10000}
                  max={30000}
                  value={selectedSalary}
                  onChange={handleSalaryChange}
                  step={1000}
                  marks={{
                    10000: "10000",
                    15000: "15000",
                    20000: "20000",
                    25000: "25000",
                    30000: "30000",
                  }}
                />
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <DriverPerMonth
          selectedLocation={selectedLocation}
          selectedSalary={selectedSalary}
        />
      </div>
    </div>
  );
};

export default DriverSearchSegment;
