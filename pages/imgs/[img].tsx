// NextJS & React imports
import type { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Modal, Text } from "@nextui-org/react";
import { BsWhatsapp, BsFacebook, BsTwitter } from "react-icons/bs";
// Third Party imports
import ReactMarkdown from "react-markdown";
// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import Gallery from "../../Components/Gallery/Gallery";
import SearchBox from "../../Components/Form/SearchBox";
import { FaSearchPlus } from "react-icons/fa";
import Link from "next/link";
import CONFIG from "../../CONFIG";

/** Image page */
const Image: NextPage<{ product: any, products: any }> = ({ product, products }) => {
  // console.log(product);

  const router = useRouter();
  const { img } = router.query;

  const getAccessToken = () => {
    if (typeof window !== "undefined") return localStorage.getItem("token");
  };

  // share functionality
  const [isModalShow, setModalShow] = useState(false);
  const closeHandler = () => {
    setModalShow(!isModalShow);
  };
  const clickToCopyPath = (id: any) => {
    if (typeof document !== "undefined") {
      let url = document.location.href;
      navigator.clipboard.writeText(url);
      alert("URL Copped");
    }
  };
  // share functionality end

  // save functionality start
  const [isSave, setIsSave] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const handleSave = () => {
    setIsSave(!isSave);
    // alert(img);
  };
  // save functionality end

  return (
    <Layout isLoggedIn={getAccessToken() !== "" || undefined ? true : false}>
      <SEO
        title={`Indipix | ${product.attributes.title}`}
        description=""
        keywords=""
      />
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
              src={`${CONFIG.ROOT_URL}${product.attributes.thumbnail.data.attributes.url}`}
              alt={product.attributes.title}
            />
            {/* <FaSearchPlus className="text-white text-2xl drop-shadow-lg absolute bottom-0 right-0 m-5" /> */}
          </div>
          <div className="mt-5 flex gap-5">
            <button
              onClick={() => handleSave()}
              className="rounded-full text-xs font-bold border-[#F87C52] border-4 px-8 py-0.5 uppercase"
            >
              {isSave ? "Saved" : "Save"}
            </button>
            {/* <button className="rounded-full text-xs font-bold  border-[#F87C52] border-4 px-8 py-0.5 uppercase">
              Try
            </button> */}
            <button
              onClick={() => closeHandler()}
              className="rounded-full text-xs font-bold border-[#F87C52] border-4 px-8 py-0.5 uppercase"
            >
              Share
            </button>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.attributes.title}</h1>
          <p className="text-slate-400 text-xs my-5">
            {/* PHOTO ID- {product[0].productPlaceHolder.slice(0, -4)} */}
          </p>
          <div className="my-5 opacity-80 markdown">
            <ReactMarkdown>{product.attributes.description}</ReactMarkdown>
          </div>

          <h5 className="text-3xl font-bold text-orange-600">
            {product.attributes.price} INR
          </h5>

          <Link href={`/checkout/select?id=${img}`}>
            <button className="rounded-sm hover:bg-black hover:border-black text-xs mt-5 py-5 font-bold border-[#F87C52] text-white bg-[#F87C52] border-4 px-20 uppercase">
              Download
            </button>
          </Link>
        </div>
      </div>

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

      {/* popup */}
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={isModalShow}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h2 className="font-bold text-[20px]">Share </h2>
        </Modal.Header>
        <Modal.Body>
          <div className="flex pb-5 gap-10 items-center justify-center">
            <div onClick={() => clickToCopyPath("facebook")}>
              <BsFacebook size="35px" color="#4267B2" />
            </div>
            <div onClick={() => clickToCopyPath("whatsup")}>
              <BsWhatsapp size="35px" color="#4FCE5D" />
            </div>
            <div onClick={() => clickToCopyPath("twitter")}>
              <BsTwitter size="35px" color="#00acee" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* popup */}
    </Layout>
  );
};

const qs = require("qs") 

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.img as string;
  const ProductResponse = await fetch(
    `${CONFIG.API_URL}/products/${id}?populate=*`
  );
  const ProductData = await ProductResponse.json();

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

  return {
    props: {
      product: ProductData.data,
      products: productsData.data
    },
  };
};

export default Image;
