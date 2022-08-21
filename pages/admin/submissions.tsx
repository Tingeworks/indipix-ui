// core imports
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

// Third Party Imports
import nookies from 'nookies'
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

// Domestic Imports
import AdminLayout from "../../Components/Layout/AdminLayout";
import CONFIG from "../../CONFIG";

// Image Overlay Component
const overlayBox = (image: string, setImage: Function) => {
  return (
    <div
      onClick={() => setImage("")}
      className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-[#000000cd]  p-10 "
    >
      <img className="w-8/12" src={image} />
    </div>
  );
};

// Page
const Submissions: NextPage = () => {
  const [image, setImage] = useState("");

  return (
    <>
      <AdminLayout className="flex" isLoggedIn={true}>
        {image == "" ? "" : overlayBox(image, setImage)}
        <h1 className="text-3xl font-bold">We&#39;ve got some submissions </h1>
        <p className="text-gray-400">
          Make sure to judge them before rejecting
        </p>

        <table className="w-full mt-10">
          <thead className="w-full font-bold text-right">
            <tr>
              <td className="border p-3">#</td>
              <td className="border p-3">Image</td>
              {/* <td className="border p-3">Seller</td>
                <td className="border p-3">Location</td> */}
              {/* <td className="border p-3">Submission Date</td> */}
              <td className="border p-3">Action</td>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2 flex gap-3">
                <img
                  onClick={() =>
                    setImage("https://source.unsplash.com/random/800x500")
                  }
                  className="cursor-pointer"
                  width={200}
                  src="https://source.unsplash.com/random/800x500"
                />
                <div className="flex flex-col justify-between">
                  <h2 className="text-sm">
                    Hilly Area -{" "}
                    <span className="text-gray-400">By Imtiazkun</span>
                  </h2>
                  <div className="text-sm">
                    <p>Jaipur, Rajasthan, India</p>
                    <p>
                      <small>Submission date: May 24, 2022</small>
                    </p>
                  </div>
                </div>
              </td>
              {/* <td className="border p-2">Seller</td>
                <td className="border p-2">Location</td> */}
              {/* <td className="border p-2">Submission Date</td> */}
              <td className="border p-2">
                <div className="flex justify-end h-full">
                  <button className="bg-green-500 p-4 hover:bg-black text-white">
                    <FaCheck />
                  </button>
                  <button className="bg-red-500 p-4 hover:bg-black text-white">
                    <FaTrash />
                  </button>
                </div>
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
    console.log(data);
    return {
      props: {
        loggedIn: true,
        user: data,
      },
    };
  }
}

export default Submissions;
