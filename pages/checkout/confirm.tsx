import { url } from "inspector";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import { useState } from "react";
import Button from "../../Components/Form/Button";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Confirm(props: any) {
  const [imageformat, setImageFormat] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const router = useRouter();

  return (
    <Layout isLoggedIn={true}>
      <SEO
        title="Indipix Subscriptions"
        description="Indipix Subscriptions"
        keywords="indipix, subscriptions"
      />
      <div className="container mx-auto px-5 lg:px-20 mt-12">
        <div className="lg:w-1/2">
          <h1 className="text-6xl font-bold mb-10">Almost done</h1>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: router.query.secret as string,
            }}
          >
            <form>
              <PaymentElement />
              <Button
                className="mt-10"
                Label="Confirm"
                style="Primary"
                type="submit"
                icon={<FaCheck />}
              />
            </form>
          </Elements>
        </div>
      </div>
    </Layout>
  );
}
