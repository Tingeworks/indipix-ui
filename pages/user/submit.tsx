// NextJS & React imports
import type { NextPage } from "next";

// Third Party imports

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";

/** Home page */
const Submit: NextPage = () => {
  return (
    <Layout isLoggedIn={false}>
      <SEO title="Submit a new photo | Indipix" description="" keywords="" />
    </Layout>
  );
};

export default Submit;
