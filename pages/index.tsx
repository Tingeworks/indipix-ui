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

/** Home page */
const Home: NextPage = () => {
  const cookies = parseCookies();
  return (
    <Layout isLoggedIn={cookies.jwt ? true : false}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
      {/* <Gallery /> */}
    </Layout>
  );
};



export default Home;
