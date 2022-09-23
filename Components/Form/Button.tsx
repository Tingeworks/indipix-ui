// Core Library Imports
import Link from "next/link";
import React from "react";

// Interface
interface ButtonProps {
  icon?: React.ReactNode;
  Label: string;
  type: "submit" | "button" | "reset";
  style: "Primary" | "Secondary" | "Danger" | "Warning";
  url?: string;
  className?: string;
  onClick?: Function;
}

/** Textfield in the banner component */
const Button: React.FC<ButtonProps> = (props) => (
  <>
    {!props.url ? (
      <button
        onClick={() => props.onClick}
        type={props.type}
        className={`
        ${props.style == "Primary" && " bg-red-700 text-white hover:bg-black "}
        ${
          props.style == "Secondary" &&
          "bg-gray-200 text-gray-500 hover:bg-gray-300 "
        }
        ${
          props.style == "Danger" &&
          "bg-red-500 text-gray-500 hover:bg-gray-300 "
        }
        ${
          props.style == "Warning" &&
          " bg-orange-500 text-white hover:bg-black "
        } 
        ${props.className !== null && props.className}
         px-2 py-2 rounded ${
           props.icon !== null ? "flex items-center justify-center" : ""
         }`}
      >
        {props.icon !== undefined ? (
          <span className="pr-2">{props.icon}</span>
        ) : (
          ""
        )}
        <span>{props.Label}</span>
      </button>
    ) : (
      <Link href={props.url}>
        <button
          onClick={() => props.onClick}
          type={props.type}
          className={`
      ${props.style == "Primary" && " bg-red-700 text-white hover:bg-black "}
      ${
        props.style == "Secondary" &&
        "bg-gray-200 text-gray-500 hover:bg-gray-300 "
      }
      ${
        props.style == "Danger" && "bg-red-500 text-gray-500 hover:bg-gray-300 "
      }
      ${
        props.style == "Warning" && " bg-orange-500 text-white hover:bg-black "
      } 
      ${props.className !== null && props.className}
       px-2 py-2 rounded ${
         props.icon !== null ? "flex items-center justify-center" : ""
       }`}
        >
          {props.icon !== undefined ? (
            <span className="pr-2">{props.icon}</span>
          ) : (
            ""
          )}
          <span>{props.Label}</span>
        </button>
      </Link>
    )}
  </>
);

export default Button;
