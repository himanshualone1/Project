import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 bg-white"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line text-xl text-gray-400"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-4 justify-between flex-col items-center">
        
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="Uber Car"
          className="h-20"
        />

        <div className="w-full space-y-4">

          {/* Pickup Location */}
          <div className="flex items-center gap-4">
            <i className="ri-map-pin-2-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-S</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Panchwati Amravati, station area
              </p>
            </div>
          </div>

          {/* Drop Location */}
          <div className="flex items-center gap-4">
            <i className="ri-map-pin-user-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-S</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Panchwati Amravati, station area
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <i className="ri-money-rupee-circle-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">₹163.43</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Total Fare
              </p>
            </div>
          </div>

        </div>

        <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
