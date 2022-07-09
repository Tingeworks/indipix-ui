// NextJS & React imports
import type { NextPage } from "next";

// Third Party imports

// Domestic imports
import SEO from "../Components/SEO";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

/** Home page */
const Home: NextPage = () => {
  return (
    <div>
      <SEO title="Indipix" description="" keywords="" />
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Home;
