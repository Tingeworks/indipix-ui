import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaInstagramSquare,
  FaPinterestP,
} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-zinc-800 pt-20 pb-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
        <div>
          <div className="flex">
            <Image src="/logoN.svg" height={54} width={164} alt="logo"></Image>
          </div>
          <p className="text-white text-sm mt-10 text-justify font-nunito">
            India&apos;s Largest Collection Of Stock Images
          </p>
        </div>

        <div className="text-white md:pl-24 font-nunito">
          <h1 className="text-2xl font-semibold">Help?</h1>
          <div className="mt-8 text-sm flex flex-col gap-2">
            <p>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>
            </p>
            <p>
              <Link href="/policy/terms">
                <a>Term & conditions</a>
              </Link>
            </p>
            <p>
              <Link href="/policy/refund">
                <a>Refund Policy</a>
              </Link>
            </p>
            <p>
              <Link href="/policy/privacy">
                <a>Privacy Policy</a>
              </Link>
            </p>
          </div>
        </div>

        <div className="text-white md:pl-20 font-nunito">
          <h1 className="text-2xl font-semibold">Contact</h1>
          <div className="mt-8 text-sm flex flex-col gap-2">
            <p>
              <a href="mailto:indipix@gmail.com">indipix@gmail.com</a>
            </p>
            <p>
              <a href="https://www.indipix.com">indipix.com</a>
            </p>
            <p>
              <a href="tel:8812565678">88 12565678</a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 flex justify-between items-center">
        <div>
          <p>
            <span className="text-white">&copy;</span>
            <span className="text-red-700">{year}</span>
            <span className="text-white text-sm">, Indipix</span>
          </p>
        </div>
        <div className="md:mr-10 flex md:text-2xl gap-5">
          <a className=" p-1 text-white rounded-md" href="#">
            <FaFacebookF />
          </a>
          <a className="p-1 text-white rounded-md" href="#">
            <BsTwitter />
          </a>
          <a className="p-1 text-white rounded-md" href="#">
            <FaInstagram />
          </a>
          <a className=" p-1 text-white rounded-md" href="#">
            <IoLogoYoutube />
          </a>
          <a className=" p-1 text-white rounded-md" href="#">
            <FaPinterestP />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
