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
      className={`w-full flex items-center rounded-full shadow-lg p-2 ${props.className}`}
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
        <Form className="flex-1 flex justify-between">
          <Input
            usingFormik
            id="search"
            name="search"
            placeholder="Search for humans, plants and more"
            type="text"
            className="focus:outline-none pl-6 flex-1"
          />
          <div className=" text-white flex items-center">
            <button
              type="submit"
              className="px-6 py-6 rounded-full"
              style={{
                background:
                  "linear-gradient(270deg, rgba(234, 105, 64, 0.75) 0%, rgba(236, 48, 48, 0.75) 100%)",
              }}
            >
              <FaSearch />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBox;
