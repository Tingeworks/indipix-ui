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

/** Home page */
const User: NextPage = ({ user, loggedIn }: any) => {
  const [selected, setSelected] = useState(new Set(["English"]));
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
    <>
      <Navbar isLoggedIn={loggedIn} />
      <SEO
        title={`${user.username} is on Indipix`}
        description={`${user.username} is on Indipix`}
        keywords={`indipix, indipix ${user.username}`}
      />

      <div className="grid grid-cols-12   flex-1 ">
        {/* sidebar */}
        <div className="bg-[#B83A3A] col-span-2 p-10 w-[250px] min-h-screen px-[18px] py-[50px]">
          <ul>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="#">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Plans
                </span>
              </Link>
            </li>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="#">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Purchase history
                </span>
              </Link>
            </li>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="#">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Saved collections
                </span>
              </Link>
            </li>
            <li className="pb-[19px] border-b-[.5px] mb-[18px] border-white">
              <Link href="#">
                <span className="text-white text-[15px] font-light cursor-pointer">
                  Billing details
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {/* sidebar */}
        {/* main */}
        <section className="pt-[50px] pl-[55px] col-span-10">
          {/* user details */}
          <h2 className="text-[28px] font-bold ">USER DETAILS</h2>
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
                <td>
                  <button className="text-[#0E6EC6] text-[15px] underline">
                    edit
                  </button>
                </td>
              </tr>
              <tr className="pb-5">
                <td>
                  <span className="text-black text-[15px]">Password</span>
                </td>
                <td>
                  <span className="text-[#545252] text-[15px]">********</span>
                </td>
                <td>
                  <Link href={"/user/passwordreset"}>
                    <button className="text-[#0E6EC6] text-[15px] underline">
                      edit
                    </button>
                  </Link>
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
                <td>
                  <button className="text-[#0E6EC6] text-[15px] underline">
                    edit
                  </button>
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
                <td>
                  <button className="text-[#0E6EC6] text-[15px] underline">
                    edit
                  </button>
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
    </>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  const userResponse = await fetch(`${CONFIG.API_URL}/users/me`, {
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
