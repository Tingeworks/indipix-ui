// NextJS & React imports
import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";

// Third Party imports
import nookies from "nookies";
import { Formik, Field, Form } from "formik";
import { setCookie } from "nookies";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import Link from "next/link";
import { FaArrowCircleLeft, FaChevronRight } from "react-icons/fa";

// Domestic imports
import SEO from "../../Components/Misc/SEO";
import Layout from "../../Components/Layout/Layout";
import Banner from "../../Components/Banner";
import CONFIG from "../../CONFIG";
import Input from "../../Components/Form/Input";

const decodeJWT = (
  str: string
): {
  id: number;
  username: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
} => {
  return jwtDecode(str);
};

/** Login page */
const Login: NextPage = () => {
  return (
    <>
      <SEO title="Login in to Indipix" description="" keywords="" />
      <div className="h-screen flex">
        <div className="hidden lg:inline-flex lg:w-1/2 overflow-hidden relative">
          <Link href={"/"}>
            <span className="absolute top-0 left-0 z-20 m-10 cursor-pointer">
              <FaArrowCircleLeft className=" text-3xl text-white drop-shadow-lg" />
            </span>
          </Link>
          <Image
            alt="login image"
            height={1080}
            width={1080}
            src="https://source.unsplash.com/random/1000x1000"
          />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="py-4 px-6 bg-white w-96 rounded-lg">
            <h2 className="text-2xl text-center font-semibold">Sign In</h2>
            <div className="my-4">
              <hr className="my-5" />
              <p className="-mt-9 text-center">
                <span className="bg-white px-4 text-sm">
                  or Sign in with Email
                </span>
              </p>
            </div>
            <Formik
              initialValues={{
                identifier: "",
                password: "",
              }}
              onSubmit={async (values) => {
                const response = await axios.post(
                  `${CONFIG.API_URL}/auth/local`,
                  {
                    identifier: values.identifier,
                    password: values.password,
                  }
                );

                // const data = await response.json();

                if (response.status == 200) {
                  setCookie(null, "jwt", response.data.jwt, {
                    maxAge: 30 * 24 * 60 * 60 * 60 * 60,
                    path: "/",
                  });

                  Router.push("/");
                }
              }}
            >
              <Form>
                <div className="my-5">
                  <Input
                    usingFormik={true}
                    name="identifier"
                    id="identifier"
                    type="text"
                    placeholder="Username or email address"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                  />
                </div>

                <div className="my-5">
                  <Input
                    usingFormik={true}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="focus:outline-none border rounded p-2 text-sm w-full"
                  />
                </div>

                <div className="text-xs text-center text-red text-red-700">
                  <Link href="/">Forgot Password</Link>
                </div>

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
              Don&apos;t have an account?{" "}
              <Link href="/auth/register">
                <span className="text-red-700 cursor-pointer ml-1">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
