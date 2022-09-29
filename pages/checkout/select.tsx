import { url } from "inspector";
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import { useState } from "react";
import Button from "../../Components/Form/Button";
import Link from "next/link";
import CONFIG from "../../CONFIG";

export default function Select({ product }: any) {
  const [imageformat, setImageFormat] = useState(0);
  const [subscription, setSubscription] = useState(0);

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
                    height: "30vh"
                  }}
                  src={`${CONFIG.API_URL}/product/image/${product[0].productPlaceHolder}`}
                  alt={product[0].title}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold"> {product[0].title}</h2>
                <p className="text-slate-400 text-xs my-5">PHOTO ID- {product[0].productPlaceHolder.slice(0, -4)}</p>
              </div>
            </div>
            <div className="flex gap-10 items-center mt-10">
              <div className="flex-1">
                <div
                  onClick={() => setSubscription(0)}
                  className="flex mb-5  gap-10"
                >
                  <div className="flex gap-5 items-center">
                    <span
                      className={`w-5 h-5 inline-block border-4 rounded-full ${
                        subscription == 0 && "bg-[#EA6940]"
                      } border-[#EA6940]`}
                    ></span>

                    <div>
                      <h3 className="font-bold text-xl">10 images</h3>
                      <p>
                        <span className="font-bold">Rs. 200</span> per image
                      </p>
                    </div>
                  </div>

                  <div className="text-2xl">
                    <span className="font-bold">Rs. 2000</span>/mo
                  </div>
                </div>

                <div
                  onClick={() => setSubscription(1)}
                  className="flex gap-10 mb-5"
                >
                  <div className="flex gap-5 items-center">
                    <span
                      className={`w-5 h-5 inline-block border-4 rounded-full ${
                        subscription == 1 && "bg-[#EA6940]"
                      } border-[#EA6940]`}
                    ></span>

                    <div>
                      <h3 className="font-bold text-xl">10 images</h3>
                      <p>
                        <span className="font-bold">Rs. 200</span> per image
                      </p>
                    </div>
                  </div>

                  <div className="text-2xl">
                    <span className="font-bold">Rs. 2000</span>/mo
                  </div>
                </div>

                <div
                  onClick={() => setSubscription(2)}
                  className="flex gap-10 mb-5"
                >
                  <div className="flex gap-5 items-center">
                    <span
                      className={`w-5 h-5 inline-block border-4 rounded-full ${
                        subscription == 2 && "bg-[#EA6940]"
                      } border-[#EA6940]`}
                    ></span>

                    <div>
                      <h3 className="font-bold text-xl">10 images</h3>
                      <p>
                        <span className="font-bold">Rs. 200</span> per image
                      </p>
                    </div>
                  </div>

                  <div className="text-2xl">
                    <span className="font-bold">Rs. 2000</span>/mo
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <Link href="/checkout/confirm">
                <button className=" hover:bg-black uppercase bg-[#EA6940] text-white px-5 py-1 font-bold text-xl rounded-full">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const id = context.query?.id as string;
  console.log(id)
  const ProductResponse = await fetch(`${CONFIG.API_URL}/product/${id}`);
  const ProductData = await ProductResponse.json();
  console.log(ProductData)
  return {
    props: {
      product: ProductData,
    },
  };
};
