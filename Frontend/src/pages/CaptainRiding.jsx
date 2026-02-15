import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from "../components/FinishRide"; // ✅ Capital

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-full relative bg-gray-100 overflow-hidden">

      {/* ================= MAP SECTION ================= */}
      <div className="h-full w-full relative">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />

        <div className="absolute inset-0 bg-black/5"></div>

        <Link
          to="/"
          className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-4 right-4 shadow-lg z-50"
        >
          <i className="ri-logout-box-line text-lg"></i>
        </Link>
      </div>

      {/* ================= BOTTOM ACTION BAR ================= */}
      <div className="absolute bottom-0 w-full bg-yellow-400 px-6 py-5 rounded-t-2xl shadow-2xl">

        <div className="flex justify-center mb-3">
          <i className="ri-arrow-up-s-line text-2xl text-black"></i>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            4 KM away
          </h2>

          <button
            onClick={() => setFinishRidePanel(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition active:scale-95"
          >
            Complete Ride
          </button>
        </div>
      </div>

      {/* ================= FINISH RIDE PANEL ================= */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 w-full bg-white z-20 translate-y-full rounded-t-3xl px-5 py-8 shadow-2xl"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>

    </div>
  );
};

export default CaptainRiding;
