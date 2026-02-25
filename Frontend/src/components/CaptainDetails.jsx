import React  from "react";


const CaptainDetails = () => {
  return (
    <div className="h-full bg-white rounded-t-3xl shadow-xl px-6 py-6 flex flex-col justify-between">
      
      {/* Profile + Earnings */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
          />
          <h2 className="text-lg font-semibold text-gray-900">
            Himanshu Alone
          </h2>
        </div>

        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-900">
            ₹295.20
          </h2>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>

      {/* Stats Box */}
      <div className="bg-gray-100 rounded-xl p-5 mt-6">
        <div className="flex justify-between text-center">

          <div className="flex flex-col items-center gap-2">
            <i className="ri-time-line text-xl text-gray-700"></i>
            <h3 className="font-semibold text-gray-900">10.2</h3>
            <p className="text-xs text-gray-500">Hours Online</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="ri-steering-2-line text-xl text-gray-700"></i>
            <h3 className="font-semibold text-gray-900">10.2</h3>
            <p className="text-xs text-gray-500">Trips</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="ri-money-rupee-circle-line text-xl text-gray-700"></i>
            <h3 className="font-semibold text-gray-900">₹295</h3>
            <p className="text-xs text-gray-500">Earnings</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CaptainDetails;
