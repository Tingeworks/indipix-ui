import React from "react";
import Image from "next/image";
const PhotoCard = ({ handleClick, image, category }: any) => {
  console.log(image);

  return (
    <>
      {image ? (
        <div
          onClick={handleClick}
          className="text-center mb-[70px] pr-[10px] cursor-pointer"
        >
          <Image
            src={image}
            objectFit="cover"
            className="hover:scale-105 ease-in duration-300"
            width={350}
            height={270}
          />
          <p className="uppercase font-normal text-[14px] tracking-wider">
            {category}
          </p>
        </div>
      ) : (
        <Image
          src="/placeholder.png"
          objectFit="cover"
          className="hover:scale-105 ease-in duration-300"
          width={350}
          height={270}
        />
      )}
    </>
  );
};

export default PhotoCard;
