import React, { useState } from "react";
import "./test.css"; 

const Loginhomepagemodified = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["author 1", "author 2", "author 3", "author 4"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-button">
      <button onClick={toggleDropdown} className="button">
        {selectedOption || "Select an option"}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option} onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Loginhomepagemodified;
