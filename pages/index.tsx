// NextJS & React imports
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// Third Party imports
import { FaEnvelope, FaSearch } from "react-icons/fa";
import nookies, { parseCookies } from "nookies";

// Domestic imports
import SEO from "../Components/Misc/SEO";
import Layout from "../Components/Layout/Layout";
import Banner from "../Components/Banner";
import Button from "../Components/Form/Button";
import Input from "../Components/Form/Input";
import Gallery from "../Components/Gallery/Gallery";
import CONFIG from "../CONFIG";
import ImageCard from "../Components/Gallery/ImageCard";
import Image from "next/image";
import Link from "next/link";

/** Home page */
const Home: NextPage = ({ loggedIn, user, products, tags }: any) => {
  // console.log(tags);

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner tags={tags} />
      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">Last Viewed</h2>
        <p className="text-sm">Pick up where you left off</p>
        {products.length != 0 ? (
          <div className="flex mt-4 gap-4">
            {products.map((item: any) => (
              <Link key={item.id} href={`/imgs/${item.id}`}>
                <Image
                  className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-95"
                  src={`${CONFIG.API_URL}/product/image/${item.reduced_40}`}
                  height={200}
                  width={200}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-gray-50 rounded-sm mt-5 text-xl text-gray-500">
            <p>No products added yet</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">Popular images</h2>
        <p className="text-sm">Explore what&apos;s been trending recently</p>
        {products.length != 0 ? (
          <Gallery>
            {products.map((item: any) => (
              <ImageCard
                id={item.id}
                key={item.id}
                name={item.title}
                inWishList={false}
                imageURL={`${CONFIG.API_URL}/product/image/${item.reduced_40}`}
              />
            ))}
          </Gallery>
        ) : (
          <div className="p-10 bg-gray-50 rounded-sm mt-5 text-xl text-gray-500">
            <p>No products added yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

const qs = require("qs");

export async function getServerSideProps(context: any) {
  try {
    const cookies = nookies.get(context);

    const tagsQuery = qs.stringify({
      sort: ["views:desc"],
      pagination: {
        page: 1,
        pageSize: 5,
      },
    });
    const tagsResponse = await fetch(`${CONFIG.API_URL}/tags?${tagsQuery}`, {
      method: "GET",
    });
    const tagsData = await tagsResponse.json();


    const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    const userData = await userResponse.json();

    // const ProductResponse = await fetch(`${CONFIG.API_URL}/product/`);
    // const ProductData = await ProductResponse.json();

    // if (data.statusCode >= 400) {
    //   return {
    //     props: {
    //       loggedIn: false,
    //       products: ProductData || [],
    //       user: {},
    //     },
    //   };
    // } else {
    //   return {
    //     props: {
    //       loggedIn: true,
    //       products: ProductData || [],
    //       user: data,
    //     },
    //   };
    // }

    return {
      props: {
        loggedIn: userResponse.status == 200 ? true : false,
        user: {},
        products: [],
        tags: tagsData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Home;
