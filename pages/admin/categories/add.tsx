// core imports
import { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import Router from "next/router";

// Third Party Imports
import nookies, { parseCookies } from "nookies";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import moment from "moment";

// Domestic Imports
import AdminLayout from "../../../Components/Layout/AdminLayout";
import CONFIG from "../../../CONFIG";
import Button from "../../../Components/Form/Button";

interface item {
  id: string;
  title: string;
  reduced_40: string;
  location: string;
  createdAt: string;
}

// Image Overlay Component
const overlayBox = (image: string, setImage: Function) => {
  return (
    <div
      onClick={() => setImage("")}
      className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-[#000000cd]  p-10 "
    >
      <img style={{ height: "90vh" }} src={image} />
    </div>
  );
};

interface pageProps {
  user: {
    username: string;
  };
  token: string;
}

// Page
const Add: NextPage<pageProps> = ({ user, token }) => {
  const [imageLimit, setImageLimit] = useState(0);
  const cookies = parseCookies();

  const submit = (e: any) => {
    e.preventDefault();
    // console.log(jwt)
    fetch(`${CONFIG.API_URL}/subscription/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        name: e.target[0].value,
        description: e.target[1].value,
        downloadable_limit: parseInt(e.target[2].value),
        price: parseInt(e.target[3].value),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Created!");
        Router.reload();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <AdminLayout username={user.username} className="flex" isLoggedIn={true}>
        <h1 className="text-3xl font-bold">Add categories</h1>
        <p className="text-gray-400">
          Don't stress it, you can always make new categories.
        </p>

        <form onSubmit={submit} className="mt-5">
          <div className=" my-2">
            <input
              className="w-full p-5"
              type="text"
              placeholder="Title"
              name="name"
            />
          </div>
          <div className=" my-2">
            <textarea
              className="p-5 w-full"
              placeholder="List points and separate by comma i.e. 5 images, 1 month, for enterprices etc."
              id=""
              cols={30}
              rows={10}
              name="description"
            ></textarea>
          </div>
          <div className="my-4">
            <label htmlFor="limit">
              Total Images{" "}
              <span className="px-3 text-gray-400">{imageLimit}</span>
            </label>

          </div>
          <div>
            <input
              placeholder="Price"
              className="w-full p-5"
              step={0.1}
              min={0}
              type="number"
              name="price"
              id="price"
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="mt-10"
              Label="Create"
              icon={<FaCheck />}
              type="submit"
              style="Primary"
            />
          </div>
        </form>
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
          user: data,
          token: cookies.jwt,
        },
      };
    }
  }
}

export default Add;
