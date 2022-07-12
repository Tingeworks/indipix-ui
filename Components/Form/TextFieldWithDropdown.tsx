// Core Library Imports
import React from "react";
import { FaSearch } from "react-icons/fa";

/** Textfield in the banner component */
const textFieldWithDropdown: React.FC = () => (
  <div className="w-full flex bg-white py-4 rounded-sm shadow-lg">
    <div className=" text-gray-600 px-4 flex items-center"><FaSearch /></div>
    <input placeholder="Search for images and galleries" type="text" className="focus:outline-none pl-1 flex-1" />
  </div>
);

export default textFieldWithDropdown;
