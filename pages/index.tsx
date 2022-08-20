// NextJS & React imports
import type { NextPage } from "next";

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
import { useEffect, useState } from "react";
import CONFIG from "../CONFIG";




interface pageProps {
  loggedIn: boolean
  user: Object
}

/** Home page */
const Home: NextPage<pageProps> = ({ loggedIn, user }) => {
  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
      {/* <Gallery /> */}
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  if (cookies.jwt) {
    const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    const data = await response.json();
    
    if (data.statusCode == 401) {
      return {
        props: {
          loggedIn: false,
          user: {},
        },
      };
    } else {
      return {
        props: {
          loggedIn: true,
          user: data,
        },
      };
    }
  } else {
    return {
      props: {
        loggedIn: false,
        user: {},
      },
    };
  }
}

export default Home;
