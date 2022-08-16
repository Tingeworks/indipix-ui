import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaDownload,
  FaFileDownload,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaSlackHash,
  FaUpload,
  FaUser,
} from "react-icons/fa";
import Button from "../Form/Button";
import ButtonWithIcon from "../Form/ButtonWithIcon";
import Input from "../Form/Input";

interface navbarProps {
  isLoggedIn: boolean;
}

const AdminNavbar: React.FC<navbarProps> = (props) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const router = useRouter();

  return (
    <nav className="container px-5 lg:px-10 xl:px-20 mx-auto flex items-center py-3 justify-between">
      <div className="">
        <Link href="/admin">
          <Image
            className="cursor-pointer mr-2"
            width={32}
            height={32}
            src="/logo_white_bg.png"
            alt=""
          />
        </Link>
      </div>
      <div className="hidden md:inline-flex">
        <ul className="flex items-center">
          {props.isLoggedIn ? (
            <>
              <li className="pl-2">
                <Link href="/user/">
                  <button className="text-gray-600 flex gap-2 items-center">
                    <FaUser /> Username
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-gray-400">
                <Link href="/admin/login">
                  Unauthorized
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="md:hidden select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2 cursor-pointer select-none"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setMenuStatus(true)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>

        <div
          className={`${
            menuStatus ? "" : "hidden"
          } fixed top-0 bottom-0 right-0 bg-white w-full z-50 px-5`}
        >
          <div className="flex justify-end">
            <span
              onClick={() => setMenuStatus(false)}
              className="text-6xl select-none"
            >
              &times;
            </span>
          </div>

          <hr className=" my-5 " />

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
