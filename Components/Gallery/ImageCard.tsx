import Link from "next/link";

interface Images {
  id: string;
  name: string;
  imageURL: string;
}

const ImageCard = ({ id, imageURL, name }: Images) => {
  return (
    <Link href={`/imgs/${id}`}>
      <img
        title={name}
        className="w-full h-auto mb-3 cursor-pointer hover:scale-95 transition-all"
        src={imageURL}
        alt={name}
      />
    </Link>
  );
};

export default ImageCard;
