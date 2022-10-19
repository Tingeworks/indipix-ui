import React from "react";
import Image from "next/image";
interface support {
  image: string;
  title: string;
  content: string;
}
const Support = ({ image, title, content }: support) => {
  return (
    <div className="md:flex justify-between">
      <img src={image} alt={title} />
      <div>
        <h3 className="text-[#333131] text-[28px] font-bold underline mb-[16px]">
          {title}
        </h3>
        <p className="text-[#333131] text-[16px] leading-[19px]">{content}</p>
      </div>
    </div>
  );
};

export default Support;
