import Layout from "../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../CONFIG";
import SEO from "../Components/Misc/SEO";

export default function Price({ loggedIn }: any) {
  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <div className="container">Hello</div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });

  const data = await response.json();

  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        user: data,
      },
    };
  }
}
