import { url } from "inspector";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import { useState, useEffect } from "react";
import Button from "../../Components/Form/Button";
import Link from "next/link";
import CONFIG from "../../CONFIG";
import { parseCookies } from "nookies";

export default function Select({ product }: any) {
  const [imageformat, setImageFormat] = useState(0);
  const [subscription, setSubscription] = useState<number>(0);
  const [data, setData] = useState<any>();

  const cookies = parseCookies();

  useEffect(() => {
    fetch(`${CONFIG.API_URL}/subscription/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
        console.log(data);
      });
  }, []);

  const Subscribe = (id: number) => {
    console.log(id)
    fetch(`${CONFIG.API_URL}/stripepayment/createPaymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        type: "subscription",
        id: id,
      }),
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

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
        }}
      >
        <div className=" container mx-auto px-5 lg:px-10 flex items-center flex-col">
          <h1 className="text-2xl lg:text-4xl font-bold text-center pt-16 lg:px-32">
            Great! Now all you have to do is select your image formats and
            subscription details
          </h1>

          <div className="bg-white border-4 border-black p-10 mt-10 mb-10">
            <div className="flex gap-10 flex-col lg:flex-row items-center">
              <div>
                <img
                  style={{
                    height: "30vh",
                  }}
                  src={`${CONFIG.API_URL}/product/image/${product[0].reduced_40}`}
                  alt={product[0].title}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold"> {product[0].title}</h2>
                <p className="text-slate-400 text-xs my-5">
                  PHOTO ID- {product[0].productPlaceHolder.slice(0, -4)}
                </p>
              </div>
            </div>
            <div className="flex gap-10 items-center mt-10">
              <div className="flex-1">
                {data &&
                  data.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => setSubscription(item.id)}
                      className="flex mb-5  gap-10 cursor-pointer"
                    >
                      <div className="flex gap-5 items-center">
                        <span
                          className={`w-5 h-5 inline-block border-4 rounded-full ${
                            subscription == item.id && "bg-[#EA6940]"
                          } border-[#EA6940]`}
                        ></span>

                        <div>
                          <h3 className="font-bold text-xl">{item.name}</h3>
                          <p>
                            <span className="font-bold">
                              Rs. {item.price / item.downloadable_limit}
                            </span>{" "}
                            per image
                          </p>
                        </div>
                      </div>

                      <div className="text-2xl">
                        <span className="font-bold">Rs. {item.price}</span>/mo
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="text-center mt-5">
              {subscription != undefined ? (
                // <Link
                //   href={`/checkout/confirm?id=${product[0].id}&package=${subscription}`}
                // >
                <button
                  onClick={() => Subscribe(subscription)}
                  className=" hover:bg-black uppercase bg-[#EA6940] text-white px-5 py-1 font-bold text-xl rounded-full"
                >
                  Continue
                </button>
              ) : (
                // </Link>
                <p className="uppercase py-5">Pick a subsciption to continue</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const id = context.query?.id as string;
  console.log(id);
  const ProductResponse = await fetch(`${CONFIG.API_URL}/product/${id}`);
  const ProductData = await ProductResponse.json();
  console.log(ProductData);
  return {
    props: {
      product: ProductData,
    },
  };
};
