// NextJS & React imports
import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { Dropdown } from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";

import Link from "next/link";

// Third Party imports
import nookies, { parseCookies } from "nookies";
import axios from "axios";
import moment from "moment";

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";
import Navbar from "../../Components/Layout/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/** Home page */
const User: NextPage = ({ user, loggedIn }: any) => {
  const { jwt } = parseCookies();

  const [selected, setSelected] = useState(new Set(["English"]));
  const [downloadData, setDownloadData] = useState({ state: 0, productImage: "" });

  const [panelStatus, setPanelStatus] = useState(true);

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const deleteAccount = (id: number) => {
    const permission = confirm("Are you sure?");

    if (permission == true) {
      fetch(`${CONFIG.API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }).then((res) => {
        console.log(res);
      });
    }
  };

  const download = (id: number) => {
    fetch(`${CONFIG.API_URL}/orders/?productid=1`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDownloadData({ state: 1, ...data });
      });
  };

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO
        title={`${user.username} is on Indipix`}
        description={`${user.username} is on Indipix`}
        keywords={`indipix, indipix ${user.username}`}
      />

      <div className="grid grid-cols-12 flex-1">
        {/* sidebar */}
        <div className="bg-[#B83A3A] col-span-2 min-h-screen px-[18px] pt-5 hidden lg:block">
          <ul>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="/user">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="/user/purchasehistory">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Purchase history
                </span>
              </Link>
            </li>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="/user/collections">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Saved collections
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {/* sidebar */}
        {/* main */}
        <section className="px-10 pt-5 col-span-12 lg:col-span-10">
          <div className="block lg:hidden">
            <ul className="flex justify-between items-end gap-2">
              <Link href="/user">
                <li className="p-2 px-4 bg-red-700 text-white  text-sm self-stretch">
                  Information
                </li>
              </Link>
              <Link href="/user/purchasehistory">
                <li className="p-2  px-4 bg-red-700 text-white text-sm">
                  Purchase History
                </li>
              </Link>
              <Link href="/user/purchasehistory">
                <li className="p-2  px-4 bg-red-700 text-white text-sm">
                  Saved Collections
                </li>
              </Link>
            </ul>
          </div>
          {/* Dashboard */}
          <div className="flex">
            <h2 className="text-[28px] font-bold">Dashboard</h2>
          </div>
          <div className="mb-10 mt-5 flex gap-10">
            <div className="flex gap-5 flex-wrap">
              {user.downloadable_products.map((item: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <img
                    className="w-36 h-36 object-cover"
                    src={`${CONFIG.ROOT_URL}${item.thumbnail.url}`}
                  />
                  {downloadData.state == 0 ? (
                    <a
                      onClick={() => download(item.id)}
                      className="w-full bg-red-700 px-2 text-white py-2 block mt-2 text-center"
                    >
                      Generate Link
                    </a>
                  ) : (
                    <a
                      href={`${CONFIG.ROOT_URL}${downloadData.productImage}`}
                      className="w-full bg-red-700 px-2 text-white py-2 block mt-2 text-center"
                      download
                    >
                      Download
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="w-48">
              <div>
                <h2 className="text-6xl font-bold">
                  {user.credit.toString().length > 1
                    ? user.credit
                    : "0" + user.credit}
                </h2>
                <p className="text-3xl font-bold">
                  Credit{user.credit <= 1 ? "" : "s"}
                </p>
                <p className="leading-tight text-sm">
                  Credits allow you to download new images that you have not
                  added to your account yet.{" "}
                </p>
              </div>
            </div>
          </div>

          {/* user details */}
          <h2 className="text-[28px] font-bold">USER DETAILS</h2>
          <table className=" border-b border-slate table-auto border-separate w-10/12 border-spacing-y-6  text-left">
            <tbody>
              <tr className="mb-5">
                <td>
                  <span className="text-black text-[15px]">Name</span>
                </td>
                <td>
                  <span className="text-[#545252] text-[15px]">
                    {user.name}
                  </span>
                </td>
              </tr>
              <tr className="pb-5">
                <td>
                  <span className="text-black text-[15px]">Password</span>
                </td>
                <td>
                  <span className="text-[#545252] text-[15px]">********</span>
                </td>
              </tr>
              <tr className="pb-5">
                <td>
                  <span className="text-black text-[15px]">User ID</span>
                </td>
                <td>
                  <span className="text-[#545252] text-[15px]">
                    {user.username}
                  </span>
                </td>
              </tr>
              <tr className="pb-5">
                <td>
                  <span className="text-black text-[15px]">
                    Registered email
                  </span>
                </td>
                <td>
                  <span className="text-[#545252] text-[15px]">
                    {user.email}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {/* preference */}
          <div className="mt-[27px] opacity-40  cursor-not-allowed">
            <h2 className="text-[28px] font-bold mb-[38px] text-black">
              PREFERENCES
            </h2>
            <h4 className="text-[21px] font-bold  text-black">
              Email preferences
            </h4>
            <table className="table-auto border-separate  w-10/12 border-spacing-y-6">
              <tbody>
                <tr>
                  <td>
                    <p className="text-black text-[15px]">
                      Receive offers and deals
                    </p>
                  </td>
                  <td className="text-right">
                    <span className="switch-container ">
                      <label className="switch ">
                        <input disabled type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-black text-[15px]">
                      New products and product updates
                    </p>
                  </td>
                  <td className="text-right">
                    <span className="switch-container ">
                      <label className="switch ">
                        <input
                          disabled
                          type="checkbox"
                          className="select-none"
                        />
                        <span className="slider round"></span>
                      </label>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4 className="text-[21px] font-bold mt-[50px] mb-[40px] text-black  opacity-50 cursor-not-allowed">
            Language preference
          </h4>
          <div className="mb-[50px] dropdown-element opacity-50 cursor-not-allowed">
            <Dropdown isDisabled={true}>
              <Dropdown.Button flat color="default" css={{ tt: "capitalize" }}>
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
              >
                <Dropdown.Item key="English">English</Dropdown.Item>
                <Dropdown.Item key="Hindi">Hindi</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <button
            onClick={() => deleteAccount(user.id)}
            className="text-[#EC3030] text-[18px] font-normal underline mb-20"
          >
            Delete account
          </button>
        </section>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  const userResponse = await fetch(`${CONFIG.API_URL}/users/me?populate=deep`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  if (userResponse.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loggedIn: true,
      user: userData,
    },
  };
}

// export async function getServerSideProps(context: any) {
//   const cookies = nookies.get(context);

//   if (cookies.jwt) {
//     const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${cookies.jwt}`,
//       },
//     });

//     const userData = await response.json();
//     console.log(userData);
//     if (userData.statusCode >= 400) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/auth/login",
//         },
//       };
//     } else {
//       return {
//         props: {
//           loggedIn: true,
//           user: userData,
//         },
//       };
//     }
//   } else {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/auth/login",
//       },
//     };
//   }
// }

export default User;
