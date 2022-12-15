// NextJS & React imports
import type { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Text } from "@nextui-org/react";
import { BsWhatsapp, BsFacebook, BsTwitter } from "react-icons/bs";
import Link from "next/link";

// Third Party imports
import ReactMarkdown from "react-markdown";
import { FaSearchPlus } from "react-icons/fa";
import nookies, { parseCookies, setCookie } from "nookies";
// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import Gallery from "../../Components/Gallery/Gallery";
import SearchBox from "../../Components/Form/SearchBox";
import CONFIG from "../../CONFIG";
import jwtDecode from "jwt-decode";

/** Image page */
const Image: NextPage<{
  product: any;
  products: any;
  loggedIn: boolean;
  user: any;
}> = ({ product, products, loggedIn, user }) => {
  // console.log(product);
  const cookies = parseCookies();

  const router = useRouter();
  const { img } = router.query;

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
  };
  // save functionality end

  const addToViewed = (userID: number, itemToAddID: number) => {
    fetch(`${CONFIG.API_URL}/users/${userID}?populate=*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
      .then((res) => res.json())
      .then((userdata) => {
        console.log(userdata);
        let viewed = [itemToAddID];

        if (userdata.data.attributes.last_vieweds.length > 0) {
          userdata.data.attributes.last_vieweds.forEach((element: any) => {
            viewed.push(element.id);
          });
        }

        fetch(`${CONFIG.API_URL}/users/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
          body: JSON.stringify({
            data: {
              last_vieweds: viewed,
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      });
  };

  const Download = (id: number) => {
    if (cookies.jwt !== "") {
      fetch(`${CONFIG.API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.credit <= 0) {
            setCookie(null, "redirect_user_to", `/imgs/${id}`, {
              maxAge: 30 * 24 * 60 * 60 * 60 * 60,
              path: "/",
            });
  
            router.push(`/price`);
          }
        });
    } else {
      setCookie(null, "redirect_user_to", `/imgs/${id}`, {
        maxAge: 30 * 24 * 60 * 60 * 60 * 60,
        path: "/",
      });
      router.push("/auth/register");
    }
  };

  useEffect(() => {
    // console.log()
    // addToViewed(jwtDecode(cookies.jwt).id as number, product.id);
  }, []);

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO
        title={`Indipix | ${product !== null && product.attributes.title}`}
        description=""
        keywords=""
      />
      <div
        // onLoad={() => }
        className="py-5"
        style={{ backgroundImage: "url(/banner.png)" }}
      >
        <div className="container mx-auto px-5 lg:px-20">
          <SearchBox className="bg-white" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 container mx-auto px-5 lg:px-20 my-10 items-start">
        <div className="flex-1 w-full">
          <div className="relative cursor-pointer">
            <img
              className="w-full"
              src={`${CONFIG.ROOT_URL}${
                product !== null &&
                product.attributes.thumbnail.data.attributes.url
              }`}
              alt={product !== null && product.attributes.title}
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
          <h1 className="text-2xl font-bold">
            {product !== null && product.attributes.title}
          </h1>
          <p className="text-slate-400 text-xs my-5">
            {/* PHOTO ID- {product[0].productPlaceHolder.slice(0, -4)} */}
          </p>
          <div className="my-5 opacity-80 markdown">
            {/* <ReactMarkdown>{product !== null && product.attributes.description}</ReactMarkdown> */}
          </div>

          <h5 className="text-3xl font-bold text-orange-600">
            {product !== null && product.attributes.price} INR
          </h5>

          {/* <Link href={`/price`}> */}
          {user.credit > 0 ? (
            <button
              onClick={() => alert("Under construction")}
              className="rounded-sm hover:bg-black hover:border-black text-xs mt-5 py-5 font-bold border-[#F87C52] text-white bg-[#F87C52] border-4 px-20 uppercase"
            >
              Download
            </button>
          ) : (
            <button
              onClick={() => Download(product !== null && product.id)}
              className="rounded-sm hover:bg-black hover:border-black text-xs mt-5 py-5 font-bold border-[#F87C52] text-white bg-[#F87C52] border-4 px-20 uppercase"
            >
              Buy
            </button>
          )}

          {/* </Link> */}
        </div>
      </div>

      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">Popular images</h2>
        <p className="text-sm">Explore what&apos;s been trending recently</p>
        {product !== null && products.length != 0 ? (
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

const qs = require("qs");

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.img as string;
  const cookies = nookies.get(context);

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

  const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  return {
    props: {
      loggedIn: userResponse.status == 200,
      product: ProductData.data,
      products: productsData.data,
      user: userData,
    },
  };
};

export default Image;
