import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const logoRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.2,
      });
      gsap.to(logoRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2,
      });
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
  if (vehiclePanelOpen) {
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(0)",
      duration: 0.4,
      ease: "power3.out",
    });
  } else {
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(100%)",
      duration: 0.4,
      ease: "power3.in",
    });
  }
}, [vehiclePanelOpen]);


  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-900">
      {/* GoCab Logo */}
      <div
        ref={logoRef}
        className="absolute left-5 top-5 z-20 flex items-center gap-2"
      >
        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">GoCab</h1>
      </div>

      {/* Background Map */}
      <div className="relative h-full w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/30 to-gray-900/80"></div>
      </div>

      {/* Bottom Sheet */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none">
        <div className="bg-white rounded-t-3xl shadow-2xl px-5 py-6 relative pointer-events-auto">
          {/* Close button */}
          <button
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-5 top-5 text-gray-600 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            <i className="ri-arrow-down-s-line text-xl"></i>
          </button>

          {/* Header */}
          <div className="mb-7">
            <h4 className="text-2xl font-bold text-gray-900">Find a trip</h4>
            <p className="text-sm text-gray-500 mt-1">
              Enter your pickup and destination
            </p>
          </div>

          {/* Form container */}
          <form onSubmit={submitHandler}>
            <div className="relative">
              {/* Pickup Location Input */}
              <div className="relative group mb-3">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>
                </div>
                <input
                  onClick={() => setPanelOpen(true)}
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="bg-gray-100 border border-transparent pl-12 pr-4 py-4 text-[15px] rounded-lg w-full transition-all duration-200 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-400"
                  type="text"
                  placeholder="Pickup location"
                />
              </div>

              {/* Connecting line */}
              <div className="absolute left-[29px] top-[46px] w-[2px] h-6 bg-gray-300"></div>

              {/* Destination Input */}
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="w-2.5 h-2.5 bg-gray-900 rounded-[3px]"></div>
                </div>
                <input
                  onClick={() => setPanelOpen(true)}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-gray-100 border border-transparent pl-12 pr-4 py-4 text-[15px] rounded-lg w-full transition-all duration-200 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-400"
                  type="text"
                  placeholder="Where to?"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Expandable Panel */}
        <div
          ref={panelRef}
          className="h-0 bg-white pointer-events-auto overflow-hidden"
        >
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanelOpen}
          />
        </div>
      </div>

      {/* Vehicle Selection Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 pt-14 pb-3 translate-y-full"
      > <h5 className="p-1 text-center w-[93%] absolute top-0 bg-white-500 " onClick={()=>{
        setVehiclePanel(false)
      }}><i className="ri-arrow-down-s-line text-xl text-gray-200"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

        {/* Vehicle Cards */}
        <div className="space-y-3">
          {/* UberGo Card - Selected */}
          <div className="flex items-center justify-between p-3 border-2 active:border-black rounded-lg bg-white cursor-pointer">
            <img
              className="h-12"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt="UberGo"
            />
            <div className="flex-1 ml-2">
              <h4 className="font-medium text-base flex items-center gap-2">
                UberGo
                <span className="flex items-center">
                  <i className="ri-user-3-fill text-sm"></i> 4
                </span>
              </h4>
              <h5 className="font-medium text-sm">2 mins away</h5>
              <p className="text-xs text-gray-600">Affordable, compact rides</p>
            </div>
            <h2 className="text-lg font-semibold">₹193.20</h2>
          </div>

          {/* Moto Card */}
          <div className="flex items-center justify-between p-3 border-2 active:border-black rounded-lg bg-white cursor-pointer">
            <img
              className="h-12"
              src="https://www.pngarts.com/files/1/Yamaha-Motorcycle-PNG-Photo.png"
              alt="Moto"
            />
            <div className="flex-1 ml-2">
              <h4 className="font-medium text-base flex items-center gap-2">
                Moto
                <span className="flex items-center">
                  <i className="ri-user-3-fill text-sm"></i> 1
                </span>
              </h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="text-xs text-gray-600">
                Affordable motorcycle rides
              </p>
            </div>
            <h2 className="text-lg font-semibold">₹65</h2>
          </div>

          {/* UberAuto Card */}
          <div className="flex items-center justify-between p-3 border-2 active:border-black rounded-lg bg-white cursor-pointer">
            <img
              className="h-12"
              src="https://png.pngtree.com/png-clipart/20250124/original/pngtree-auto-rickshaw-png-image_20303035.png"
              alt="Auto"
            />
            <div className="flex-1 ml-2">
              <h4 className="font-medium text-base flex items-center gap-2">
                UberAuto
                <span className="flex items-center">
                  <i className="ri-user-3-fill text-sm"></i> 3
                </span>
              </h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="text-xs text-gray-600">Affordable Auto rides</p>
            </div>
            <h2 className="text-lg font-semibold">₹118.86</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
