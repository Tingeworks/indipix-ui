import React from "react";
import Head from "next/head";
import PhotoCard from "../PhotoCard/PhotoCard";
import { Loading } from "@nextui-org/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const CategoryCarousel = (data: any) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const handleCategory = ({ id }: any) => {};
  let renderCarousel = "";
  if (data?.data.length) {
    renderCarousel = data?.data.map((item: any, index: any) => {
      return (
        <PhotoCard
          key={index}
          image={item?.url}
          category={item?.category}
          handleClick={() => handleCategory(item?.id)}
        />
      );
    });
  }
  return (
    <div>
      <Slider {...settings}>{renderCarousel}</Slider>
    </div>
  );
};

export default CategoryCarousel;
