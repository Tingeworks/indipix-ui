// NextJS & React imports
import type { NextPage } from "next";

// Third Party imports
import { FaEnvelope, FaSearch } from "react-icons/fa";
import { parseCookies } from "nookies";

// Domestic imports
import SEO from "../Components/Misc/SEO";
import Layout from "../Components/Layout/Layout";
import Banner from "../Components/Banner";
import Button from "../Components/Form/Button";
import Input from "../Components/Form/Input";
import Gallery from "../Components/Gallery/Gallery";
import { useEffect, useState } from "react";

/** Home page */
const Home: NextPage = () => {
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  
  useEffect(()=> {
    const {jwt} = parseCookies();

    if (jwt) {
      setLoggedInStatus(true);
    }
  }, [])

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
      {/* <Gallery /> */}
    </Layout>
  );
};

export default Home;
