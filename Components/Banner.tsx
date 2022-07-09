import React from "react";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/Images/banner-image.png)",
        //   height: "566px",
        width: "70wh",
      }}
      className="mb-10 bg-cover h-full"
    >
      <div className="flex flex-col items-center md:py-40">
        <div className="text-white text-3xl md:text-7xl font-sans font-semibold leading-snug">
          <h1>Stunning Free images</h1>
          <p>Change the world</p>
        </div>


        
        <div className="flex-col w-4/5 mb-10">
          <div className="flex justify-center items-center w-full mt-6 md:pl-20">

            {/* dropdown starts */}
            <button className="relative flex jutify-center items-center bg-white text-gray-600 rounded-l shadow group h-min">
              <p className="md:p-4 p-1">Images</p>
              <span className="border-r hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>

              <div className=" absolute top-full hidden group-focus:block min-w-full w-max bg-white shadow-md mt-1 rounded">
                <ul className="text-left border rounded">
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    menu list 1
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    menu list 2
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    menu list 3
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 border-b">
                    menu list 4
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100">menu list 5</li>
                </ul>
              </div>
            </button>
            {/* dropdown ends */}

            <form className="w-8/12">
              <div className="">
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block md:p-4 p-1 w-full z-20 text-base text-black bg-white rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:border-l-gray-700 hover:bg-gray-200 dark:focus:border-blue-500"
                    placeholder="Search image"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="text-white md:flex hidden md:visible md:pl-48">
            <h1 className="font-semibold">Tranding: &nbsp;</h1>
            <p>Nature,</p>&nbsp;
            <p>Hill,</p>&nbsp;
            <p>Walpapers,</p>&nbsp;
            <p>Love,</p>&nbsp;
            <p>Life,</p>&nbsp;
            <p>Man,</p>&nbsp;
            <p>Backgrounds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
