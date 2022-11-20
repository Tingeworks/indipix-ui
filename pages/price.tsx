import Layout from "../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../CONFIG";
import SEO from "../Components/Misc/SEO";
import PricingCard from "../Components/PricingCard/PricingCard";

export default function Price({ loggedIn, packages }: any) {
  console.log(packages.data);

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Indipix" description="" keywords="" />
      <div className="container bg-[#EA6940] mx-auto px-5 lg:px-20">
        <div className="flex items-end justify-center overflow-x-hidden pt-10">
          {[2, 0.5, 3, 0.5, 2].map((item) => (
            <img
              className={`m-0 ${item == 0.5 && `scale-75`} ${
                item == 2 && `scale-90`
              } ${item == 3 && `scale-100`}`}
              key={item}
              src={`https://source.unsplash.com/random/300x400/?sig=${item}`}
            />
          ))}
        </div>
      </div>

      {/* <div className="-mt-20" style={{ minHeight: "40vh" }}> */}
      <div className="h-full text-center relative -mt-56 z-30 ">
        <div
          className=" pt-48"
          style={{
            backgroundSize: "cover",
            backgroundImage: "url(/blurbackground.png)",
          }}
        ></div>
        <div className="bg-[#AB1C1C]">
          <h1 className="w-4/6 inline-block uppercase text-5xl font-bold text-white z-10 drop-shadow-2xl backdrop-blur-lg px-10">
            GET THE PERFECT DEAL ON IMAGES FOR YOU AND YOUR TEAM
          </h1>
          <p className="text-[#FFFFFF] text-xl">
            Gain access to the biggest stock library of India
          </p>
        </div>

        <div className="p-10  bg-[#AB1C1C] grid grid-cols-4 gap-10">
          {packages.data.map((item: any) => (
            <PricingCard
              key={item.id}
              favourite={item.attributes.recommended}
              limit={item.attributes.limit}
              title={item.attributes.title}
              description={item.attributes.description}
              price={item.attributes.price + " INR/month"}
              buttonLabel={"Subscribe"}
            />
          ))}
          <PricingCard
            favourite={false}
            limit="Custom"
            title="Enterprise"
            description="For large companies and organizations"
            price="Custom"
            buttonLabel="Contact Us"
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const packageResponse = await fetch(`${CONFIG.API_URL}/subscriptions`, {
    method: "GET",
  });
  const packageData = await packageResponse.json();
  console.log(packageData.data);
  return {
    props: {
      packages: packageData,
      loggedIn: true,
    },
  };
}
