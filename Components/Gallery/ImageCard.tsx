import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaLink, FaTrash } from "react-icons/fa";
import Button from "../Form/Button";

interface Images {
  id: any;
  name: string;
  imageURL: string;
  inWishList: boolean;
}

const ImageCard = ({ id, imageURL, name, inWishList }: Images) => {
  const [layoutStatus, setlayoutStatus] = useState(false);
  const [wishlistIncludeStatus, setWishlistIncludeStatus] = useState(false);

  const deleteFromWishList = (id: string) => {
    alert("Removed");

    // Your code here
  };

  return (
    // <Link href={`/imgs/${id}`}>
    <div
      onMouseLeave={() => setlayoutStatus(false)}
      onMouseEnter={() => setlayoutStatus(true)}
      className={`w-full relative ${
        layoutStatus ? "scale-95" : ""
      } transition-all select-none`}>
      <img
        onClick={() => setlayoutStatus(!layoutStatus)}
        title={name}
        className="w-full h-auto mb-3 cursor-pointer  rounded-lg"
        src={imageURL}
        alt={name}
      />

      <div
        onClick={() => setlayoutStatus(true)}
        className={`${
          layoutStatus ? "z-0 opacity-100" : "-z-10 opacity-0"
        } transition-opacity py-3 px-5 absolute gap-3 left-0 right-0 bottom-0 bg-[#ffffff75] flex items-center justify-between rounded-full m-2`}>
        {!inWishList ? (
          <FaHeart
            onClick={() => setWishlistIncludeStatus(!wishlistIncludeStatus)}
            className={`text-2xl ${
              wishlistIncludeStatus ? "text-red-700" : "text-white"
            } `}
          />
        ) : (
          <FaTrash
            onClick={() => deleteFromWishList(id)}
            className={`text-2xl ${
              wishlistIncludeStatus ? "text-red-700" : "text-white"
            } `}
          />
        )}

        <Button
          className="rounded-full px-5 py-1"
          Label="Visit"
          style="Primary"
          type="button"
          url={`/imgs/${id}`}
        />
      </div>
    </div>
    // </Link>
  );
};

export default ImageCard;
