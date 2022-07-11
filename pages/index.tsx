// NextJS & React imports
import type { NextPage } from "next";

// Third Party imports

// Domestic imports
import SEO from "../components/Misc/SEO";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Banner";

/** Home page */
const Home: NextPage = () => {
  return (
    <Layout>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
    </Layout>
  );
};

export default Home;
