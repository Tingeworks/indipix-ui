// Core Library Imports
import React from "react";
import SearchBox from "./Form/SearchBox";

const Banner: React.FC<any> = (props) => {
  console.log(props.tags)

  return (
    <div
      style={{
        backgroundImage: "url(/banner.png)",
        height: "85vh",
      }}
      className="bg-cover bg-no-repeat bg-center"
    >
      <div className="flex items-center h-full container mx-auto px-5 lg:px-20">
        <div className="w-1/2">
          <h1 className="text-white font-bold text-5xl mb-8 capitalize">
            India&apos;s Largest collection of stock images
          </h1>
          <SearchBox className="bg-white" />
          <ul className="flex mt-10">
            {props.tags.data.map((item : any, index: number) => (
              <li key={index}>
                <a className="cursor-pointer px-8 text-xs rounded-full py-1.5 text-white bg-[#ffffff6c] mr-3">
                  {item.attributes.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
