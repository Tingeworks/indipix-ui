import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import {
  FaDownload,
  FaFileDownload,
  FaHeart,
  FaLightbulb,
  FaRegUserCircle,
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaSlackHash,
  FaUpload,
  FaUser,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import CONFIG from "../../CONFIG";
import Button from "../Form/Button";
import ButtonWithIcon from "../Form/ButtonWithIcon";
import Input from "../Form/Input";
import Modal from "../Modal/Modal";
import nookies, { setCookie } from "nookies";

interface navbarProps {
  isLoggedIn: boolean;
}

const ModalContainer: React.FC = ({ modal, setModal, props }: any) => {
  return (
    <>
      {modal && (
        <Modal onMouseLeave={() => setModal(false)}>
          {props.isLoggedIn != true ? (
            <div className="w-full bg-white">
              <Button
                url="/auth/login"
                className="w-full p-3 rounded-sm"
                type="button"
                Label="Login"
                style="Secondary"
                icon={<FaSignInAlt />}
              />

              <Button
                url="/auth/register"
                className="w-full p-3 rounded-sm"
                type="button"
                Label="Join"
                style="Primary"
                // icon={<FaSignInAlt />}
              />
            </div>
          ) : (
            <div className="w-full bg-white">
              <Button
                url="/user/"
                className="w-full p-3 rounded-sm"
                type="button"
                Label="Profile"
                style="Secondary"
                // icon={<FaUserAlt />}
              />

              <div
                onClick={function () {
                  setCookie(null, "jwt", "");
                  Router.reload();
                }}
              >
                <Button
                  className="w-full p-2 rounded-sm"
                  type="button"
                  Label="Sign out"
                  style="Warning"
                  icon={<FaSignOutAlt />}
                />
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

const Navbar: React.FC<navbarProps> = (props) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  return (
    <nav className="container px-5 lg:px-10 xl:px-20 mx-auto flex items-center py-5 justify-between gap-0 z-50">
      <div>
        <Link href="/">
          <div className="font-bold flex items-center">
            <Image
              className="cursor-pointer mr-2"
              width={32}
              height={32}
              src="/logo_white_bg.png"
              alt="logo"
            />
            <span>Indi</span>
            <span className="text-red-700 font-normal">pix</span>
          </div>
        </Link>
      </div>
      <div className="pl-4 hidden md:inline-flex flex-1 uppercase text-md">
        <ul className="flex text-sm gap-10 items-center justify-center w-full">
          {CONFIG.Navigation.map((item) => (
            <li key={item.id} className="text-xs font-semibold">
              <Link href={item.url}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:inline-flex">
        <ul className="flex items-center">
          <li className="mx-10">
            <Link href="/price">
              <a className="px-5 py-2 hover:bg-black hover:text-white rounded-md border-black  border uppercase text-xs">
                Pricing
              </a>
            </Link>
          </li>
          <li className="relative">
            <FaRegUserCircle
              className="text-2xl"
              onClick={() => setModal(!modal)}
            />
            {ModalContainer({ modal, setModal, props })}
          </li>
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

          <ul className="flex flex-col text-xl">
            {CONFIG.Navigation.map((item) => (
              <li key={item.id} className="flex">
                <Link href={item.url}>
                  <a className="p-2">{item.label}</a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center mt-10">
            <div className="w-1/6">
              <Link href="/user">
                <p>
                  <FaUserCircle className="text-4xl cursor-pointer" />
                </p>
              </Link>
            </div>
            {/* <div className="flex-1"> */}
            <Link className="flex-1" href="/pricing">
              <Button
                className="py-5 font-bold w-full"
                icon={<FaLightbulb className=" text-yellow-500 " />}
                Label="Pricing"
                style="Secondary"
                type="button"
              />
            </Link>
            {/* </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
