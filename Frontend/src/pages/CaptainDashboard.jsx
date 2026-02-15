import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap"; // ✅ ADD THIS
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainDashboard = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [vehicleFound, setVehicleFound] = useState(false);

  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel],
  );
    useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel],
  );
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* ================= MAP SECTION ================= */}
      <div className="h-[55%] relative">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />

        {/* Logout Button */}
        <Link
          to="/"
          className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-4 right-4 shadow-lg cursor-pointer z-50"
        >
          <i className="ri-logout-box-line text-lg"></i>
        </Link>
      </div>

      {/* ================= BOTTOM CARD ================= */}
      <div className="h-[45%]">
        <CaptainDetails />
      </div>
        <div
          ref={ridePopupPanelRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        >
          <RidePopUp setRidePopupPanel={setridePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setridePopupPanel} setVehicleFound={setVehicleFound} />
      </div>
    </div>
  );
};

export default CaptainDashboard;
