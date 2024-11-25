import React from "react";
import banner2 from "../../images/babysitter.jpg";
import banner3 from "../../images/driver.jpg";
import banner1 from "../../images/maid.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const ServiceSegment = () => {
  return (
    <div className="pb-16 px-20">
      <div
        data-aos="fade-left"
        data-aos-duration="2000"
        className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-4 md:gap-6"
      >
        <div>
          <h1
            style={{ fontFamily: "arial" }}
            className="text-3xl font-bold text-primary text-center pt-32"
          >
            Elevate Your Home
          </h1>
          <h1
            style={{ fontFamily: "arial" }}
            className="text-3xl font-bold text-primary text-center pt-2"
          >
            Elevate Your Life
          </h1>
          <p className="text-justify font-semibold pt-2">
            Dedicated to Your Home's Happiness.We are Cherishing Every Home,
            Every Service, Where Quality Meets Home-care.We are creating Home
            Magic, Task by Task.Because we believe
            <span className="font-bold text-primary">
              {" "}
              Your Home, Our Pride
            </span>
          </p>
        </div>
        <div>
          <div class="card w-80  border-2 border-blue-100 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-sky-100 to-sky-50 hover:shadow-lg">
            <figure class="px-10 pt-10">
              <img src={banner1} alt="Babysitter" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title text-blue-900 font-bold">House-Keeper</h2>
              <p>Your Home, Our Care: Where Cleanliness Meets Excellence!</p>
              <div class="card-actions pt-9">
                <Link to="/maidPerMonth">
                  <button className="btn btn-sm border-blue-500 text-white text-xs font-bold bg-primary">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="card w-80  border-2 border-blue-100 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-sky-100 to-sky-50  hover:shadow-lg">
            <figure class="px-10 pt-10">
              <img src={banner2} alt="Babysitter" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title text-blue-900 font-bold">Babysitter!</h2>
              <p>Caring for Little Ones, Your Trusted Sitter!</p>
              <div class="card-actions pt-9">
                <Link to="/babysitter">
                  <button className="btn btn-sm border-blue-500 text-white text-xs font-bold bg-primary">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="card w-80  border-2 border-blue-100 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-sky-100 to-sky-50  hover:shadow-lg">
            <figure class="px-10 pt-10">
              <img src={banner3} alt="Babysitter" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title text-blue-900 font-bold">Driver</h2>
              <p>Steering You Towards Safe and Reliable Transportation.</p>
              <div class="card-actions pt-9">
                <Link to="/driverPerMonth">
                  <button className="btn btn-sm border-blue-500 text-white text-xs font-bold bg-primary">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSegment;
