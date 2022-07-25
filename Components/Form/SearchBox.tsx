// Core Library Imports
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Input from "./Input";

/** Textfield in the banner component */
const SearchBox: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full flex bg-white py-4 rounded-sm shadow-lg">
      <div className=" text-gray-600 px-4 flex items-center">
        <FaSearch />
      </div>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(values) => {
          router.push(`/imgs/${values.search}`);
        }}
      >
        <Form>
          <Input
            usingFormik
            id="search"
            name="search"
            placeholder="Search for images and galleries"
            type="text"
            className="focus:outline-none pl-1 flex-1 w-full"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBox;
