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

const Navbar: React.FC<navbarProps> = (props) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const router = useRouter();

  return (
    <nav className="container px-5 lg:px-10 xl:px-20 mx-auto flex items-center py-3 justify-between">
      <div className="">
        <Link href="/">
          <Image
            className="cursor-pointer mr-2"
            width={32}
            height={32}
            src="/logo_white_bg.png"
            alt=""
          />
        </Link>
      </div>
      <div className="pl-4 hidden md:inline-flex">
        <ul className="flex text-xs">
          <li className="pr-6">
            <a href="">Explore</a>
          </li>
          <li className="pr-6">
            <a href="">Advertise</a>
          </li>
          <li className="pr-6">
            <a href="">Blog</a>
          </li>
          <li className="pr-6">
            <a href="">Price</a>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Formik
          initialValues={{
            search: "",
          }}
          onSubmit={(values) => {
            router.push(`/imgs/${values.search}`);
          }}
        >
          <Form className="flex items-center bg-gray-100 py-2 px-2 rounded-sm">
            <Input
              icon={<FaSearch />}
              usingFormik
              id="search"
              name="search"
              placeholder="Search images &amp; gallaries"
              className="focus:outline-none bg-gray-100 pl-2 text-sm flex-1"
              type="text"
            />
          </Form>
        </Formik>
      </div>
      <div className="hidden md:inline-flex">
        {props.isLoggedIn == true ? (
          <ul className="flex items-center">
            <Link href="/user/submit">
              <li className="px-2">
                <a className="flex items-center px-4 border border-gray-200 py-2 text-gray-600 rounded-sm cursor-pointer ">
                  <FaUpload />
                  <span className="pl-2 text-sm">Submit</span>
                </a>
              </li>
            </Link>
            <li className="px-2">
              <a className="text-gray-600">
                <FaShoppingCart />
              </a>
            </li>
            <li className="px-2">
              <a className="text-gray-600">
                <FaHeart />
              </a>
            </li>
            <Link href="/user/">
              <li className="pl-2">
                <a className="text-gray-600">
                  <FaUser />
                </a>
              </li>
            </Link>
          </ul>
        ) : (
          <ul className="flex items-center">
            <Link href="/auth/login">
              <li>
                <a className="text-gray-600 px-2 mx-2">login</a>
              </li>
            </Link>

            <Link href="/auth/register">
              <li>
                <a className="text-white rounded-sm px-4 py-1 bg-red-700 hover:bg-black">
                  Join
                </a>
              </li>
            </Link>
          </ul>
        )}
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

          <ul className="flex w-full mt-5">
            <li className="px-2 bg-slate-300 p-2 py-3 flex items-center justify-center flex-1">
              <button className="text-gray-600">
                <FaShoppingCart />
              </button>
            </li>

            <li className="px-2 bg-slate-400 p-2 py-3 flex items-center justify-center flex-1">
              <button className="text-gray-600">
                <FaHeart />
              </button>
            </li>

            <li className="px-2 bg-slate-500 p-2 py-3 flex items-center justify-center flex-1">
              <Link href="/user/">
                <button className="text-gray-100">
                  <FaUser />
                </button>
              </Link>
            </li>
          </ul>

          <hr className=" my-5 " />

          <ul className="flex flex-col text-xl">
            <li className="flex">
              <Link href="/">
                <a className="p-2" href="">
                  Explore
                </a>
              </Link>
            </li>
            <li className="p-2 flex">
              <a href="">Advertise</a>
            </li>
            <li className="p-2 flex">
              <a href="">Blog</a>
            </li>
            <li className="p-2 flex">
              <a href="">Price</a>
            </li>
          </ul>

          <Link href="/user/submit">
            <a onClick={() => setMenuStatus(false)}>
              <Button
                className="w-full py-3 mt-5"
                icon={<FaUpload />}
                Label="Submit"
                style="Secondary"
                type="button"
              />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
