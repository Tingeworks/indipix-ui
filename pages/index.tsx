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
const Home: NextPage = ({
  loggedIn,
  products,
  tags,
  featured,
  lastViewed,
}: any) => {
  const cookies = parseCookies();
  const [viewhistoryData, setViewHistoryData] = useState({data: []});

  // console.log(lastViewed)
  useEffect(() => {
    const query = qs.stringify({
      filters: {
        id: {
          $in: lastViewed
        }
      },
      populate: "deep"
    })
    fetch(`${CONFIG.API_URL}/products/?${query}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setViewHistoryData(data);
      });
  }, []);
  // console.log(viewhistoryData);

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner featured={featured} tags={tags} />
      {loggedIn ? viewhistoryData && (
        <>
          <div className="container mx-auto px-5 lg:px-20 my-10">
            <h2 className="text-2xl font-black">Recommendations</h2>
            <p className="text-sm">Based on your previews searches</p>
            <div className="flex mt-10 gap-4">
              {viewhistoryData.data.map((item: any) => (
                <Link key={item.id} href={`/imgs/${item.id}`}>
                  <Image
                    className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-95"
                    src={`${CONFIG.ROOT_URL}${item.attributes.thumbnail.data.attributes.url}`}
                    height={200}
                    width={200}
                  />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : ""}
      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">Popular images</h2>
        <p className="text-sm">Explore what&apos;s been trending recently</p>
        {products.length != 0 ? (
          <Gallery>
            {products.map((item: any) => (
              <Link key={item.id} href={"/imgs/" + item.id}>
                <img
                  className=" hover:scale-105 transition-transform rounded-sm active:scale-90 "
                  src={`${CONFIG.ROOT_URL}${item.attributes.thumbnail.data.attributes.url}`}
                  // height={item.attributes.thumbnail.data.attributes.height}
                  // width={item.attributes.thumbnail.data.attributes.height}
                />
              </Link>
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

  const productsQuery = qs.stringify({
    sort: ["views:desc"],
    pagination: {
      page: 1,
      pageSize: 6,
    },
    populate: "*",
  });

  const productsResponse = await fetch(
    `${CONFIG.API_URL}/products?${productsQuery}`,
    {
      method: "GET",
    }
  );
  const productsData = await productsResponse.json();

  const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  const featuredResponse = await fetch(
    `${CONFIG.API_URL}/special-picks?populate=*`
  );
  const featuredData = await featuredResponse.json();

  const lastViewedProductsResponse = await fetch(
    `${CONFIG.API_URL}/product/lastView/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );

  const lastViewedProductsData = await lastViewedProductsResponse.json();

  return {
    props: {
      loggedIn: userResponse.status == 200 ? true : false,
      featured: featuredData,
      products: productsData.data,
      tags: tagsData,
      lastViewed: userResponse.status == 200 ? lastViewedProductsData.products.map((item: any) => item.id) : [],
    },
  };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Home;
