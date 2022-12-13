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
const PurchaseHistory: NextPage = ({ user, loggedIn, orders }: any) => {
  const [selected, setSelected] = useState(new Set(["English"]));
  const [panelStatus, setPanelStatus] = useState(true);

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const deleteAccount = (id: number) => {
    const { jwt } = parseCookies();
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
                  Information
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
          {/* user details */}
          <h2 className="text-[28px] font-bold">
            Purchase History ({orders.meta.pagination.total}){" "}
          </h2>
          <table className="mt-10">
            <thead>
              <tr>
                <th className="p-5 text-left border">#</th>
                <th className="p-5 text-left border">Status</th>
                <th className="p-5 text-left border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((item: any) => (
                <tr key={item.id}>
                  <td className="p-5 text-left border">{item.id}</td>
                  <td
                    className={`p-5 text-left border capitalize ${
                      item.attributes.status == "approved"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {item.attributes.status}
                  </td>
                  <td className="p-5 text-left border uppercase">
                    {moment(item.attributes.createdAt).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
};

const qs = require("qs");

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const userData = await userResponse.json();

  const orderQS = qs.stringify({
    populate: "*",
    filters: {
      userID: {
        $eq: "34",
      },
    },
  });
  const orderHistoryResponse = await fetch(
    `${CONFIG.API_URL}/order?${orderQS}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );

  const orderHistoryData = await orderHistoryResponse.json();
  console.log(orderHistoryData);
  if (userResponse.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loggedIn: true,
      orders: orderHistoryData,
      user: userData,
    },
  };
}

export default PurchaseHistory;
