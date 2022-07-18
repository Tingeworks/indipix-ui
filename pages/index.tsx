// NextJS & React imports
import type { NextPage } from "next";

// Third Party imports

// Domestic imports
import SEO from "../Components/Misc/SEO";
import Layout from "../Components/Layout/Layout";
import Banner from "../Components/Banner";
import Button from "../Components/Form/Button";
import { FaSearch } from "react-icons/fa";

/** Home page */
const Home: NextPage = () => {
  return (
    <Layout isLoggedIn={false}>
      <SEO title="Indipix" description="" keywords="" />
      <Banner />
      <Button style="Primary" Label="Submit" type="submit" />
      <br />
      <Button style="Primary"  icon={<FaSearch />} Label="Search" type="button" />
      <br />
      <Button style="Secondary" Label="Search" type="button" />
      <br />
      <Button style="Warning" Label="Search" type="button" className=" mx-6 my-3  text-2xl px-10" />
    </Layout>
  );
};

export default Home;
