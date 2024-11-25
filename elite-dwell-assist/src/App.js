import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Shared/Navbar";
import Login from "./Components/Login/Login";
import About from "./Components/About/About";
import Register from "./Components/Login/Register";
import Service from "./Components/Services/Service";
import { useState } from "react";
import Error from "./Components/Error/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaidSearchSegment from "./Components/Services/Maid/MaidSearchSegment";
import CustomerRegistrationForm from "./Components/Login/CustomerRegistrationForm";
import MaidDashboard from "./Components/MaidDashboard/MaidDashboard";
import MaidNotifications from "./Components/MaidDashboard/MaidNotifications";
import MaidProfile from "./Components/MaidDashboard/MaidProfile";
import CustomerDashboard from "./Components/CustomerDashboard/CustomerDashboard";
import CustomerNotification from "./Components/CustomerDashboard/CustomerNotification";
import CustomerProfile from "./Components/CustomerDashboard/CustomerProfile";
import PerDay from "./Components/Services/Maid/PerDay";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AdminProfile from "./Components/AdminDashboard/AdminProfile";
import AdminCreate from "./Components/AdminDashboard/AdminCreate";
import AdminMaidPerDayBookings from "./Components/AdminDashboard/AdminMaidPerDayBookings";
import CreatePostForMaid from "./Components/CustomerDashboard/CreatePostForMaid";
import MaidSearchJob from "./Components/MaidDashboard/MaidSearchJob";
import TVBill from "./Components/Services/ApplianceRepair/TVBill";
import RFBill from "./Components/Services/ApplianceRepair/RFBill";
import WMBill from "./Components/Services/ApplianceRepair/WMBill";
import OvenBill from "./Components/Services/ApplianceRepair/OvenBill";
import DriverDashboard from "./Components/DriverDashboard/DriverDashboard";
import CustomerInformation from "./Components/AdminDashboard/CustomerInformation";
import MaidBookings from "./Components/CustomerDashboard/MaidBookings";
import AcknowledgedMaidBookings from "./Components/AdminDashboard/AcknowledgedMaidBookings";
import TvBookings from "./Components/AdminDashboard/ApplianceBookings/TvBookings";
import WmBookings from "./Components/AdminDashboard/ApplianceBookings/WmBookings";
import RfBookings from "./Components/AdminDashboard/ApplianceBookings/RfBookings";
import OvenBookings from "./Components/AdminDashboard/ApplianceBookings/OvenBookings";
import DriverProfile from "./Components/DriverDashboard/DriverProfile";
import DriverSearchJob from "./Components/DriverDashboard/DriverSearchJob";
import DriverNotifications from "./Components/DriverDashboard/DriverNotifications";
import DriverUpdate from "./Components/DriverDashboard/DriverUpdate";
import DriverSearchSegment from "./Components/Services/Driver/DriverSearchSegment";
import DriverPost from "./Components/CustomerDashboard/DriverPost";
import BabysitterDashboard from "./Components/BabysitterDashboard/BabysitterDashboard";
import BabysitterProfile from "./Components/BabysitterDashboard/BabysitterProfile";
import BabysitterNotifications from "./Components/BabysitterDashboard/BabysitterNotifications";
import BabysitterSearchJob from "./Components/BabysitterDashboard/BabysitterSearchJob";
import CreatePostForBabysitter from "./Components/CustomerDashboard/CreatePostForBabysitter";
import Loginhomepagemodified from "./Components/Shared/Loginhomepagemodified";
import Reviews from "./Components/MaidDashboard/Reviews";
import MaidInformation from "./Components/AdminDashboard/MaidInformation";
import DriverInformation from "./Components/AdminDashboard/DriverInformation";
import BabysitterInformation from "./Components/AdminDashboard/BabysitterInformation";
import DriverBookings from "./Components/CustomerDashboard/DriverBookings";
import BabysitterBookings from "./Components/CustomerDashboard/BabysitterBookings";
import DriverReview from "./Components/DriverDashboard/DriverReview";
import BabysitterSearch from "./Components/Services/Babysitter/BabysitterSearch";
import BabysitterReview from "./Components/BabysitterDashboard/BabysitterReview";

