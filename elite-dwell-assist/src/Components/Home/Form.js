import React from "react";
import banner1 from "../../images/oven.jpg";
import banner2 from "../../images/tv.jpg";
import banner3 from "../../images/refrigaretor.jpg";
import banner4 from "../../images/washingmachine.jpg";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div id="applianceRepair">
      <div className="px-20 pb-20">
        <div>
          <h1
            style={{ fontFamily: "arial" }}
            className="text-3xl font-bold text-primary text-center pb-12"
          >
            Appliance Repair
          </h1>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="2000"
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-4"
        >
          <div className="card card-side w-80 border-2 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-blue-200 to-blue-50 hover:shadow-lg">
            <figure class="px-3 pt-3">
              <img
                src={banner4}
                alt="Babysitter"
                class="rounded-full absolute w-24 h-24 top-5 left-5"
              />
            </figure>
            <div class="card-body pt-12 pl-28">
              <h2 class="text-lg text-blue-900 font-bold">
                Washing Machine Services
              </h2>
              <button className="btn btn-sm rounded-full absolute w-4 h-4 top-5 right-5 border-blue-500 text-white text-lg font-extrabold bg-primary ">
                <Link to="/wmBill">↪</Link>
              </button>
            </div>
          </div>
          <div className="card card-side w-80 border-2 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-blue-200 to-blue-50 hover:shadow-lg">
            <figure class="px-3 pt-3">
              <img
                src={banner1}
                alt="Babysitter"
                class="rounded-full absolute w-24 h-24 top-5 left-5"
              />
            </figure>
            <div class="card-body pt-12 pl-28">
              <h2 class="text-lg text-blue-900 font-bold">Oven Services</h2>
              <button className="btn btn-sm rounded-full absolute w-4 h-4 top-5 right-5 border-blue-500 text-white text-lg font-extrabold bg-primary ">
                <Link to="/ovenBill">↪</Link>
              </button>
            </div>
          </div>
          <div className="card card-side w-80 border-2 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-blue-200 to-blue-50 hover:shadow-lg">
            <figure class="px-3 pt-3">
              <img
                src={banner2}
                alt="Babysitter"
                class="rounded-full absolute w-24 h-24 top-5 left-5"
              />
            </figure>
            <div class="card-body pt-12 pl-28">
              <h2 class="text-lg text-blue-900 font-bold">TV Services</h2>

              <button className="btn btn-sm rounded-full absolute w-4 h-4 top-5 right-5 border-blue-500 text-white text-lg font-extrabold bg-primary ">
                <Link to="/tvBill">↪</Link>
              </button>
            </div>
          </div>
          <div className="card card-side w-80 border-2 shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-t from-blue-200 to-blue-50 hover:shadow-lg">
            <figure class="px-3 pt-3">
              <img
                src={banner3}
                alt="Babysitter"
                class="rounded-full absolute w-24 h-24 top-5 left-5"
              />
            </figure>
            <div class="card-body pt-12 pl-28">
              <h2 class="text-lg text-blue-900 font-bold">
                Refrigerator Services
              </h2>
              <button className="btn btn-sm rounded-full absolute w-4 h-4 top-5 right-5 border-blue-500 text-white text-lg font-extrabold bg-primary ">
                <Link to="/rfBill">↪</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
