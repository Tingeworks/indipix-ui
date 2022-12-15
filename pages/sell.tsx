import Layout from "../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../CONFIG";
import Button from "../Components/Form/Button";
import SEO from "../Components/Misc/SEO";
import Banner from "../Components/Banner";

export default function Sell({ loggedIn }: any) {
  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <div
        className="flex bg-cover items-center justify-center"
        style={{
          height: "80vh",
          backgroundImage: "url(/seller-landing-page.png)",
        }}
      >
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white">Capture and Earn</h1>
          <p className="text-white text-xl">
            Take great pictures and sell them on indipix
          </p>
          {loggedIn ? (
            <Button
              className="px-5 py-3 mt-10"
              Label="Continue"
              style="Primary"
              type="button"
              url="/user/submit"
            />
          ) : (
            <Button
              className="px-5 py-3 mt-10"
              Label="Continue"
              style="Primary"
              type="button"
              url="/auth/login"
            />
          )}
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-20 py-10"></div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  console.log(response.status)
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
        loggedIn: response.status == 200,
        products: ProductData || [],
        user: data,
      },
    };
  }
}
