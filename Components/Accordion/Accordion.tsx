import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface accordion {
  title: string;
  content: string;
}

const Accordion = ({ title, content }: accordion) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div onClick={handleClick} className="w-full select-none ">
      <div
        className={`accordion-header  ${
          show
            ? "rounded-t-[11px] pb-[10px] pt-[26px]"
            : "rounded-[11px] py-[26px]"
        } flex justify-between items-center cursor-pointer bg-[#FFB649] px-[40px] `}
      >
        <div className="title">{title}</div>
        <div className="">
          {show ? (
            <MdKeyboardArrowUp size={30} color="#585555" />
          ) : (
            <MdKeyboardArrowDown size={30} color="#585555" />
          )}
        </div>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } bg-[#FFB649] px-[40px] pb-[26px] rounded-b-[11px]`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
