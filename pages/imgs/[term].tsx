// NextJS & React imports
import type { NextPage } from "next";
import Gallery from "../../Components/Gallery/Gallery";

// Third Party imports

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";

/** Image page */
const Image: NextPage = () => {
  const getAccessToken = () => {
    if (typeof window !== "undefined")
      return localStorage.getItem("token");
  };

  return (
    <Layout isLoggedIn={getAccessToken() !== '' || undefined ? true : false}>
      <SEO title="Indipix" description="" keywords="" />
      <Gallery />
    </Layout>
  );
};

export default Image;
