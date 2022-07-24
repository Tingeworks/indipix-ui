// Core Library Imports
import React from "react";

// Third Party Imports
import { Field } from "formik";

// Interface
interface InputProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  type?: "password" | "text" | "tel" | "email";
  style?: "light" | "dark" | "outline";
  className?: string;
  margin?: string;
  padding?: string;
  usingFormik?: boolean;
}

/** Textfield in the banner component */
const Input: React.FC<InputProps> = (props) => (
  <div
    className={`flex items-center 
    ${props.style == "outline" && " outline outline-gray-300 "} 
    ${props.className !== null && props.className} 
    `}
  >
    {props.icon !== null && <span className="mr-2">{props.icon}</span>}
    {props.usingFormik == undefined ? (
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        className={`focus:outline-none flex-1 
            ${props.padding !== null && props.padding} 
            ${props.margin !== null && props.margin}`}
        placeholder={props.placeholder}
      />
    ) : (
      <Field
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={`focus:outline-none flex-1 
        bg-transparent
        focus:bg-transparent
        ${props.padding !== null && props.padding} 
        ${props.margin !== null && props.margin}`}
      />
    )}
  </div>
);

export default Input;
