// NextJS & React imports
import axios from "axios";
import type { NextPage } from "next";

// Third Party imports
import nookies, { parseCookies } from 'nookies'

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";

/** Home page */
const Submit: NextPage = ({user}: any) => {
  const {jwt} = parseCookies();

  return (
    <Layout isLoggedIn={jwt ? true : false}>
      <SEO title="Submit a new photo | Indipix" description="" keywords="" />
    </Layout>
  );
};

export async function getServerSideProps(context:any) {
  const cookies = nookies.get(context);

  const {data} = await axios.get(`${CONFIG.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4NjY2ODMzLCJleHAiOjE2NjEyNTg4MzN9.lUoQ_FSyaI-gzZfH6hJB7xlKutVU_5v0VCxLfWns56c`
    }
  });

  return {
    props: {
      user: data,
    },
  };
}

export default Submit;