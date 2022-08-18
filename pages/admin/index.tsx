import { NextPage } from "next";
import Image from "next/image";
import AdminLayout from "../../Components/Layout/AdminLayout";

const Admin: NextPage = () => {
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

export default Admin;
