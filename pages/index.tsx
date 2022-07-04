// NextJS & React imports
import type { NextPage } from "next";
import Gallery from "../Components/Gallery";

// Third Party imports

// Domestic imports
import { SEO } from "../Components/SEO";

/** Home page */
const Home: NextPage = () => {
  return (
    <div>
      <SEO title="Indipix" description="" />
      <Gallery />
    </div>
  );
};

export default Home;
