import React from "react";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to="/home" className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-4 right-4 shadow-lg cursor-pointer z-50">
            <i class=" text-lg font-bold ri-home-2-line"></i>
        </Link>
      {/* ================= MAP SECTION ================= */}
      <div className="h-[55%] relative">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* ================= BOTTOM CARD ================= */}
      <div className="h-[45%] bg-white rounded-t-3xl shadow-xl px-6 py-5 flex flex-col justify-between">
        {/* Driver Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="h-12"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt="car"
            />
          </div>

          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-900">Sarthak</h2>
            <h3 className="text-xl font-bold text-gray-800">MP04 AB 1234</h3>
            <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Pickup */}
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-2-fill text-lg text-black"></i>
          <div>
            <h3 className="font-medium text-gray-900">562/11-A</h3>
            <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Fare */}
        <div className="flex items-center gap-3">
          <i className="ri-currency-line text-lg text-black"></i>
          <div>
            <h3 className="font-semibold text-gray-900">₹193.20</h3>
            <p className="text-sm text-gray-500">Cash Cash</p>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg mt-5 transition">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
