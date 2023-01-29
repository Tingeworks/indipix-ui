// Core Library Imports
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CONFIG from "../CONFIG";
import SearchBox from "./Form/SearchBox";

const Banner: React.FC<any> = (props) => {
  const [image, setImage] = useState();
  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(
        Math.random() * props.featured.meta.pagination.total
      );
      setImage(
        props.featured.data[randomNumber].attributes.image.data.attributes.url
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeaderOpacity(0);

    const timer1 = setTimeout(() => {
      setHeaderOpacity(1);
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [image]);

  return (
    <div>
      <div
        style={{
          height: "90vh",
        }}
        className="relative w-screen items-center justify-center overflow-hidden bg-black"
      >
        <div className="flex items-center justify-center h-full px-5 lg:px-20 absolute z-20 bg-transparent w-full">
          <div className="w-1/2  text-center">
            <h1 className="text-white font-bold text-5xl capitalize">
              India&apos;s largest collection of stock images
            </h1>
            <p className="text-white text-2xl my-5">Start exploring now!</p>
            <SearchBox className="bg-[#ffffff44]" />
            <ul className="flex justify-center mt-10">
              {props.tags && props.tags.data.map((item: any, index: number) => (
                <li key={index}>
                  <Link href={`/search?value=${item.attributes.label}`}>
                    <a className="cursor-pointer px-8 text-xs rounded-full py-2 text-white bg-[#EA6940] mr-3">
                      {item.attributes.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{}}
          className="w-screen h-full absolute top-0 left-0 right-0 bottom-0 bg-no-repeat object-cover bg-cover"
        >
          <img
            style={{ transition: "all 1s" }}
            className={`w-full h-full ${
              headerOpacity == 0
                ? "opacity-0 -translate-y-full "
                : "translate-y-0 opacity-100"
            }`}
            src={`${CONFIG.ROOT_URL}${image}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
