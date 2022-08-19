import { NextPage } from "next";
import Image from "next/image";
import AdminLayout from "../../Components/Layout/AdminLayout";
import nookies from "nookies";
import axios from "axios";
import CONFIG from "../../CONFIG";
import Router, { useRouter } from "next/router";

const Admin: NextPage = ({ user }: any) => {
  // const router = useRouter();

  // if (typeof document !== "undefined") {
  //   if (user.role == "user") {
  //     Router.push("/admin/login");
  //   }
  // }

  return (
    <>
      <AdminLayout className="flex" isLoggedIn={true}>
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

  if (cookies.jwt) {
    const response = await axios.get(`${CONFIG.API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });

    if (response.data.role !== "user") {
      return {
        props: {
          user: response.data,
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/"
        }
      }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

export default Admin;
