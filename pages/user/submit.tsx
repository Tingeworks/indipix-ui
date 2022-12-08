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
import { FaCheck, FaImage } from "react-icons/fa";
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
      <div className="flex flex-col md:flex-row gap-10 container mx-auto px-5 lg:px-10 xl:px-20 py-20">
        <div className="w-full md:w-4/12">
          <h2 className=" text-2xl font-bold ">Upload your images</h2>
          <p className="text-sm">PNG &amp; JPEG files are allowed</p>

          {/* {images.file == "undefined" ? ( */}
          <div
            {...getRootProps()}
            className={`mt-5 ${
              images.files == "undefined" ? " p-20 " : " "
            } bg-gray-100 border-4 border-dashed rounded border-gray-200 relative`}
          >
            <input
              className="absolute top-0 left-0 right-0 bottom-0"
              {...getInputProps()}
            />
            {images.files !== "undefined" && (
              <>
                <img
                  className="w-full"
                  // {...getInputProps()}
                  src={images.previewThumbnail}
                />
                <img
                  className="w-full"
                  // {...getInputProps()}
                  src={images.previewMain}
                />
              </>
            )}
          </div>

          <div className="mt-5">
            <p className="text-gray-400 text-lg font-bold">Rules</p>

            <ul className="list-disc list-outside mt-2 ml-5">
              <li className="text-sm">Submit 2 Images</li>
              <li className="text-sm">High Resolution image should be named as 01.png or 01.jpg</li>
              <li className="text-sm">Low Resolution thumbnail image should be named as 02.png or 02.jpg</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 flex-1 text-sm">
          <Formik
            initialValues={{
              name: "",
              description: " ",
              location: " ",
              price: "",
              testFile: "",
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              console.log(values);
              console.log(images.files);
              console.log(debugImage);
              theMainForm.append("title", values.name);
              theMainForm.append("description", values.description);
              theMainForm.append("location", values.location);
              theMainForm.append("price", values.price);

              console.log(formData);
              fetch(`${CONFIG.API_URL}/products`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${jwt}`,
                  // "Content-Type": "undefined"
                },
                body: theMainForm,
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                });
            }}
          >
            <Form encType="multipart/form">
              <div className="flex flex-col w-full">
                <label className="font-bold" htmlFor="name">
                  Name
                </label>
                <Field
                  placeholder="e.g. Hill Tracks"
                  className="w-full p-2 focus:outline-none border rounded mt-1 "
                  id="name"
                  name="name"
                  type="text"
                />
              </div>

              <div className="flex flex-col w-full mt-5">
                <label className="font-bold" htmlFor="name">
                  Location
                </label>
                <div className="flex gap-3">
                  <input
                    placeholder="India"
                    className="p-2 focus:outline-none border rounded mt-1 w-1/3"
                    id="country"
                    name="country"
                    type="text"
                    disabled
                  />
                  <Field
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full p-2 focus:outline-none border rounded mt-1"
                    id="location"
                    name="location"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full mt-5">
                <label className="font-bold" htmlFor="description">
                  Description
                </label>
                <Field
                  as="textarea"
                  placeholder="Summarize your image"
                  className="w-full p-2 focus:outline-none border rounded mt-1 "
                  id="description"
                  name="description"
                  rows={5}
                />
              </div>

              <div className="flex gap-5 mt-5 w-full">
                <div className="w-3/12">
                  <label className="font-bold" htmlFor="name">
                    Price
                  </label>
                  <div className="flex  p-2 border rounded mt-1 gap-5">
                    <span className="text-gray-500">₹</span>
                    <input
                      placeholder="00.00"
                      className="w-full focus:outline-none text-right"
                      id="name"
                      name="name"
                      type="number"
                      step={1.0}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="font-bold" htmlFor="name">
                    You&apos;ll recieve
                  </label>
                  <div className="flex  p-2 border rounded mt-1 gap-5 opacity-80">
                    <span className="text-gray-500">₹</span>
                    <input
                      disabled
                      placeholder="00.00"
                      className="w-full focus:outline-none text-right bg-white"
                      id="name"
                      name="name"
                      type="number"
                      step={1.0}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full mt-5">
                <label className="font-bold" htmlFor="name">
                  Additional Tags
                </label>
                <input
                  placeholder="e.g. Hill Tracks"
                  className="w-full p-2 focus:outline-none border rounded mt-1 mb-2"
                  id="name"
                  name="name"
                  type="text"
                />
                <small>Maximum 5 tags, separate using comma</small>
              </div>

              <div className="mt-5 flex gap-3">
                <input type="checkbox" name="" id="" />
                <p className="text-gray-500">
                  By submiting I agree to comply with the{" "}
                  <Link passHref href="/policy">
                    <a
                      className="
                text-[#C72127]"
                    >
                      terms and condition
                    </a>
                  </Link>
                </p>
              </div>

              <div className="mt-20">
                <button
                  className="bg-[#C72127] hover:bg-black text-white py-3 px-10 rounded w-full md:w-auto "
                  type="submit"
                >
                  Submit
                </button>
                {/* <Button className="px-20" Label="Submit" type="submit" style="Primary" /> */}
              </div>
            </Form>
          </Formik>
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
