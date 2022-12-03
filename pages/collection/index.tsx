import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import ImageCard from "../../Components/Gallery/ImageCard";
import SearchBox from "../../Components/Form/SearchBox";
import Gallery from "../../Components/Gallery/Gallery";
import SEO from "../../Components/Misc/SEO";
import Link from "next/link";
const Carousel = require("react-responsive-carousel").Carousel;
import Slider from "react-slick";
import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
import { useEffect } from "react";
import MotionCard from "../../Components/PhotoCard/MotionCard";

export default function Collection({ loggedIn, collections }: any) {

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO
        title="Indipix | Categories"
        description="Indipix categories"
        keywords="Indipix, categories"
      />
      {/* Work from here */}
      <div className="h-[175px] flex items-center justify-center search-bg">
        <div className="container mx-auto px-5 lg:px-20 py-10">
          <SearchBox className="bg-white" />
        </div>
      </div>
      {loggedIn ? (
        <div className="container mx-auto px-5 lg:px-20 py-10 mt-[20px] lg:mt-[50px]">
          <h2 className="text-[35px] lg:text-[42px] font-bold leading-[51px] text-[#464545] mb-[30px] ">
            MY COLLECTIONS
          </h2>

          {/* <Gallery> */}
          {collections.meta.pagination.total > 0 &&
            collections.data.map((item: any) => (
              <MotionCard key={item.id} item={item} />
            ))}
          {/* </Gallery> */}
          {/* card end */}
        </div>
      ) : (
        <div>
          <div className="container mx-auto px-5 lg:px-20 py-10 mt-[20px] lg:mt-[50px]">
            <h2 className="text-[35px] lg:text-[42px] font-bold leading-[51px] text-[#464545] mb-[30px] ">
              Editors Collections
            </h2>
          </div>
        </div>
      )}
    </Layout>
  );
}

const qs = require("qs");

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  const collectionsQuery = qs.stringify({
    pagination: {
      page: 1,
      pageSize: 5,
    },
    populate: "*",
  });

  const collectionsResponse = await fetch(
    `${CONFIG.API_URL}/collections?${collectionsQuery}`
  );
  const collectionsData = await collectionsResponse.json();
  console.log(collectionsData);
  return {
    props: {
      loggedIn: userResponse.status == 200 ? true : false,
      collections: collectionsData,
    },
  };
}
