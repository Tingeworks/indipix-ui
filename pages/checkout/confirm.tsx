import { url } from "inspector";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import { useState } from "react";
import Button from "../../Components/Form/Button";

export default function Confirm(props: any) {
  const [imageformat, setImageFormat] = useState(0);
  const [subscription, setSubscription] = useState(0);

  return (
    <Layout isLoggedIn={true}>
      <SEO
        title="Indipix Subscriptions"
        description="Indipix Subscriptions"
        keywords="indipix, subscriptions"
      />
  
    </Layout>
  );
}
