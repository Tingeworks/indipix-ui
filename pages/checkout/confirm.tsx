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
            <div className="flex gap-10 items-center">
              <div className="flex-1">
                <img src="https://source.unsplash.com/random/600x400" alt="" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Planet earth at night</h2>
                <p className="text-sm opacity-60">PHOTO ID: 01413676946</p>
              </div>
            </div>
            <div className="flex gap-10 items-center mt-10">
              <div className="flex-1">
                <h3 className="font-bold text-xl uppercase mb-5">
                  Image Format
                </h3>

                <div
                  onClick={() => setImageFormat(0)}
                  className="flex items-center gap-2 mb-5 cursor-pointer"
                >
                  <span
                    className={`w-5 h-5 inline-block p-1 border-4 rounded-full ${
                      imageformat == 0 && "bg-[#EA6940]"
                    } border-[#EA6940]`}
                  ></span>
                  LARGE (6000 x 3750 px)
                </div>

                <div
                  onClick={() => setImageFormat(1)}
                  className="flex items-center gap-2 mb-5 cursor-pointer"
                >
                  <span
                    className={`w-5 h-5 inline-block p-1 border-4 rounded-full ${
                      imageformat == 1 && "bg-[#EA6940]"
                    } border-[#EA6940]`}
                  ></span>
                  MEDIUM (1000 x 625 px)
                </div>

                <div
                  onClick={() => setImageFormat(2)}
                  className="flex items-center gap-2 mb-5 cursor-pointer"
                >
                  <span
                    className={`w-5 h-5 inline-block p-1 border-4 rounded-full ${
                      imageformat == 2 && "bg-[#EA6940]"
                    } border-[#EA6940]`}
                  ></span>
                  SMALL (500 x 313 px)
                </div>
              </div>

              <div className="flex-1">
                <div
                  onClick={() => setSubscription(0)}
                  className="flex justify-between mb-5"
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
                  className="flex justify-between mb-5"
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
                  className="flex justify-between mb-5"
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
              <button className=" hover:bg-black uppercase bg-[#EA6940] text-white px-5 py-1 font-bold text-xl rounded-full">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
