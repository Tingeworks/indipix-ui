// Core imports
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

// third party
import { FaChevronLeft } from "react-icons/fa";
import nookies, { parseCookies } from "nookies";

// Domestic imports
import Button from "../../Components/Form/Button";
import CONFIG from "../../CONFIG";

// Page
const Done: NextPage = () => {
  const cookies = parseCookies();
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center  bg-red-100">
        <Head>
          <title>Indipix - Congratulations</title>
        </Head>

        <div className="text-center">
          <h1 className="text-4xl font-black">Congratulations</h1>
          <p>You are now a part of this great community</p>
          <div className="mt-5 flex justify-center">
            <Link href={"/auth/login"}>
              <a className="px-10  bg-red-700 text-white hover:bg-black flex justify-center items-center py-3 gap-3">
                <FaChevronLeft /> Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// export async function getServerSideProps(context: any) {
//   return {

//   }
// }

export default Done;
