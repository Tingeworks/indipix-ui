import { Button } from "@nextui-org/react";
import Link from "next/link";
import CONFIG from "../../CONFIG";
import nookies, { parseCookies } from "nookies"
import {useRouter} from "next/router";

export default function PricingCard(props: any) {
  const cookies = parseCookies();
  const router = useRouter();

  const subscribe = (id: number) => {
    fetch(`${CONFIG.API_URL}/orders/createOrder`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${cookies.jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subscriptionId: id as number
      })
    })
    .then(res => res.json())
    .then(data => {
      router.push(`/checkout/select?pi=${data.clientSecret}`);
    })
  }

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
      <div className="px-5 py-2">
        <h3 className="fonts-bold text-lg mt-5">{props.title}</h3>
        <div className="text-sm">{props.description}</div>

        <p className="mt-10 text-3xl font-bold">{props.limit}</p>
        <p>Downloads</p>
        <p className="text-xl font-bold">{props.price}</p>

        {/* <Link href={`/checkout/select?id=${props.id}`}> */}
          <button onClick={()=> subscribe(props.id)} className="px-5 py-2 border-2 border-black rounded-full mt-5 hover:bg-black hover:text-white">
            {props.buttonLabel}
          </button>
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
    </div>
  );
}