function App() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const openAboutModal = () => {
    setIsAboutModalOpen(true);
  };
  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  return (
    <div>
      <Navbar openAboutModal={openAboutModal} />
      {isAboutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-primary w-1/2 p-9 rounded-3xl relative ">
            <About />
          </div>
          <div
            onClick={closeAboutModal}
            className="fixed inset-0 bg-sky-100 opacity-20 cursor-pointer"
          ></div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Loginhomepagemodified"
          element={<Loginhomepagemodified />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service" element={<Service />} />
        <Route
          path="/customer-register"
          element={<CustomerRegistrationForm />}
        />
        <Route path="/maidPerMonth" element={<MaidSearchSegment />} />
        <Route path="/driverPerMonth" element={<DriverSearchSegment />} />
        {/* admin */}
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route index element={<AdminProfile />}></Route>
          <Route
            path="adminMaidPerDayBookings"
            element={<AdminMaidPerDayBookings />}
          ></Route>
          <Route
            path="acknowledgedMaidBookings"
            element={<AcknowledgedMaidBookings />}
          ></Route>
          <Route path="adminCreate" element={<AdminCreate />}></Route>
          <Route path="customer" element={<CustomerInformation />}></Route>
          <Route path="maid" element={<MaidInformation />}></Route>
          <Route path="driver" element={<DriverInformation />}></Route>
          <Route path="babysitter" element={<BabysitterInformation />}></Route>
          <Route path="television" element={<TvBookings />}></Route>
          <Route path="washing-machine" element={<WmBookings />}></Route>
          <Route path="refrigerator" element={<RfBookings />}></Route>
          <Route path="oven" element={<OvenBookings />}></Route>
        </Route>
        {/* maid  */}
        <Route path="/maidDashboard" element={<MaidDashboard />}>
          <Route index element={<MaidProfile />}></Route>
          <Route
            path="maidNotification"
            element={<MaidNotifications />}
          ></Route>
          <Route path="searchJob" element={<MaidSearchJob />}></Route>
          <Route path="maidReview" element={<Reviews />}></Route>
        </Route>
        {/* babysitter  */}
        <Route path="/babysitterDashboard" element={<BabysitterDashboard />}>
          <Route index element={<BabysitterProfile />}></Route>
          <Route
            path="babysitterNotification"
            element={<BabysitterNotifications />}
          ></Route>
          <Route
            path="babysitterSearchJob"
            element={<BabysitterSearchJob />}
          ></Route>{" "}
          <Route path="babysitterReview" element={<BabysitterReview />}></Route>
        </Route>
        {/* driver*/}
        <Route path="/driverDashboard" element={<DriverDashboard />}>
          <Route index element={<DriverProfile />}></Route>
          <Route
            path="driverNotifications"
            element={<DriverNotifications />}
          ></Route>
          <Route path="searchJob" element={<DriverSearchJob />}></Route>
          <Route path="driverUpdate" element={<DriverUpdate />}></Route>
          <Route path="driverReview" element={<DriverReview />}></Route>
        </Route>
        {/* customer  */}
        <Route path="/customerDashboard" element={<CustomerDashboard />}>
          <Route index element={<CustomerProfile />}></Route>
          <Route
            path="customerNotification"
            element={<CustomerNotification />}
          ></Route>{" "}
          <Route
            path="createPostForMaid"
            element={<CreatePostForMaid />}
          ></Route>{" "}
          <Route path="createPostForDriver" element={<DriverPost />}></Route>{" "}
          <Route
            path="createPostForBabysitter"
            element={<CreatePostForBabysitter />}
          ></Route>{" "}
          <Route path="bookingsForMaid" element={<MaidBookings />}></Route>
          <Route path="bookingsForDriver" element={<DriverBookings />}></Route>
          <Route
            path="bookingsForBabysitter"
            element={<BabysitterBookings />}
          ></Route>
        </Route>
        <Route path="/maidPerDay" element={<PerDay />} />
        <Route path="/babysitter" element={<BabysitterSearch />} />
        <Route path="/tvBill" element={<TVBill />} />
        <Route path="/rfBill" element={<RFBill />} />
        <Route path="/wmBill" element={<WMBill />} />
        <Route path="/ovenBill" element={<OvenBill />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
