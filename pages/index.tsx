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



/** Home page */
const Home: NextPage = ({ loggedIn, user }: any) => {
  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
      <div className="container mx-auto px-5 lg:px-20 py-10">
        <h2 className="text-2xl font-black">Last viewed</h2>
        <p className="text-sm">Pick up where you left</p>
        <Gallery />
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

  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        user: {}
      }
    };
  } else {
    return {
      props: {
        loggedIn: true,
        user: data,
      },
    };
  }
}

export default Home;
