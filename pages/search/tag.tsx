// NextJS & React imports
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import nookies, { parseCookies } from "nookies";
import { useRouter } from "next/router";
// Domestic imports
import SEO from "../../Components/Misc/SEO";
import Layout from "../../Components/Layout/Layout";
import Banner from "../../Components/Banner";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Gallery from "../../Components/Gallery/Gallery";
import CONFIG from "../../CONFIG";
import ImageCard from "../../Components/Gallery/ImageCard";
import Link from "next/link";
import SearchBox from "../../Components/Form/SearchBox";

const Tag: NextPage = ({ loggedIn, user, products, RelatedProduct }: any) => {
  const [values, setValues] = useState<any>({});
  const router = useRouter();
  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <div
        // onLoad={() => }
        className="py-5"
        style={{ backgroundImage: "url(/banner.png)" }}
      >
        <div className="container mx-auto px-5 lg:px-20">
          <SearchBox className="bg-white" />
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">{`Search result for ${router.query.value}`}</h2>
        <p className="text-sm">Explore what&apos;s been trending recently</p>
        {products.data.length != 0 ? (
          <Gallery>
            {products.data.map((item: any) => (
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

        <h2 className="text-2xl font-black mt-20">Similar searches</h2>
        <p className="text-sm">People also show interest in these products</p>
        {RelatedProduct.data.length != 0 ? (
          <Gallery>
            {RelatedProduct.data.map((item: any) => (
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
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const data = await response.json();

  const productsQuery = qs.stringify({
    sort: ["views:desc"],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    filters: {
      title: {
        $contains: context.query?.value,
      },
      description: {
        $contains: context.query?.value,
      },
    },
    populate: "*",
  });

  const ProductResponse = await fetch(
    `${CONFIG.API_URL}/products?${productsQuery}`
  );
  const ProductData = await ProductResponse.json();

  const RelatedProductsQuery = qs.stringify({
    sort: ["publishedAt:desc"],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    populate: "*",
  });


  const RelatedProductResponse = await fetch(
    `${CONFIG.API_URL}/products?${RelatedProductsQuery}`
  );
  const RelatedProductData = await RelatedProductResponse.json();

  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        products: ProductData,
        RelatedProduct: RelatedProductData,
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        products: ProductData,
        RelatedProduct: RelatedProductData,
        user: data,
      },
    };
  }
}

export default Tag;
