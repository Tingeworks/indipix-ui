// NextJS & React imports
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import Router from "next/router";

// Third Party imports
import { Formik, Field, Form } from "formik";
import nookies from "nookies";
import { FaArrowCircleLeft, FaChevronRight } from "react-icons/fa";
import { setCookie } from "nookies";

// Domestic imports
import SEO from "../../Components/Misc/SEO";
import Layout from "../../Components/Layout/Layout";
import Banner from "../../Components/Banner";
import Link from "next/link";
import CONFIG from "../../CONFIG";

/** Register page */
const Register: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <SEO title="Register to access Indipix" description="" keywords="" />
      <div className="h-screen flex justify-center">
        <div className="w-1/2 overflow-hidden relative hidden lg:inline-flex">
          <Link href="/">
            <span className="absolute top-0 left-0 z-20 m-10 cursor-pointer">
              <FaArrowCircleLeft className="text-3xl text-white drop-shadow-lg" />
            </span>
          </Link>
          <Image
            alt="login image"
            height={1080}
            width={1080}
            src="https://source.unsplash.com/random/1000x1000"
          />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="py-4 px-6 bg-white w-96 rounded-lg">
            <h2 className="text-2xl text-center font-semibold">Join</h2>
            <div className="my-4">
              <hr className="my-5" />
              <p className="-mt-9 text-center">
                <span className="bg-white px-4 text-sm">
                  or Sign up with Email
                </span>
              </p>
            </div>
            <Formik
              initialValues={{
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
              }}
              onSubmit={async (values) => {
                const response = await fetch(
                  `${CONFIG.API_URL}/auth/local/register`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      username: values.username,
                      email: values.email,
                      name: values.first_name + " " + values.last_name,
                      password: values.password,
                    }),
                  } 
                );
                console.log(response);

                const data = await response.json();
                if (response.status !== 400) {
                  setCookie(null, "jwt", data.jwt, {
                    maxAge: 30 * 24 * 60 * 60 * 60 * 60,
                    path: "/",
                  });
                  Router.push("/auth/done");
                } else {
                  if (
                    data.error.message.slice(0, 17).trim() ==
                    "queryMx ENOTFOUND"
                  ) {
                    setErrorMessage(
                      `Email Address with domain @${
                        values.email.split("@")[1]
                      } not recognized.`
                    );
                  } else {
                    setErrorMessage(data.error.message);
                  }
                }
              }}
            >
              <Form>
                <div className="my-5">
                  <Field
                    type="text"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                    id="username"
                    name="username"
                    placeholder="Username"
                  />
                </div>

                <div className="my-5">
                  <Field
                    type="email"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                    id="email"
                    name="email"
                    placeholder="Emai"
                  />
                </div>

                <div className="my-5 flex gap-3">
                  <Field
                    type="text"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                  />

                  <Field
                    type="text"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                  />
                </div>

                <div className="my-5">
                  <Field
                    type="password"
                    autoComplete="true"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                {errorMessage != "" && (
                  <p className="p-3 leading-tight bg-red-50 text-red-700 rounded-md">
                    {errorMessage.charAt(0).toUpperCase() +
                      errorMessage.slice(1)}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex items-center justify-center text-white bg-red-700 w-full mt-5 py-3 hover:bg-black rounded-sm select-none"
                >
                  <span className="mr-2">Continue </span>
                  <FaChevronRight />
                </button>
              </Form>
            </Formik>

            <div className="text-xs text-center mt-5">
              Have an account?{" "}
              <Link href="/">
                <span className="text-red-700 cursor-pointer ml-1">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
