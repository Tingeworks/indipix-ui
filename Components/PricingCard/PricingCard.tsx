import { Button } from "@nextui-org/react";
import Link from "next/link";
import CONFIG from "../../CONFIG";
import nookies, { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";

const modal = () => {
  return <div className="bg-[#ffffff8a]"></div>;
};

export default function PricingCard(props: any) {
  const cookies = parseCookies();
  const router = useRouter();
  const [overlayStatus, setOverlayStatus] = useState(false);

  const subscribe = (id: number) => {
    if (props.loggedIn == true) {
      fetch(`${CONFIG.API_URL}/orders/createOrder`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: id as number,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          router.push(`/checkout/select?pi=${data.clientSecret}`);
        });
    } else {
      setOverlayStatus(true);
      setCookie(null, "redirect_user_to", `/price`, {
        maxAge: 30 * 24 * 60 * 60 * 60 * 60,
        path: "/",
      });
    }
  };

  return (
    <div className={`bg-white`}>
      {props.favourite ? (
        <div className="h-8 flex items-center justify-center bg-yellow-400 text-xs font-bold uppercase">
          recommended
        </div>
      ) : (
        <div
          className="h-8
    "
        ></div>
      )}
      {overlayStatus == false ? (
        <div className="px-5 py-2">
          <h3 className="fonts-bold text-lg mt-5">{props.title}</h3>
          {props.loggedIn == true ? "hello" : "Bye"}
          <div className="text-sm">{props.description}</div>

          <p className="mt-10 text-3xl font-bold">{props.limit}</p>
          <p>Downloads</p>
          <p className="text-xl font-bold">{props.price}</p>

          {/* <Link href={`/checkout/select?id=${props.id}`}> */}
          {props.price != "Custom" ? (
            <button
              onClick={() => subscribe(props.id)}
              className="px-5 py-2 border-2 border-black rounded-full mt-5 hover:bg-black hover:text-white"
            >
              {props.buttonLabel}
            </button>
          ) : (
            <Link href="/contact">
              <button className="px-5 py-2 border-2 border-black rounded-full mt-5 hover:bg-black hover:text-white">
                {props.buttonLabel}
              </button>
            </Link>
          )}
          {/* </Link> */}

          <ul className="list-disc list-inside p-5 mt-5">
            <li className=" text-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </li>
            <li className=" text-xs">Lorem ipsum dolor sit amet.</li>
            <li className=" text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum!
            </li>
            <li className=" text-xs">Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      ) : (
        <div className="px-5 py-2 flex items-center justify-center h-full">
          <div>
            <h3 className="text-xl mb-2">You are not logged In.</h3>
            <div className="flex justify-center items-center gap-3 flex-col">
              <Link href={"/auth/login"}>
                <a className="w-full px-5 py-2 hover:bg-black hover:border-black transition-colors bg-red-700  border-2 border-red-700 text-white">Login</a>
              </Link>
              <Link href={"/auth/login"}>
                <a className="w-full px-5 py-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white font-bold transition-colors">Register</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
