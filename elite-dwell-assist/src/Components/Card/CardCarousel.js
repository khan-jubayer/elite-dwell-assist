import React from "react";
import Slider from 'react-slick';

const CardCarousel = () => {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of visible cards
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center">
          {/* Repeat this card element for each item in your carousel */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Add your card content here */}
              <h2 className="text-xl font-semibold mb-2">Card Title</h2>
              <p className="text-gray-600">Card description goes here.</p>
            </div>
          </div>

          {/* Repeat the card elements for each item in the carousel */}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;