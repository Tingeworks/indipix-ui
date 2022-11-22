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
            ? "rounded-t-[11px] px-5 py-3"
            : "rounded-[11px] py-3"
        } flex justify-between items-center cursor-pointer bg-[#FFB649] px-[40px] `}
      >
        <div className="title text-white">{title}</div>
        <div className="">
          {show ? (
            <MdKeyboardArrowUp size={30} color="white" />
          ) : (
            <MdKeyboardArrowDown size={30} color="white" />
          )}
        </div>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } bg-[#ffb64980] rounded-b-[11px] px-10 py-3`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
