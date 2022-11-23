import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
import SearchBox from "../../Components/Form/SearchBox";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import PhotoCard from "../../Components/PhotoCard/PhotoCard";
import { Grid, Pagination } from "@nextui-org/react";

export default function Categories({ categories }: any) {
  return (
    <Layout isLoggedIn={false}>
      <SEO
        title="Indipix | Categories"
        description="Indipix categories"
        keywords="Indipix, categories"
      />
      <div className="bg-[#EA6940]" style={{ height: "90vh" }}>
        <div className="flex items-center justify-center -translate-x-1/12 overflow-x-hidden pt-10">
          {[1, 2, 3, 2, 1].map((item) => (
            <img
              className={`mx-3 border-8 border-white ${
                item == 1 && `scale-75`
              } ${item == 2 && `scale-90`} ${item == 3 && `scale-100`}`}
              key={item}
              src={`https://source.unsplash.com/random/300x400/?sig=${item}`}
            />
          ))}
        </div>
        <h1 className="text-center text-4xl font-bold text-white mt-5 uppercase">
          Explore our collections
        </h1>
      </div>

      <div className="container mx-auto px-5 lg:px-20">
        <div className="mt-[50px] mb-[75px]">
          <SearchBox className="bg-[#C1BBBB9E] text-black" />
        </div>
      </div>
      <div className="pl-5 lg:pl-20">
        {/* category card start */}
        <div className="mb-[50px]">
          <h2 className="text-[32px] mb-[30px] text-black font-bold">
            TOP CATEGORIES
          </h2>
          {/* <CategoryCarousel data={categoryCarousel} /> */}
        </div>

        {/* category by pagination start */}
        {/* <Grid.Container className="mb-[60px] mt-10"> */}
        {/* <div className="container flex mx-auto flex-wrap gap-5 items-start"> */}
        <Gallery>
          {categories.data.map((item: any) => (
            <Link key={item.id} href={`/categories/${item.id}`}>
              <div className="relative">
                <img
                  className=" hover:scale-105 transition-transform rounded-sm active:scale-90 mb-3"
                  src={`${CONFIG.ROOT_URL}${item.attributes.thumbnail.data.attributes.url}`}
                />
                <span className="absolute top-0 left-0 flex items-center justify-center right-0 bottom-0 text-white bg-[#00000063] opacity-0 hover:opacity-100 transition-opacity cursor-pointer">{`${item.attributes.title}`}</span>
              </div>
            </Link>
          ))}
        </Gallery>
        {/* </Grid.Container> */}
        {/* category by pagination end */}
        <div className="pt-10 mb-20  flex justify-center">
          <Pagination
            total={categories.meta.pagination.pageCount}
            initialPage={1}
          />
        </div>
        {/* category card end */}
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
      sort: ["views:desc"],
      pagination: {
        page: 1,
        pageSize: 6,
      },
      populate: "*",
    });
    const categoriesResponse = await fetch(
      `${CONFIG.API_URL}/categories?${categoryQuery}`,
      {
        method: "GET",
      }
    );
    const categoriesData = await categoriesResponse.json();

    console.log(categoriesData.data[0].attributes.thumbnail);
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
        categories: categoriesData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
