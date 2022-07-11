// Core Library Imports
import React from "react";

// Domestic Imports
import TextFieldWithDropdown from "./form/TextFieldWithDropdown";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/Images/banner-image.png)",
        height: "60vh"
      }}
      className="bg-cover bg-no-repeat bg-center"
    >
      <div className="flex items-center  justify-center w-full h-full">
        <div className="flex-col font-bold w-4/5 lg:w-4/5 xl:w-2/5 mb-10">
          <h1 className="text-white text-3xl mb-2">Find the best captures in India from professional lenses</h1>
          <TextFieldWithDropdown />
        </div>
      </div>
    </div>
  );
};

export default Banner;
