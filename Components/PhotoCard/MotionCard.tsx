import Link from "next/link";
import CONFIG from "../../CONFIG";
import { useEffect, useState } from "react";

export default function MotionCard({ item }: any) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide + 1);
      console.log("This will run every second!");
    }, 1000);
    return () => {
      setSlide(0);
      clearInterval(interval);
    };
  }, []);

  return (
    <Link key={item.id} href={`/categories/${item.id}`}>
      {/* <Carousel showArrows={true} > */}
      <div className="w-48 overflow-hidden flex">
        {item.attributes.thumbnailGallary.data.map((thumbnail: any) => (
          <img
            style={{
                transform: `translate(${slide * 100}%)`
            }}
            className="object-cover"
            key={thumbnail.id}
            src={`${CONFIG.ROOT_URL}${thumbnail.attributes.url}`}
          />
        ))}
      </div>
      {/* </Carousel> */}
    </Link>
  );
}
