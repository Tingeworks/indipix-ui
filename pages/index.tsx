// NextJS & React imports
import type { NextPage } from "next";

// Third Party imports

// Domestic imports
import Banner from "../Components/Banner";
import Gallery from "../Components/Gallery";
import { SEO } from "../Components/SEO";

/** Home page */
const Home: NextPage = () => {
  return (
    <div>
      <SEO title="Indipix" description="" />
      <Banner />
      <Gallery />
    </div>
  );
};

export default Home;
