// NextJS & React imports
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

// Domestic Imports

// Props interface
interface Gallery {
  index: number;
  name: string;
  address: string;
  authorImg: string;
  galleryImg: string;
}

const Gallery = () => {
  const [gallery, setGallery] = useState<Gallery[]>([]);

  useEffect(() => {
    fetch("gallery.json")
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);

  return (
    <div className="container px-5 lg:px-10 xl:px-20 mx-auto py-5">
      <div className="columns-3">
        {gallery.map((image) => (
          <ImageCard
            key={image.index}
            name={image.name}
            address={image.address}
            authorImg={image.authorImg}
            galleryImg={image.galleryImg}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
