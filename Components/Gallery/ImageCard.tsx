import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaLink } from "react-icons/fa";
import Button from "../Form/Button";

interface Images {
  id: string;
  name: string;
  imageURL: string;
}

const ImageCard = ({ id, imageURL, name }: Images) => {
  const [layoutStatus, setlayoutStatus] = useState(false);
  const [wishlistIncludeStatus, setWishlistIncludeStatus] = useState(false);

  return (
    // <Link href={`/imgs/${id}`}>
    <div
      onMouseLeave={() => setlayoutStatus(false)}
      onMouseEnter={() => setlayoutStatus(true)}
      className={`w-full relative ${
        layoutStatus ? "scale-95" : ""
      } transition-all select-none`}
    >
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
        } transition-opacity py-3 px-5 absolute gap-3 left-0 right-0 bottom-0 bg-[#ffffff75] flex items-center justify-between rounded-full m-2`}
      >
        <FaHeart
          onClick={() => setWishlistIncludeStatus(!wishlistIncludeStatus)}
          className={`text-2xl ${
            wishlistIncludeStatus ? "text-red-700" : "text-white"
          } `}
        />
        {/* <Link href={`/imgs/${id}`}> */}
        <Button
          className="rounded-full px-5 py-1"
          Label="Visit"
          style="Primary"
          type="button"
          url={`/imgs/${id}`}
        />
        {/* </Link> */}
      </div>
    </div>
    // </Link>
  );
};

export default ImageCard;
