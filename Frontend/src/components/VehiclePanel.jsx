import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
          
        }}
      >
        <i className="ri-arrow-down-s-line text-xl text-gray-400"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      <div className="space-y-3">

        {/* UberGo */}
        <div
          onClick={() => {
            props.setSelectedVehicle("uberGo");
            props.setConfirmRidePanel(true);
            props.setVehicle('car');
          }}
          className="flex items-center justify-between p-3 border-2 active:border-black rounded-lg bg-white cursor-pointer"
        >
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
            <p className="text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>

          <h2 className="text-lg font-semibold">
           ₹{props.fare?.car?.toLocaleString("en-IN")}
          </h2>
        </div>

        {/* Moto */}
        <div
          onClick={() => {
            props.setSelectedVehicle("moto");
            props.setConfirmRidePanel(true);
            props.setVehicle('moto');
          }}
          className="flex items-center justify-between p-3 border-2 active:border-black rounded-lg bg-white cursor-pointer"
        >
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

          <h2 className="text-lg font-semibold">
            ₹{props.fare?.moto?.toLocaleString("en-IN")}
          </h2>
        </div>

        {/* UberAuto */}
        <div
          onClick={() => {
            props.setSelectedVehicle("uberAuto");
            props.setConfirmRidePanel(true);
            props.setVehicle('auto');
          }}
          className="flex items-center justify-between p-3 border-2 active:border-black rounded-lg bg-white cursor-pointer"
        >
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
            <p className="text-xs text-gray-600">
              Affordable auto rides
            </p>
          </div>

          <h2 className="text-lg font-semibold">
            ₹{props.fare?.auto?.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>
    </div>
  );
};

export default VehiclePanel;