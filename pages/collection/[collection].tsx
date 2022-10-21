import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import { useState } from "react";
import { useRouter } from "next/router";
import Gallery from "../../Components/Gallery/Gallery";
import Link from "next/link";
import ImageCard from "../../Components/Gallery/ImageCard";
import SEO from "../../Components/Misc/SEO";


export default function Collection({ loggedIn }: any) {
  const dummyData = [
    { id: 0, pic: "kMRMcUcO81M", title: "New Year" },
    { id: 1, pic: "_6kI0qhmxc4", title: "Work From Home" },
    { id: 2, pic: "aB4BJSZoTTI", title: "World Press Day" },
    { id: 3, pic: "R98l5I6OFQY", title: "Climate Action" },
    { id: 4, pic: "tGTVxeOr_Rs", title: "Team Trees" },
    { id: 5, pic: "3hWg9QKl5k8", title: "Fest" },
  ];

  const router = useRouter();

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO
        title="Collections | Indipix"
        description="Collections"
        keywords="indipix, collections"
      />

      <div className="container mx-auto px-5 lg:px-20 py-10 ">
        <h2 className="text-[35px] lg:text-[42px] font-bold leading-[51px] text-[#464545]">
          Editors Collections
        </h2>
        <p className="text-2xl text-gray-500">
          {dummyData[parseInt(router.query.collection as string)].title}
        </p>
        <Gallery>
          {[
            { id: 0, pic: "kMRMcUcO81M", title: "New Year", res: "500x500" },
            {
              id: 1,
              pic: "_6kI0qhmxc4",
              title: "Work From Home",
              res: "300x800",
            },
            {
              id: 2,
              pic: "aB4BJSZoTTI",
              title: "World Press Day",
              res: "400x300",
            },
            {
              id: 3,
              pic: "R98l5I6OFQY",
              title: "Climate Action",
              res: "900x300",
            },
            { id: 4, pic: "tGTVxeOr_Rs", title: "Team Trees", res: "1200x800" },
            { id: 5, pic: "3hWg9QKl5k8", title: "Fest", res: "700x400" },
            { id: 6, pic: "3hWg9QKl5k8", title: "Fest", res: "800x800" },
          ].map((item, index) => (
            // <Link href={`/collection/${item.id}`} key={item.id}>
            <img
              // inWishList={false}
              key={item.id}
              className="mb-4 rounded-lg hover:scale-95 cursor-pointer transition-transform"
              // name={item.title}
              // id={item.id}
              src={`https://source.unsplash.com/${item.res}/?${
                dummyData[parseInt(router.query.collection as string)].title
              }`}
            />
            // </Link>
          ))}
        </Gallery>
      </div>
    </Layout>
  );
}

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
