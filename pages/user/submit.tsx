// NextJS & React imports
import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
const FormData = require("form-data");
// Third Party imports
import nookies, { parseCookies } from "nookies";
import { useDropzone } from "react-dropzone";
import { FaCheck, FaImage, FaUpload } from "react-icons/fa";
// import FormData from "form-data";

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";
import Button from "../../Components/Form/Button";
import { getImageSize } from "next/dist/server/image-optimizer";
import jwtDecode from "jwt-decode";
import axios from "axios";

interface pageProps {
  loggedIn: boolean;
  user: Object;
}

/** Home page */
const Submit: NextPage<pageProps> = ({ loggedIn, user }) => {
  const { jwt } = parseCookies();

  const [tags, setTags] = useState<string[]>([]);

  const [images, setImages] = useState<{
    filesLength: number;
    files: undefined | {}[];
    previewThumbnail: string;
    previewMain: string;
  }>({
    filesLength: 0,
    files: undefined,
    previewThumbnail: "",
    previewMain: "",
  });

  const [payload, setPayload] = useState<{
    title: string;
    location: string;
    description: string;
    price: number;
  }>({
    title: "",
    location: "",
    description: "",
    price: 0,
  });

  // helper function
  function removeItemOnce(arr: any[], value: number) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  // helper function

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      const files: {}[] = [];

      acceptedFiles.forEach((file, index: number) => {
        const filename = file.name.split(".");
        if (
          filename[1] == "jpg" ||
          filename[1] == "png" ||
          filename[1] == "jpeg"
        ) {
          if (filename[0] == "01" || filename[0] == "02") {
            if (
              filename[0] == "01" &&
              file.size <= 10000000 &&
              file.size >= 1000000
            ) {
              files[0] = file;
            } else if (
              filename[0] == "02" &&
              file.size < 1000000 &&
              file.size >= 100000
            ) {
              files[1] = file;
            }
          }
        }
      });

      if (files.length == 2) {
        setImages({
          filesLength: 2,
          files: files,
          previewMain: URL.createObjectURL(files[0] as MediaSource),
          previewThumbnail: URL.createObjectURL(files[1] as MediaSource),
        });
      }
    },
  });

  // Submit function
  const submit = (event: any) => {
    event.preventDefault();

    if (images.files == undefined) {
      alert("Images can't be empty");
      return;
    }
    const jwtDecoded: { id: string } = jwtDecode(jwt);

    let productFormdata = new FormData();
    let ImageFormdata = new FormData();

    productFormdata.append(
      "data",
      {
        "title": payload.title,
        // "location": "India, " + payload.location,
        "description": payload.description,
        // "author": jwtDecoded.id,
        "price": payload.price,
      }
    );

    // productFormdata.append("", imageFiles[])
    // productFormdata.append("location", "India, " + payload.location);
    // productFormdata.append("description", payload.description);
    // productFormdata.append("author", jwtDecoded.id);
    // productFormdata.append("price", payload.price);

    const imageFiles: { name?: string } = images.files[1];
    productFormdata.append("files.thumbnail", imageFiles, imageFiles.name);

    // Posting Image

    fetch(`${CONFIG.API_URL}/products`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
      body: productFormdata,
    })
      .then(res => res.json())
      .then(data => console.log(data))
  };

  return (
    <Layout isLoggedIn={loggedIn}>
      <SEO title="Submit a new photo | Indipix" description="" keywords="" />
      <div className="flex flex-col md:flex-row gap-20 container mx-auto px-5 lg:px-10 xl:px-20 py-20">
        <div className="w-full md:w-4/12">
          <h2 className=" text-2xl font-bold ">Upload your images</h2>
          <p className="text-sm">PNG &amp; JPEG files are allowed</p>
          {images.filesLength == 2 && (
            <>
              <div
                onClick={() =>
                  setImages({
                    filesLength: 0,
                    files: undefined,
                    previewThumbnail: "",
                    previewMain: "",
                  })
                }
                className="mt-6 relative w-48 cursor-pointer"
              >
                <span className="absolute top-0 left-0 p-2 bg-red-500 text-white z-10">
                  1
                </span>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#00000062] text-white">
                  Click to remove
                </div>
                <img
                  className=" border border-white"
                  src={images.previewMain}
                  alt=""
                />
              </div>

              <div
                onClick={() =>
                  setImages({
                    filesLength: 0,
                    files: undefined,
                    previewThumbnail: "",
                    previewMain: "",
                  })
                }
                className="mt-6 relative w-36 cursor-pointer"
              >
                <span className="absolute top-0 left-0 p-2 bg-blue-500 text-white z-10">
                  2
                </span>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#00000062] text-white text-sm">
                  Click to remove
                </div>
                <img
                  className=" border border-white"
                  src={images.previewMain}
                  alt=""
                />
              </div>
            </>
          )}
          {images.filesLength !== 2 && (
            <div
              {...getRootProps()}
              className="mt-5 flex flex-col items-center  h-48 justify-center relative bg-gray-100 rounded-lg cursor-pointer"
            >
              <p>
                <FaUpload className="text-3xl text-gray-300 mb-2" />
              </p>
              <p className="text-gray-300">Drop your images here</p>
              <input
                className="absolute top-0 left-0 right-0 bottom-0"
                {...getInputProps()}
              />
            </div>
          )}

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
              <li className="text-sm">
                High Resolution image should be lower than 10mb & larger than
                1mb
              </li>
              <li className="text-sm">
                Low Resolution image should be lower than 1mb & larger than
                100kb
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
          <form onSubmit={submit}>
            <div className="mt-5 w-full">
              <p>Title</p>
              <input
                required
                onChange={(e) =>
                  setPayload({
                    title: e.target.value,
                    location: payload.location,
                    description: payload.description,
                    price: payload.price,
                  })
                }
                value={payload.title}
                placeholder="e.g. Taj Mahal Afternoon Shots"
                type="text"
                className="bg-gray-50 w-full p-5 text-sm"
              />
              <p className="text-sm text-gray-400 mt-1">
                Add relevant keywords that describe your product for better
                search visibility
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
                  required
                  placeholder="e.g. Agra, UP"
                  type="text"
                  className="bg-gray-50 w-full p-5 text-sm"
                  onChange={(e) =>
                    setPayload({
                      title: payload.title,
                      location: e.target.value,
                      description: payload.description,
                      price: payload.price,
                    })
                  }
                  value={payload.location}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Location helps improve your products visibility
                </p>
              </div>
            </div>

            <div className="mt-3 w-full">
              <p>Description</p>
              <textarea
                required
                onChange={(e) =>
                  setPayload({
                    title: payload.title,
                    location: payload.location,
                    description: e.target.value,
                    price: payload.price,
                  })
                }
                rows={4}
                placeholder="e.g. Agra, UP"
                className="bg-gray-50 w-full p-5 text-sm"
              >
                {payload.description}
              </textarea>
              <p className="text-sm text-gray-400 mt-1">
                A proper description increases your product&apos;s chances to be
                accepted
              </p>
            </div>

            <div className="mt-5 flex-1">
              <p>Tags</p>
              <input
                required
                placeholder="e.g. Taj Mahal, UP, afternoon, wonder"
                type="text"
                className="bg-gray-50 w-full p-5 text-sm"
                onChange={(e) => {
                  if (e.target.value == "") {
                    setTags([]);
                  } else {
                    setTags(e.target.value.split(","));
                  }
                }}
                value={tags.join(",")}
              />
              <ul className="list-none my-3 flex gap-2 items-center">
                {tags.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setTags(removeItemOnce(tags, index))}
                      className="inline rounded-md text-red-700"
                    >
                      #{item}
                    </li>
                  );
                })}

                <li className="px-2 bg-gray-100 shadow-inner rounded-md py-1">
                  {5 - tags.length} tags can be added
                </li>
              </ul>
              <p className="text-sm text-gray-400 mt-1">
                Tags help in increasing search visibility
              </p>
            </div>

            <div className="mt-5 w-full">
              <p>Price</p>
              <input
                required
                placeholder="e.g. Taj Mahal Afternoon Shots"
                type="number"
                min={0}
                max={1000}
                className="bg-gray-50 w-full p-5 text-sm"
                onChange={(e) =>
                  setPayload({
                    title: payload.title,
                    location: payload.location,
                    description: payload.description,
                    price: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="mt-10">
              <p className="text-lg text-gray-400">
                By clicking on submit I agree with the terms &amp; conditions.
              </p>
            </div>

            <div className="mt-2 flex">
              <button className="px-5 py-2 bg-red-700 text-white rounded-sm hover:bg-red-800 block">
                Submit
              </button>
            </div>
          </form>
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
