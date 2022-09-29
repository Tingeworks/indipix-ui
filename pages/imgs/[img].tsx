// NextJS & React imports
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

// Third Party imports

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import Gallery from "../../Components/Gallery/Gallery";
import SearchBox from "../../Components/Form/SearchBox";
import { FaSearchPlus } from "react-icons/fa";
import Link from "next/link";
import CONFIG from "../../CONFIG";

/** Image page */
const Image: NextPage<{product: any}> = ({product}) => {
  const router = useRouter();
  const { img } = router.query;

  const getAccessToken = () => {
    if (typeof window !== "undefined") return localStorage.getItem("token");
  };

  return (
    <Layout isLoggedIn={getAccessToken() !== "" || undefined ? true : false}>
      <SEO title={`Indipix | ${img}`} description="" keywords="" />
      <div className="py-5" style={{ backgroundImage: "url(/banner.png)" }}>
        <div className="container mx-auto px-5 lg:px-20">
          <SearchBox className="bg-white" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 container mx-auto px-5 lg:px-20 my-10 items-start">
        <div className="flex-1 w-full">
          <div className="relative cursor-pointer">
            <img
              className="w-full"
              src={`${CONFIG.API_URL}/product/image/${product[0].productPlaceHolder}`}
              alt=""
            />
            <FaSearchPlus className="text-white text-2xl drop-shadow-lg absolute bottom-0 right-0 m-5" />
          </div>
          <div className="mt-5 flex gap-5">
            <button className="rounded-full text-xs font-bold border-[#F87C52] border-4 px-8 py-0.5 uppercase">
              Save
            </button>
            <button className="rounded-full text-xs font-bold  border-[#F87C52] border-4 px-8 py-0.5 uppercase">
              Try
            </button>
            <button className="rounded-full text-xs font-bold border-[#F87C52] border-4 px-8 py-0.5 uppercase">
              Share
            </button>
            <Link href={`/checkout/select?id=${img}`}>
              <button className="rounded-full hover:bg-black hover:border-black text-xs font-bold border-[#F87C52] text-white bg-[#F87C52] border-4 px-8 py-0.5 uppercase">
                Download
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {product[0].title}
          </h1>
          <p className="text-slate-400 text-xs my-5">PHOTO ID- {product[0].productPlaceHolder.slice(0, -4)}</p>
          <p className="text-sm">
            {product[0].description}
          </p>
          <p className="font-bold mt-2 text-lg">Rs. {product[0].price}</p>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.img as string

  const ProductResponse = await fetch(`${CONFIG.API_URL}/product/${id}`);
  const ProductData = await ProductResponse.json();

  return {
    props: {
      product: ProductData
    },
  };
};

export default Image;
