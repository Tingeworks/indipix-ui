import { NextPage } from "next";
import Image from "next/image";
import AdminLayout from "../../Components/Layout/AdminLayout";
import nookies from "nookies";
import axios from "axios";
import CONFIG from "../../CONFIG";
import Router, { useRouter } from "next/router";

const Admin: NextPage = ({ user, loggedIn }: any) => {

  return (
    <>
      <AdminLayout className="flex" isLoggedIn={loggedIn}>
        <div className="p-10">
          <h1 className="text-3xl font-bold">Hi, Username 👋.</h1>
          <p className="text-gray-400">Welcome back!</p>
        </div>
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
    return {
      props: {
        loggedIn: true,
        user: data,
      },
    };
  }
}

export default Admin;
