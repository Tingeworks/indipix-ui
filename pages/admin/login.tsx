import axios from "axios";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../../Components/Form/Button";
import ButtonWithIcon from "../../Components/Form/ButtonWithIcon";
import Input from "../../Components/Form/Input";
import AdminLayout from "../../Components/Layout/AdminLayout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";

const Login: NextPage = () => {
  return (
    <>
      <SEO title="Indipix Admin" description="" keywords="" />
      {/* <AdminLayout isLoggedIn={false} center={true}> */}
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-10/12 xl:w-4/12 bg-white shadow-lg p-10">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              
              const { data } = await axios.post(
                `${CONFIG.API_URL}/auth/local`,
                {
                  email: values.email,
                  password: values.password,
                }
              );
             }}
          >
            <Form>
              <h1 className="text-3xl font-bold mb-5">Login</h1>

              <Input
                usingFormik
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="border"
                padding="p-2"
              />

              <Input
                usingFormik
                id="password"
                type="password"
                name="password"
                placeholder="password"
                className="border mt-2"
                padding="p-2"
              />
              
              <Button Label="Signin" type="submit" style="Primary" icon={<FaSignInAlt/>} className="mt-5 w-full" />
            </Form>
          </Formik>
        </div>
        </div>
      {/* </AdminLayout> */}
    </>
  );
};

export default Login;
