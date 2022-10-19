// Core Library Imports
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Input from "./Input";

interface props {
  className?: string;
}

/** Textfield in the banner component */
const SearchBox: React.FC<props> = (props) => {
  const router = useRouter();
  return (
    <div
      className={`w-full flex p-1 items-center rounded-full shadow-lg ${props.className}`}
    >
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(values) => {
          router.push({
            pathname: "/search",
            query: { value: values.search },
          });
        }}
      >
        <Form className="flex-1 px-2">
          <Input
            usingFormik
            id="search"
            name="search"
            placeholder="Search for humans, plants and more"
            type="text"
            className="focus:outline-none pl-1 flex-1"
          />
        </Form>
      </Formik>
      <div className=" text-white flex items-center">
        <button
          type="submit"
          className="px-6 py-3 rounded-full"
          style={{
            background:
              "linear-gradient(270deg, rgba(234, 105, 64, 0.75) 0%, rgba(236, 48, 48, 0.75) 100%)",
          }}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
