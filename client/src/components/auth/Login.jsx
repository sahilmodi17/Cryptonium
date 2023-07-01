import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleLogin = () => {};
  const handleSignInWithGoogle = () => {};

  const email = "";
  const password = "";

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="mb-2">
                <h1 className="text-2xl font-semibold max-w-xs w-64 text-center">
                  Login to your account
                </h1>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="mb-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="mb-3 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%]"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  <div className="relative text-center flex items-center">
                    <div className="border border-gray-300 w-[110px] h-0 mr-2 my-2"></div>
                    <div>or</div>
                    <div className="border border-gray-300 w-[110px] h-0 ml-2 my-2"></div>
                  </div>

                  <div className="relative text-center border-2 rounded">
                    <button
                      className="flex items-center justify-center hover:bg-gray-100 py-2 px-4 rounded w-[100%]"
                      onClick={handleSignInWithGoogle}
                    >
                      <FcGoogle className="mr-2 w-6 h-6" /> Sign in with google
                    </button>
                  </div>

                  <div className="text-center text-blue-500 text-sm">
                    <Link
                      className="text-blue-500 py-2 px-4  cursor-pointer rounded"
                      to="/register"
                    >
                      you don't have an account ?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
