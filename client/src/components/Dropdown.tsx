import React, { useState } from 'react';

type City = {
  name: string;
  latitude: string;
  longitude: string;
};

type DropdownProps = {
  cities: City[];
  onSelect: (cityName: string) => void;
  selectedCity: string | null;
};

const Dropdown: React.FC<DropdownProps> = ({ cities, onSelect, selectedCity }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage dropdown visibility

  const handleSelect = (cityName: string) => {
    onSelect(cityName);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative w-64">
      <label id="city-select-label" className="block text-sm font-medium text-gray-900">
        Select a city:
      </label>

      <button
        type="button"
        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen} // Reflects the dropdown state
        aria-labelledby="city-select-label"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">{selectedCity || 'Choose a city'}</span>
        </span>
        <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06 0L10 10.91l3.72-3.7a.75.75 0 0 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.23 8.27a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          role="listbox"
          aria-labelledby="city-select-label"
        >
          {cities.map((city) => (
            <li
              key={city.name}
              className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              role="option"
              onClick={() => handleSelect(city.name)} // Call the select handler
            >
              <span className="ml-3 block truncate">{city.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
