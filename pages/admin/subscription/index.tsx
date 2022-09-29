// core imports
import { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";

// Third Party Imports
import nookies, { parseCookies } from "nookies";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import moment from "moment";

// Domestic Imports
import AdminLayout from "../../../Components/Layout/AdminLayout";
import CONFIG from "../../../CONFIG";
import Link from "next/link";
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
const Subscription: NextPage<pageProps> = ({ user, token }) => {
  const [image, setImage] = useState("");
  console.log(token);
  const [data, setData] = useState<item[]>([]);
  const [loading, setLoadingState] = useState(false);

  useEffect(() => {
    fetch(`${CONFIG.API_URL}/product/all`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  // console.log(jwt)
  const deleteProduct = (id: string) => {
    fetch(`${CONFIG.API_URL}/product/${id}`, {
      method: "DELETE",
      headers: {
        Authentication: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(id);
      });
  };

  return (
    <>
      <AdminLayout username={user.username} className="flex" isLoggedIn={true}>
        {image == "" ? "" : overlayBox(image, setImage)}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Subscriptions
            </h1>
            <p className="text-gray-400">
              Make sure to judge them before rejecting
            </p>
          </div>
          <div>
            <Link href="/admin/subscription/add">
            <button className="flex gap-3 bg-red-700 text-white px-8 py-2 rounded-md hover:bg-black items-center">
              <FaPlus /> Add
            </button>
            </Link>
          </div>
        </div>
        <table className="w-full mt-10">
          <thead className="w-full font-bold text-right">
            <tr>
              <td className="border p-3">#</td>
              <td className="border p-3">Title</td>
              <td className="border p-3">Total Images</td>
              <td className="border p-3">Price</td>
              <td className="border p-3">Created At</td>
              <td className="border p-3">Action</td>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="text-right">
              <td className="p-2">1</td>
              <td className="p-2">Premium</td>
              <td className="p-2">10</td>
              <td className="p-2">1000</td>
              <td className="p-2">Feb 10, 2022</td>
              <td className="p-2 flex items-center justify-end gap-4">
                <Button Label="Delete" icon={<FaTrash />} type="button" style="Danger" />
              </td>
            </tr>
          </tbody>
        </table>
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

export default Subscription;
