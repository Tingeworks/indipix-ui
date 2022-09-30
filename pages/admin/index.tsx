import { NextPage } from "next";
import Image from "next/image";
import AdminLayout from "../../Components/Layout/AdminLayout";
import nookies from "nookies";
import axios from "axios";
import CONFIG from "../../CONFIG";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaCheck,
  FaClock,
  FaImage,
  FaImages,
  FaUserAlt,
  FaUsersSlash,
} from "react-icons/fa";

const Admin: NextPage = ({ user, loggedIn, totalUsers }: any) => {
  return (
    <>
      <AdminLayout className="flex" isLoggedIn={loggedIn}>
        <div>
          <h1 className="text-3xl font-bold">Hi, Username 👋.</h1>
          <p className="text-gray-400">Welcome back!</p>
        </div>

        <div className="flex flex-wrap gap-5 mt-10 capitalize">
          <div className="flex-1 p-10 bg-pink-600 text-white rounded-sm flex gap-5 items-center">
            <span className="bg-white p-2 px-3 rounded-md text-pink-600 font-bold flex items-center gap-2">
              <FaBell /> 30
            </span>
            Products waiting to be Approved
          </div>
          <div className="flex-1 p-10 bg-blue-600 text-white rounded-sm flex gap-5 items-center">
            <span className="bg-white p-2 px-3 rounded-md text-blue-600 font-bold flex items-center gap-2">
              <FaUserAlt /> 4
            </span>
            Total users {totalUsers.Count}
          </div>
          <div className="flex-1 p-10 bg-green-600 text-white rounded-sm flex gap-5 items-center">
            <span className="bg-white p-2 px-3 rounded-md text-green-600 font-bold flex items-center gap-2">
              <FaImages /> 30
            </span>
            Total Products Approved
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });

  const data = await response.json();

  const userCountResponse = await fetch(`${CONFIG.API_URL}/auth/getusercount`, {
    redirect: "follow",
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userCountData = await userCountResponse.json();

  if (data.statusCode >= 400) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  } else {
    if (data.role == "user") {
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
          totalUsers: userCountData,
          user: data,
        },
      };
    }
  }
}

export default Admin;
