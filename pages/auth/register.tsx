// NextJS & React imports
import type { NextPage } from "next";
import { useState } from "react";

// Third Party imports
import axios from "axios";
import { Formik, Field, Form } from "formik";

// Domestic imports
import SEO from "../../Components/Misc/SEO";
import Layout from "../../Components/Layout/Layout";
import Banner from "../../Components/Banner";
import Link from "next/link";
import { FaArrowCircleLeft, FaChevronRight } from "react-icons/fa";
import CONFIG from "../../CONFIG";
import Image from "next/image";
import Router from "next/router";

/** Register page */
const Register: NextPage = () => {
  return (
    <>
      <SEO title="Login in to Indipix" description="" keywords="" />
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
                const response = await axios.post(
                  `${CONFIG.API_URL}/auth/register`,
                  {
                    username: values.username,
                    email: values.email,
                    fullName: values.first_name + " " + values.last_name,
                    password: values.password,
                  }
                );

                console.log(response);
                if (response.status == 201) {
                  Router.push("/auth/done");
                }
                // localStorage.setItem("token", data.jwt);
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

                <p className="text-xs text-center text-red text-red-700">
                  <Link href="/">Forgot Password</Link>
                </p>

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
              <Link href="/">
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

export default Register;
