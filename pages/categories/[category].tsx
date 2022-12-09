import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
import SearchBox from "../../Components/Form/SearchBox";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import PhotoCard from "../../Components/PhotoCard/PhotoCard";
import { Grid, Pagination } from "@nextui-org/react";

export default function Categories({ category }: any) {
  console.log(category);
  return (
    <Layout isLoggedIn={false}>
      <SEO
        title="Indipix | Categories"
        description="Indipix categories"
        keywords="Indipix, categories"
      />
      <div className="bg-[#EA6940] ">
        <div
          className="flex items-center container mx-auto px-5 lg:px-20"
          style={{ minHeight: "20vh" }}
        >
          <h1 className="text-4xl font-bold text-white mt-5 uppercase">
            EXPLORE  on Indipix
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-20"></div>
      <div className="pl-5 lg:pl-20">
        {/* <Gallery>
          {category.data.attributes.products.data.map((item: any) => (
            <Link key={item.id} href={"/imgs/" + item.id}>
              <img
                className=" hover:scale-105 transition-transform rounded-sm active:scale-90 "
                src={`${CONFIG.ROOT_URL}${item.attributes.thumbnail.data.attributes.url}`}
                // height={item.attributes.thumbnail.data.attributes.height}
                // width={item.attributes.thumbnail.data.attributes.height}
              />
            </Link>
          ))}
        </Gallery> */}
      </div>
    </Layout>
  );
}

const qs = require("qs");
import nookies from "nookies";
import CONFIG from "../../CONFIG";
import Gallery from "../../Components/Gallery/Gallery";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  try {
    const cookies = nookies.get(context);

    const categoryQuery = qs.stringify({
      populate: "*",
      filters: {
        categories: {
          id: {
            $eq: context.params.category
          }
        }
      }
    });
    const productsResponse = await fetch(
      `${CONFIG.API_URL}/products/${context.params.category}?${categoryQuery}`,
      {
        method: "GET",
      }
    );
    const productsData = await productsResponse.json();

    console.log(productsData);

    const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    const userData = await userResponse.json();

    return {
      props: {
        loggedIn: userResponse.status == 200 ? true : false,
        user: {},
        products: productsData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
