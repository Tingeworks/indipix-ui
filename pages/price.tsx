import Layout from "../Components/Layout/Layout";
import nookies from "nookies";
import CONFIG from "../CONFIG";
import SEO from "../Components/Misc/SEO";
import PricingCard from "../Components/PricingCard/PricingCard";

export default function Price({ loggedIn }: any) {
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
          {[{id:1, name: "team", price: 3000, limit: 10}, {id:2, name: "Enterprise", price: 20000, limit: "Custom"}, {id:3, name: "Personal", price: 1000, limit: 5}, {id:4, name: "Studio", price: 5000, limit: 25}].map((item) => (
            <PricingCard favourite={item.id == 1} key={item.id} limit={item.limit} title={item.name} description={"Gain access to the biggest stock library of India"} price={item.price} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });

  const data = await response.json();

  if (data.statusCode >= 400) {
    return {
      props: {
        loggedIn: false,
        user: {},
      },
    };
  } else {
    return {
      props: {
        loggedIn: true,
        user: data,
      },
    };
  }
}
