import Layout from "../../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../../CONFIG";

export default function Collection({ loggedIn }: any) {
  return <Layout isLoggedIn={loggedIn}>
    {/* Work from here */}
    <h1></h1>
  </Layout>;
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

  const ProductResponse = await fetch(`${CONFIG.API_URL}/product/`);
  const ProductData = await ProductResponse.json();

  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        products: ProductData || [],
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        products: ProductData || [],
        user: data,
      },
    };
  }
}
