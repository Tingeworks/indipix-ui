// Core Library Imports
import React from "react";

// Interface
interface ButtonProps {
    Label: string;
    children: React.ReactNode;
}

/** Textfield in the banner component */
const Button: React.FC <ButtonProps> =(props, { children})=> (
  <button className="border-2 border-gray-200 text-gray-400 rounded-sm px-2 py-2">
    {children} 
    <span>{props.Label}</span>
  </button>
);

export default Button;
