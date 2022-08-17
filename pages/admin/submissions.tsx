import { NextPage } from "next";
import Image from "next/image";
import AdminLayout from "../../Components/Layout/AdminLayout";

const Submissions: NextPage = () => {
  return (
    <>
      <AdminLayout className="flex" isLoggedIn={true}>
        <h1 className="text-3xl font-bold">We've got some submissions </h1>
        <p className="text-gray-400">Make sure to judge them before rejecting</p>

        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Image</td>
                    <td>Seller</td>
                    <td>Location</td>
                    <td>Submission Date</td>
                </tr>
            </thead>
        </table>
        <tbody>
            <tr>
                
            </tr>
        </tbody>
      </AdminLayout>
    </>
  );
};

export default Submissions;
