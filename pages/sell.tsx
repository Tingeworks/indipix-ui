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
        className="flex bg-cover items-center justify-center relative"
        style={{
          height: "90vh",
          backgroundImage: "url(/seller-landing-page.png)",
        }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000025] flex items-center justify-center">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-4xl font-bold text-red-700">
              Capture and Earn
            </h1>
            <p className="text-white text-xl">
              Take great pictures and sell them on indipix
            </p>
            <p className="mt-5 text-3xl capitalize font-semibold text-white">
              Indipix Update 2.0 is coming soon
            </p>
            {/* {loggedIn ? (
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
          )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cookies = nookies.get(context);
    const response = await fetch(`${CONFIG.API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    console.log(response.status);
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
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
