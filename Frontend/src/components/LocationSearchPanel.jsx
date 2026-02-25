import React from "react";

const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanel,
  pickupSuggestions = [],
  destinationSuggestions = [],
  activeField = null,
  isFetchingSuggestions = false,
  onSuggestionSelect = () => {},
}) => {
  // Determine which suggestions to display based on the active field
  const suggestions =
    activeField === "pickup" ? pickupSuggestions : destinationSuggestions;

  return (
    <div className="p-4">
      {isFetchingSuggestions && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-gray-900 rounded-full"></div>
          <p className="ml-2 text-gray-600">Fetching suggestions...</p>
        </div>
      )}

      {!isFetchingSuggestions && suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => {
              onSuggestionSelect(suggestion);
              //  setVehiclePanel(false);
              // setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-white active:border-gray-100 rounded-xl items-center my-2 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full flex-shrink-0">
              <i className="ri-map-pin-line"></i>
            </div>

            <h4 className="font-medium text-sm text-gray-800">
              {suggestion.description}
            </h4>
          </div>
        ))
      ) : !isFetchingSuggestions && activeField ? (
        <p className="text-center text-gray-400 py-4">No suggestions found</p>
      ) : (
        <p className="text-center text-gray-400 py-4">
          Start typing to get suggestions
        </p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
