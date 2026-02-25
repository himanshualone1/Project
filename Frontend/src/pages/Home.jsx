import { useRef, useState, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/vehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/waitingforDriver";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const logoRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehiclefoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setfare] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const { socket } = useContext(SocketContext);
  // Debounce timer ref
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (captain && captain._id && socket.connected) {
      sendMessage("join", {
        userId: captain._id,
        userType: "captain",
      });
    }
  }, [captain, socket.connected]);

  // Fetch suggestions from backend
  const fetchSuggestions = async (input, field) => {
    if (!input || input.trim().length === 0) {
      if (field === "pickup") {
        setPickupSuggestions([]);
      } else {
        setDestinationSuggestions([]);
      }
      return;
    }

    try {
      setIsFetchingSuggestions(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/maps/get-suggestions`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        if (field === "pickup") {
          setPickupSuggestions(response.data.data);
        } else {
          setDestinationSuggestions(response.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      if (field === "pickup") {
        setPickupSuggestions([]);
      } else {
        setDestinationSuggestions([]);
      }
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  // Debounced pickup change handler
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField("pickup");

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value, "pickup");
    }, 300);
  };

  // Debounced destination change handler
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField("destination");

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value, "destination");
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
      setPickupSuggestions([]);
    } else {
      setDestination(suggestion.description);
      setDestinationSuggestions([]);
    }
    setPanelOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehiclefoundRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(vehiclefoundRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [waitingForDriver]);

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

  useGSAP(() => {
    if (!confirmRidePanelRef.current) return;

    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [confirmRidePanel]);
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  async function findTrip() {
    if (!pickup || !destination) return;

    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);

      const response = await axios.get("http://localhost:4000/rides/getfare", {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setfare(response.data.fare); // 🔥 IMPORTANT
    } catch (error) {
      console.error(
        "Error fetching fare:",
        error.response?.data || error.message,
      );
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        "http://localhost:4000/rides/create",
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("Ride created:", response.data);
    } catch (error) {
      console.error(
        "Error creating ride:",
        error.response?.data || error.message,
      );
    }
  }

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
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("pickup");
                  }}
                  value={pickup}
                  onChange={handlePickupChange}
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
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("destination");
                  }}
                  value={destination}
                  onChange={handleDestinationChange}
                  className="bg-gray-100 border border-transparent pl-12 pr-4 py-4 text-[15px] rounded-lg w-full transition-all duration-200 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-400"
                  type="text"
                  placeholder="Where to?"
                />
              </div>
            </div>
          </form>
          <button
            onClick={findTrip}
            disabled={!pickup || !destination}
            className={`w-full mt-5 text-lg font-semibold py-4 rounded-2xl transition-all duration-300
    ${
      pickup && destination
        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-md hover:shadow-xl active:scale-95"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
          >
            Find Trip
          </button>
        </div>

        {/* Expandable Panel */}
        <div
          ref={panelRef}
          className="h-0 bg-white pointer-events-auto overflow-hidden"
        >
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanelOpen}
            pickupSuggestions={pickupSuggestions}
            destinationSuggestions={destinationSuggestions}
            activeField={activeField}
            isFetchingSuggestions={isFetchingSuggestions}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      {/* Vehicle Selection Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 pt-14 pb-3 translate-y-full"
      >
        {/*        
        <VehiclePanel
          setVehiclePanel={setVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
          // selectVehicle={setVehicleType}
          setVehicle={setVehicleType}
          fare={fare}
          setSelectedVehicle={setSelectedVehicle}
        /> */}
        <VehiclePanel
          setVehiclePanel={setVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicle={setVehicleType} // ✅ correct
          fare={fare}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>

      {/* Confirm Vehicle Selection Panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 pb-3 translate-y-full"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      {/* wait for Driver Panel */}
      <div
        ref={vehiclefoundRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 pb-3 translate-y-full"
      >
        <LookingForDriver
          setVehiclePanel={setVehiclePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 pt-12 pb-3"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
