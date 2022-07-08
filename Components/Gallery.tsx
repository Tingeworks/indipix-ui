import { useEffect, useState } from "react";
import Images from "./Images";

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
    <div className="container max-w-7xl mx-auto py-10 ">
      <div className="columns-3">
        {gallery.map((image) => (
          <Images
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
