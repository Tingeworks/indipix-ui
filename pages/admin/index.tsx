import { NextPage } from "next";
import Image from "next/image";
import AdminLayout from "../../Components/Layout/AdminLayout";

const Admin: NextPage = () => {
  return (
    <>
      <AdminLayout className="flex" isLoggedIn={true}>
        <h1 className="text-3xl font-bold">Hi, Username 👋.</h1>
        <p className="text-gray-400">Welcome back!</p>
      </AdminLayout>
    </>
  );
};

export default Admin;
