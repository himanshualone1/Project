import React from "react";

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
  const locations = [
    "Panchavati Karanja, Panchavati, Nashik, Maharashtra 422003, India",
    "College Road, Near Canada Corner, Nashik, Maharashtra 422005, India",
    "Gangapur Road, Thatte Nagar, Nashik, Maharashtra 422005, India",
    "CIDCO Colony, Ambad, Nashik, Maharashtra 422010, India",
    "Dwarka Circle, Mumbai Naka, Nashik, Maharashtra 422001, India",
    "Indira Nagar, Wadala Pathardi Road, Nashik, Maharashtra 422009, India",
    "Trimbak Road, Mahatma Nagar, Nashik, Maharashtra 422007, India",
    "Satpur MIDC, Nashik, Maharashtra 422007, India",
  ];

  return (
    <div className="p-4">
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanel(true);   // ✅ CORRECT
            setPanelOpen(false);
          }}
          className="flex gap-4 border-2 p-3 border-white active:border-gray-100 rounded-xl items-center my-2 cursor-pointer"
        >
          <div className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-line"></i>
          </div>

          <h4 className="font-medium text-sm">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
