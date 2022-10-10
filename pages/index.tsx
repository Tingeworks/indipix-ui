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

/** Home page */
const Home: NextPage = ({ loggedIn, user, products }: any) => {
  console.log(products)
  console.log(process.env.STRIPE_SECRET)
  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">Popular images</h2>
        <p className="text-sm">Explore what&apos;s been trending recently</p>
        {
          products.length != 0 ? <Gallery>
          {products.map((item: any) => (
            <ImageCard
              id={item.id}
              key={item.id}
              name={item.title}
              imageURL={`${CONFIG.API_URL}/product/image/${item.reduced_40}`}
            />
          ))}
        </Gallery>  : 
         <div className="p-10 bg-gray-50 rounded-sm mt-5 text-xl text-gray-500">
          <p>No products added yet</p>
         </div>
        }
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const data = await response.json();

  const ProductResponse = await fetch(`${CONFIG.API_URL}/product/`);
  const ProductData = await ProductResponse.json();
  
  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        products: ProductData || [],
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        products: ProductData || [],
        user: data,
      },
    };
  }
}

export default Home;
