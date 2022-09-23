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
import Navbar from "../../Components/Layout/Navbar";

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
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <SEO
        title={`${user.username} is on Indipix`}
        description=""
        keywords=""
      />
      <div className="flex flex-1">
        <div className="bg-[#ea68401a] p-10 w-3/12"></div>
        <div></div>
      </div>
    </>
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
    console.log(userData);
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
