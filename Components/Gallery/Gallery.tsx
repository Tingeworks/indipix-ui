// NextJS & React imports
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

// Domestic Imports

// Props interface


const Gallery = (props: any) => {
  return (
    <div className="my-5 gap-5 w-full columns-1 lg:columns-3 xl:columns-4 content-center">
        {props.children}
    </div>
  );
};

export default Gallery;
