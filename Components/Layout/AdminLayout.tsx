import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { FaHome } from "react-icons/fa";
import SEO from "../Misc/AdminSEO";
import AdminNavbar from "./AdminNavbar";

interface AdminProps {
  children: React.ReactNode;
  center?: boolean;
  isLoggedIn: boolean;
  className?: string;
  userdata?: object;
  username?: string;
}

const AdminLayout: React.FC<AdminProps> = ({
  children,
  userdata,
  center,
  isLoggedIn,
  className,
  username,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col max-h-screen">
      <SEO title="Indipix Admin" />
      <div
        className={`flex-1 w-full min-h-full  bg-gray-100 
        ${center ? "flex justify-center items-center" : ""}
        ${className && className}`}
      >
        <div className="flex flex-col xl:w-2/12 h-screen">
          <div className=" p-4  flex gap-2  items-center">
            <Link href="/">
              <Image
                className="cursor-pointer"
                width={20}
                height={20}
                src="/logo_white_bg.png"
                alt=""
              />
            </Link>
            <span className="font-bold">Indipix Dashboard</span>
          </div>
          <div className=" flex flex-col flex-1 bg-black h-full justify-between">
            <ul>
              <Link href="/admin">
                <li className=" text-white text-sm items-center hover:bg-gray-800 p-4 cursor-pointer">
                  🏠 Home
                </li>
              </Link>

              <Link href="/admin/submissions">
                <li className=" text-white text-sm items-center hover:bg-gray-800 p-4 cursor-pointer">
                  📸 Submissions
                </li>
              </Link>

              <Link href="/admin/products">
                <li className="text-white text-sm items-center hover:bg-gray-800 p-4 cursor-pointer">
                  🖼️ Products
                </li>
              </Link>

              <Link href="/admin/subscription">
                <li className="text-white text-sm items-center hover:bg-gray-800 p-4 cursor-pointer">
                  💸 Subscriptions
                </li>
              </Link>

              <Link href="/admin/categories">
                <li className=" text-white text-sm items-center p-4 hover:bg-gray-800  cursor-pointer">
                  📂 Categories
                </li>
              </Link>

              <Link href="/admin/users">
                <li className=" text-white text-sm items-center p-4 hover:bg-gray-800  cursor-pointer">
                  🧑 Users
                </li>
              </Link>
            </ul>
            <ul>
              {/* <hr className="border-red-400" /> */}
              <Link href="/admin">
                <li className="text-white text-sm items-center hover:bg-gray-600 p-4 cursor-pointer">
                  ⚙️ Settings
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="flex-1 max-h-full flex flex-col">
          <div className=" p-4 flex gap-2 justify-end">
            <span className="text-gray-500">{username}</span>
          </div>
          <div className=" overflow-y-scroll overflow-x-hidden flex-1 p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
