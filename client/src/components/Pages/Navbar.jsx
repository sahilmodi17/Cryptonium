import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/Context";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const navigateTo = useNavigate();
  const { currency, setCurrency } = useUserContext();

  const handleLogin = () => {
    navigateTo("/login");
  };

  const handleHome = () => {
    navigateTo("/");
  };

  const handleCurrency = (e) => {
    // console.log(e.target.value);
    if (e.target.value === "INR") {
      setCurrency("inr");
    }
    if (e.target.value === "USD") {
      setCurrency("usd");
    }
  };

  return (
    <>
      <nav className="w-full bg-gray-800 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-full md:items-center md:flex md:px-8">
          <div>
            <div
              className="flex items-center justify-between py-3 md:py-3 md:block cursor-pointer"
              onClick={handleHome}
            >
              <h2 className="text-3xl font-bold text-yellow-500">Cryptonium</h2>

              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-yellow-500">
                  <a href="/">Home</a>
                </li>
                <li className="text-white hover:text-yellow-500">
                  <a href="/blog">Blog</a>
                </li>
                <li className="text-white hover:text-yellow-500">
                  <a href="/about">About US</a>
                </li>
                <li className="text-white hover:text-yellow-500">
                  <a href="/contact">Contact US</a>
                </li>
              </ul>

              <div className=" mt-3 space-y-2 lg:hidden md:hidden">
                <button
                  className="inline-block w-full bg-yellow-500 hover:bg-yellow-400  font-bold py-2 px-4 rounded-lg"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block">
            <select
              className="py-2 pl-4 pr-6 rounded-lg bg-yellow-500 font-bold hover:bg-yellow-400 cursor-pointer"
              onChange={handleCurrency}
            >
              <option value="INR" className="bg-yellow-500 font-semibold">
                INR
              </option>
              <option value="USD" className="bg-yellow-500 font-semibold ">
                USD
              </option>
            </select>
            <button
              className="bg-yellow-500 hover:bg-yellow-400  font-bold py-2 px-4 rounded-lg"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
