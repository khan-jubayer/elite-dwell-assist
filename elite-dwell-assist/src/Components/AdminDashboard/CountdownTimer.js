import React, { useEffect, useState } from "react";

const CountdownTimer = ({ selectedDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Function to calculate the time remaining
  function calculateTimeRemaining() {
    const now = new Date();
    const targetDate = new Date(selectedDate);
    const timeDiff = targetDate - now;

    // Check if the selected date has passed
    if (timeDiff <= 0) {
      return "Done";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Apply a CSS class to style the text in green
  const textClass = timeRemaining === "Done" ? "text-green-700 font-bold" : "";

  return <span className={textClass}>{timeRemaining}</span>;
};

export default CountdownTimer;
