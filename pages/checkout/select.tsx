import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import { useState, useEffect } from "react";
import Button from "../../Components/Form/Button";
import Link from "next/link";
import CONFIG from "../../CONFIG";
import { parseCookies } from "nookies";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import CheckoutForm from "../../Components/Form/CheckoutForm";

const stripePromise = loadStripe(process.env.STRIPE_SECRET as string);

export default function Select({ packageData }: any) {
  const [imageformat, setImageFormat] = useState(0);
  const [subscription, setSubscription] = useState<number>(0);
  const [data, setData] = useState<any>();
  const cookies = parseCookies();
  const router = useRouter();

  return (
    <Layout isLoggedIn={true}>
      <SEO
        title="Indipix Subscriptions"
        description="Indipix Subscriptions"
        keywords="indipix, subscriptions"
      />
      <div
        style={{
          background: 'url("/background-subscriptions.png")',
          height: "90vh",
        }}
        className="flex items-center w-full justify-center"
      >
        <div className="p-10 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold capitalize">
            Thanks for showing interest in our products
          </h1>
          <p>Please fill up payment details to procceed with the purchase</p>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: router.query.pi as string,
              appearance: {},
            }}
          >
            {/* {router.query.pi} */}
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  console.log(context.query.id);
  const packageResponse = await fetch(
    `${CONFIG.API_URL}/subscriptions/${context.query.id}`
  );
  const packageData = await packageResponse.json();
  console.log(packageData);
  return {
    props: {
      packageData: packageData.data,
    },
  };
};
