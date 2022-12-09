// NextJS & React imports
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
const FormData = require("form-data");
// Third Party imports
import nookies, { parseCookies } from "nookies";
import { Field, Form, Formik } from "formik";
import { useDropzone } from "react-dropzone";
import { FaCheck, FaImage, FaUpload } from "react-icons/fa";
// import FormData from "form-data";

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";
import Button from "../../Components/Form/Button";
import { getImageSize } from "next/dist/server/image-optimizer";

interface pageProps {
  loggedIn: boolean;
  user: Object;
}

/** Home page */
const filesInTheBuscat = {
  filename: "W",
  filePath: "w",
};
let theMainForm = new FormData();

const Submit: NextPage<pageProps> = ({ loggedIn, user }) => {
  let mfile: any;
  const { jwt } = parseCookies();
  const [images, setImages] = useState<{
    files: "" | {};
    previewThumbnail: string;
    previewMain: string;
  }>({
    files: "undefined",
    previewThumbnail: "",
    previewMain: "",
  });
  const [debugImage, setDebugImage] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    maxFiles: 2,

    onDrop: (acceptedFiles) => {
      theMainForm.append("productPlaceHolder", acceptedFiles[0]);
      console.log(acceptedFiles);
      setImages({
        files: acceptedFiles,
        previewMain: URL.createObjectURL(acceptedFiles[0]),
        previewThumbnail: URL.createObjectURL(acceptedFiles[0]),
      });
    },
  });

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Submit a new photo | Indipix" description="" keywords="" />
      <div className="flex flex-col md:flex-row gap-20 container mx-auto px-5 lg:px-10 xl:px-20 py-20">
        <div className="w-full md:w-4/12">
          <h2 className=" text-2xl font-bold ">Upload your images</h2>
          <p className="text-sm">PNG &amp; JPEG files are allowed</p>
          <div className="p-10 h-48 bg-gray-100 rounded-lg mt-5 flex flex-col items-center justify-center">
            <p>
              <FaUpload className="text-3xl text-gray-300 mb-2" />
            </p>
            <p className="text-gray-300">Drop your images here</p>
          </div>

          <div className="mt-5">
            <p className="text-gray-400 text-lg font-bold">Rules</p>

            <ul className="list-disc list-outside mt-2 ml-5">
              <li className="text-sm">Submit 2 Images</li>
              <li className="text-sm">
                High Resolution image should be named as 01.png or 01.jpg
              </li>
              <li className="text-sm">
                Low Resolution thumbnail image should be named as 02.png or
                02.jpg
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-8/12">
          <h2 className=" text-2xl font-bold ">Fill up the details</h2>
          <p className="text-sm">
            Add all details properly to increase your chances of getting
            accepted
          </p>

          <div className="mt-5 w-full">
            <p>Title</p>
            <input
              placeholder="e.g. Taj Mahal Afternoon Shots"
              type="text"
              className="bg-gray-50 w-full p-5 text-sm"
            />
            <p className="text-sm text-gray-400 mt-1">
              Add relevant keywords that describe your product for better search
              visibility
            </p>
          </div>

          <div className="flex gap-10">
            <div className="mt-5 w-1/4">
              <p>Country</p>
              <input
                disabled
                value="India"
                placeholder="e.g. Taj Mahal Afternoon Shots"
                type="text"
                className="bg-gray-50 w-full p-5 text-sm text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="mt-5 flex-1">
              <p>Location</p>
              <input
                placeholder="e.g. Agra, UP"
                type="text"
                className="bg-gray-50 w-full p-5 text-sm"
              />
              <p className="text-sm text-gray-400 mt-1">
                Location helps improve your products visibility
              </p>
            </div>
          </div>

          <div className="mt-3 w-full">
            <p>Description</p>
            <textarea
              rows={4}
              placeholder="e.g. Agra, UP"
              className="bg-gray-50 w-full p-5 text-sm"
            ></textarea>
            <p className="text-sm text-gray-400 mt-1">
              A proper description increases your product&apos;s chances to be
              accepted
            </p>
          </div>

          <div className="mt-5 flex-1">
            <p>Tags</p>
            <input
              placeholder="e.g. Taj Mahal, UP, afternoon, wonder"
              type="text"
              className="bg-gray-50 w-full p-5 text-sm"
            />
            <p className="text-sm text-gray-400 mt-1">
              Tags help in increasing search visibility
            </p>
          </div>

          <div className="mt-5 w-full">
            <p>Price</p>
            <input
              placeholder="e.g. Taj Mahal Afternoon Shots"
              type="text"
              className="bg-gray-50 w-full p-5 text-sm"
            />
          </div>


          <div className="mt-5 flex">
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);

  if (cookies.jwt) {
    const userResponse = await fetch(`${CONFIG.API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    const userData = await userResponse.json();

    const submissionResponse = await fetch(`${CONFIG.API_URL}/product/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    const submissionData = await submissionResponse.json();

    console.log(submissionData);

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

export default Submit;
