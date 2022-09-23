// NextJS & React imports
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

// Domestic Imports

// Props interface


const Gallery = (props: any) => {
  return (
    <div className="container px-5 lg:px-20 mx-auto py-5">
      <div className="columns-3">
        {props.children}
      </div>
    </div>
  );
};

export default Gallery;
