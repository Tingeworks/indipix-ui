import React from "react";

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: "url(/Images/banner-image.png)",
    //   height: "566px",
      width: "100wh"
     }}
      className="mb-10 bg-cover h-full">
      <div className="flex flex-col items-center md:py-40">
        <div className="text-white text-2xl md:text-7xl font-sans font-semibold leading-snug">
          <h1>Stunning Free images</h1>
          <p>Change the world</p>
        </div>

        <form className="md:pl-24 w-8/12 md:mt-9 mt-3 mb-5 md:mb-0">
          <div className="flex justify-center ">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Your Email
            </label>
            <button
              className="flex-shrink-0 z-10 inline-flex items-center p-2 md:p-4 text-sm md:text-base font-medium text-center text-black rounded-l-lg hover:bg-gray-200 focus:outline-none focus:ring-gray-100 bg-white border-r-2 border-gray-100"
              type="button"
            >
              Images{" "}
              <svg
                className="ml-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-4 w-full z-20 text-base text-black bg-white rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:border-l-gray-700 hover:bg-gray-200 dark:focus:border-blue-500"
                placeholder="Search image"
                required
              />
            </div>
          </div>
          <div className="text-white md:flex hidden md:visible">
          <h1 className="font-semibold">Tranding: &nbsp;</h1>
          <p>Nature,</p>&nbsp;
          <p>Hill,</p>&nbsp;
          <p>Walpapers,</p>&nbsp;
          <p>Love,</p>&nbsp;
          <p>Life,</p>&nbsp;
          <p>Man,</p>&nbsp;
          <p>Backgrounds</p>
        </div>
        </form>
        
      </div>
    </div>
  );
};

export default Banner;
