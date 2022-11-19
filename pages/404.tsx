import Link from "next/link";
import Button from "../Components/Form/Button";
import SEO from "../Components/Misc/SEO";

export default function Custom404() {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <SEO title="Indipix" description="" keywords="" />
      <div className="flex flex-col items-center justify-center w-4/12">
        <img src="/404.gif" className="w-56 object-center" />
        <p className="text-gray-400 uppercase">Try again later</p>
        <h1 className="text-3xl text-center uppercase font-bold">
            Something seems out of place
        </h1>
        <Button className="py-2 px-4 mt-4 rounded-sm" Label="Return Home" style="Primary" url="/" type="button" />
      </div>
    </div>
  );
}
