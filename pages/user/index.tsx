// NextJS & React imports
import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";

// Third Party imports
import nookies, { parseCookies } from "nookies";
import axios from "axios";
import moment from "moment";

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";

/** Home page */
const User: NextPage = ({ user }: any) => {
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  useEffect(() => {
    const { jwt } = parseCookies();

    if (jwt) {
      setLoggedInStatus(true);
    }
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <SEO
        title={`${user.username} is on Indipix`}
        description=""
        keywords=""
      />
      <div className="my-20 container px-5 lg:px-10 xl:px-20 mx-auto flex items-center">
        <div className="">
          <img
            className="rounded-full"
            height={200}
            width={200}
            src="https://source.unsplash.com/random/500x500"
          />
        </div>
        <div className="px-0 lg:px-10">
          {/* <h1 className="text-4xl font-bold">{user.name}</h1> */}
          <p className="text-xl">
            <small>@{user.username}</small>
          </p>
          {/* <p>{user.location.state}, {user.location.country}</p> */}
          {/* <p className="mt-5"><span className="pr-3 font-bold">{user.products.length} <span className="text-gray-500 font-normal">products posted</span></span> <span className="text-gray-500 font-medium">Joined on {moment(user.createdAt).format("MMMM Do YYYY")}</span></p> */}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  if (cookies.jwt) {
    const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    const userData = await response.json();
    console.log(userData)
    if (userData.statusCode >= 400) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    } else {
      return {
        props: {
          loggedIn: true,
          user: userData,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
}

export default User;
