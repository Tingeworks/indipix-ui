// NextJS & React imports
import axios from "axios";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import Link from "next/link";

// Third Party imports
import nookies, { parseCookies } from "nookies";
import Button from "../../Components/Form/Button";

// Domestic imports
import Layout from "../../Components/Layout/Layout";
import SEO from "../../Components/Misc/SEO";
import CONFIG from "../../CONFIG";

/** Home page */
const Submit: NextPage = () => {
  const { jwt } = parseCookies();

  return (
    <Layout isLoggedIn={jwt ? true : false}>
      <SEO title="Submit a new photo | Indipix" description="" keywords="" />
      <div className="flex flex-col md:flex-row gap-10 container mx-auto px-5 lg:px-10 xl:px-20 py-20">
        <div className="w-full md:w-4/12">
          <h2 className=" text-2xl font-bold ">Upload your images</h2>
          <p className="text-sm">PNG &amp; JPEG files are allowed</p>

          <div className="mt-5 p-20 bg-gray-100 border-4 border-dashed rounded border-gray-200"></div>
        </div>

        <div className="pt-12 flex-1 text-sm">
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
              <div className="flex flex-col w-full">
                <label className="font-bold" htmlFor="name">
                  Name
                </label>
                <input
                  placeholder="e.g. Hill Tracks"
                  className="w-full p-2 focus:outline-none border rounded mt-1 "
                  id="name"
                  name="name"
                  type="text"
                />
              </div>

              <div className="flex flex-col w-full mt-5">
                <label className="font-bold" htmlFor="name">
                  Location
                </label>
                <div className="flex gap-3">
                  <input
                    placeholder="India"
                    className="p-2 focus:outline-none border rounded mt-1 w-1/3"
                    id="country"
                    name="country"
                    type="text"
                    disabled
                  />
                  <input
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full p-2 focus:outline-none border rounded mt-1"
                    id="name"
                    name="name"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full mt-5">
                <label className="font-bold" htmlFor="description">
                  Description
                </label>
                <textarea
                  placeholder="Summarize your image"
                  className="w-full p-2 focus:outline-none border rounded mt-1 "
                  id="description"
                  name="description"
                  rows={5}
                ></textarea>
              </div>

              <div className="flex gap-5 mt-5 w-full">
                <div className="w-3/12">
                  <label className="font-bold" htmlFor="name">
                    Price
                  </label>
                  <div className="flex  p-2 border rounded mt-1 gap-5">
                  <span className="text-gray-500">₹</span>
                    <input
                      placeholder="00.00"
                      className="w-full focus:outline-none text-right"
                      id="name"
                      name="name"
                      type="number"
                      step={1.0}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="font-bold" htmlFor="name">
                    You'll recieve
                  </label>
                  <div className="flex  p-2 border rounded mt-1 gap-5 opacity-80">
                    <span className="text-gray-500">₹</span>
                    <input
                      disabled
                      placeholder="00.00"
                      className="w-full focus:outline-none text-right bg-white"
                      id="name"
                      name="name"
                      type="number"
                      step={1.0}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full mt-5">
                <label className="font-bold" htmlFor="name">
                  Additional Tags
                </label>
                <input
                  placeholder="e.g. Hill Tracks"
                  className="w-full p-2 focus:outline-none border rounded mt-1 "
                  id="name"
                  name="name"
                  type="text"
                />
                <small>Maximum 5 tags, separate using comma</small>
              </div>


              <div className="mt-5 flex gap-3">
                <input type="checkbox" name="" id="" />
                <p className="text-gray-500">By submiting I agree to comply with the <Link href="/policy"><a className="
                text-[#C72127]">terms and condition</a></Link></p>
              </div>


              <div className="mt-20">
                <button className="bg-[#C72127] hover:bg-black text-white py-3 px-10 rounded w-full md:w-auto " type="submit">Submit</button>
                {/* <Button className="px-20" Label="Submit" type="submit" style="Primary" /> */}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

// export async function getServerSideProps(context:any) {
//   const cookies = nookies.get(context);

//   const {data} = await axios.get(`${CONFIG.API_URL}/users/me`, {
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU4NjY2ODMzLCJleHAiOjE2NjEyNTg4MzN9.lUoQ_FSyaI-gzZfH6hJB7xlKutVU_5v0VCxLfWns56c`
//     }
//   });

//   return {
//     props: {
//       user: data,
//     },
//   };
// }

export default Submit;
