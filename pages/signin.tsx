// NextJS & React imports
import Link from "next/link";

// Third Party imports
import { FaFacebook, FaGoogle } from "react-icons/fa";
import ForgotPass from "../Components/ForgotPass";
import NameAndPass from "../Components/nameAndPass";



const SignIn = () => {
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
                                        <span>Don&apos;t have an account?</span>
                                    </button>
                                    <button className="block">
                                        <Link href="/help/SignUP">
                                            <a>Sign Up here</a>
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
                                    <h1 className="text-4xl font-medium mb-5 text-center text-slate-800">Sign In</h1>
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
                                    <span className="relative -top-3.5 bg-white inline-block px-3"> or Sign In with Email</span>
                                </div>
                            </div>
                            <form action="" className="form">

                               
                               <NameAndPass/>
                               <ForgotPass/>

                                <label htmlFor="submit">
                                    <input type="submit" name="submit" value="Sign In" className="border border-slate-200 rounded w-full py-2 px-3 mt-7 text-slate-50 bg-red-500 leading-tight focus:outline-none focus:shadow-outline" />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
