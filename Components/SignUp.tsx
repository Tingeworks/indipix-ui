// NextJS & React imports
import Link from "next/link";

// Third Party imports
import { FaFacebook, FaGoogle } from "react-icons/fa";


// Signup Component
const SignUp = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div className="w-2/4">
          <div style={{ backgroundImage: "url(/images/bgimg.png)" }} className="w-full h-screen bg-no-repeat bg-center bg-100%">
            <div className="realtive h-full flex justify-center items-center">
              <div className="w-7/12 text-white">
                <div className="">
                  <div className=" ">
                    <h2 className="text-3xl font-semibold mb-5 overflow-hidden before:content-[''] before:bg-white before:inline-block before:h-0.5 before:relative before:align-middle before:w-2/12 before:right-1 before:-mr-2/4 after:content-[''] after:bg-white after:inline-block after:h-0.5 after:relative after:align-middle after:w-2/12 after:left-1 after:-mr-2/4 ">Indipix</h2>
                    <h1 className="text-5xl font-semibold mb-5">Turn your ideas Into reality</h1>
                    <p className="mb-24 text-slate-100">
                      Get a style guide and utility pages so making changes adapting.
                    </p>
                  </div>
                </div>

                <div className="">
                  <button className="block">
                    <span>Already have an account?</span>
                  </button>
                  <button className="block">
                    <Link href="/help/SignIn">
                      <a>Sign In</a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/4 h-full text-1xl drop-shadow-2xl">
          <div className="flex h-screen justify-center items-center">
            <div className="w-11/12 h-10/12 bg-white p-10 rounded-lg">
              <div>
                <div>
                  <h1 className="text-4xl font-medium mb-5 text-center text-slate-800">Sign Up</h1>
                  <div className="flex text-slate-500">
                    <button className="w-2/4 border drop-shadow-xl py-2 px-5 mr-3">
                      <a href="#" className="flex items-center">{<FaGoogle className="mr-3 text-red-600" />} Sign Up with Google</a>
                    </button>
                    <button className="w-2/4 border drop-shadow-xl py-2 px-5">
                      <a href="#" className="flex items-center">{<FaFacebook className="mr-3 text-blue-600" />}Sign Up with Facebook</a>
                    </button>
                  </div>
                </div>
                <div className="my-10 text-center text-slate-500 h-1 border-t-2 relative">
                  <span className="relative -top-3.5 bg-white inline-block px-3"> or Sign Up with Email</span>
                </div>
              </div>
              <form action="" className="form">
                <label htmlFor="name">
                  <input type="text" name="name" placeholder="Enter Full name" className="border border-slate-200 rounded w-6/12 py-2 px-3 mr-7 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label htmlFor="username">
                  <input type="text" name="username" placeholder="Username" className="border border-slate-200 rounded w-5.5/12 py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label htmlFor="email">
                  <input type="email" name="email" placeholder="Enter your Email" className="border border-slate-200 rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label htmlFor="password">
                  <input type="password" name="password" placeholder="Enter Password" className="border border-slate-200 rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label htmlFor="password">
                  <input type="password" name="password" placeholder="Confirm Password" className="border border-slate-200 rounded w-full py-2 px-3 mb-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <div className="flex items-center">
                  <input id="signup-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" />
                  <label htmlFor="signup-checkbox" className="ml-2 text-sm font-medium text-gray-900">I&apos;ve read and agree with your <Link href="/help/privacy-policy">
                    <a className="text-red-500">Privacy Policy</a>
                  </Link> and <Link href="/help/terms-condition">
                      <a className="text-red-500">Terms &amp; Conditions</a>
                    </Link></label>
                </div>
                <label htmlFor="submit">
                  <input type="submit" name="submit" value="Sign Up" className="border border-slate-200 rounded w-full py-2 px-3 mt-7 text-slate-50 bg-red-500 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
