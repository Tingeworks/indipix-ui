// NextJS & React imports
import axios from "axios";
import moment from "moment";
import type { NextPage } from "next";
import Image from "next/image";
import nookies, { parseCookies } from "nookies";

// Third Party imports

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";

/** Home page */
const User: NextPage = () => {
  const cookies = parseCookies();
  
  return (
    <Layout isLoggedIn={ cookies.jwt ? true : false}>
      {/* <SEO title={`${user.username} is on Indipix`} description="" keywords="" /> */}
      {/* <div className="my-20 container px-5 lg:px-10 xl:px-20 mx-auto flex items-center">
        <div className="">
          <img className="rounded-full" height={200} width={200} src="https://source.unsplash.com/random/500x500" />
        </div>
        <div className="px-0 lg:px-10">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-xl"><small>@{user.username}</small></p>
          <p>{user.location.state}, {user.location.country}</p>
          <p className="mt-5"><span className="pr-3 font-bold">{user.products.length} <span className="text-gray-500 font-normal">products posted</span></span> <span className="text-gray-500 font-medium">Joined on {moment(user.createdAt).format("MMMM Do YYYY")}</span></p>
        </div>
      </div> */}
    </Layout>
  );
};

// export async function getServerSideProps(context:any) {
//   // const cookies = nookies.get();

//   // const {data} = await axios.get(`${CONFIG.API_URL}/users/me?populate=*`, {
//   //   headers: {
//   //     Authorization: `Bearer ${cookies.jwt}`
//   //   }
//   // });

//   // console.log(data)

//   // return {
//   //   props: {
//   //     user: data,
//   //   },
//   // };
// }

export default User;
