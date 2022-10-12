import { url } from "inspector";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import { useState } from "react";
import Button from "../../Components/Form/Button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
import CONFIG from "../../CONFIG";

// const stripePromise = loadStripe(process.env.STRIPE_SECRET as string);

export default function Confirm(props: any) {
  const [imageformat, setImageFormat] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const router = useRouter();

  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const result = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     confirmParams: {
  //       return_url: `${CONFIG.API_URL}/stripepayment/confirm?paymentintent=`
  //     },
  //   });

  //   if (result.error) {
  //     // Show error to your customer (for example, payment details incomplete)
  //     console.log(result.error.message);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }
  // };

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
          {/* <Elements
            stripe={stripePromise}
            options={{
              clientSecret: router.query.secret as string,
            }}
          >
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              <Button
                disabled={!stripe}
                className="mt-10"
                Label="Confirm"
                style="Primary"
                type="submit"
                icon={<FaCheck />}
              />
            </form>
          </Elements> */}
        </div>
      </div>
    </Layout>
  );
}
