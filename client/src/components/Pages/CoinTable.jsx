import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useUserContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";

import { numberWithCommas } from "./Function";

const CoinTable = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, coins, setCoins } = useUserContext();
  const navigateTo = useNavigate();
  const profit = useRef(true);
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search) ||
        coin.current_price.toString().startsWith(search)
      );
    });
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(handleSearch().length / 10);
    if (page < maxPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div>
        <div className="mt-2 md:text-4xl text-2xl text-center text-yellow-500">
          Cryptocurrency Prices by Market Cap
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-center">
            <div className="flex border-2 rounded">
              <input
                type="text"
                className="px-4 py-2 w-[75vw]"
                placeholder="Search your Crypto currency here..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-3 flex justify-center">
            <div className="w-[75vw] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="animate-pulse bg-yellow-400 h-2.5 rounded-full"></div>
              <div className="flex justify-center text-yellow-400 text-3xl animate-pulse">
                Loading please wait...
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-3 flex justify-center relative overflow-x-auto">
              <table className="w-[75vw] text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-lg text-gray-800  bg-yellow-500">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Coin
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      24h Change %
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Market Cap
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((coin) => {
                      const price_change = coin.price_change_percentage_24h;

                      if (price_change < 0) profit.current = false;
                      else profit.current = true;

                      return (
                        <tr
                          key={coin.id}
                          className=" border-b hover:bg-gray-700 cursor-pointer"
                          onClick={() => navigateTo(`/coins/${coin.id}`)}
                        >
                          <th
                            scope="coin"
                            className="flex mx-auto px-6 py-2  font-medium text-gray-900 whitespace-nowrap"
                          >
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className=" h-10 w-10 "
                            />
                            <div className="flex  flex-col   ml-3 text-indigo-300  ">
                              <span className="text-xl uppercase  ">
                                {coin.symbol}
                              </span>
                              <span className="text-sm">{coin.name}</span>
                            </div>
                          </th>
                          <td className="px-6 py-2">
                            {profit.current ? (
                              <div className="text-green-700 text-xl ">
                                {currency === "inr" ? (
                                  <div>
                                    ₹ {numberWithCommas(coin.current_price)}
                                  </div>
                                ) : (
                                  <div>
                                    $ {numberWithCommas(coin.current_price)}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-red-700 text-xl ">
                                {currency === "inr" ? (
                                  <div>
                                    ₹ {numberWithCommas(coin.current_price)}
                                  </div>
                                ) : (
                                  <div>
                                    $ {numberWithCommas(coin.current_price)}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-2">
                            {profit.current ? (
                              <div className="text-green-700 text-xl ">
                                {coin.price_change_percentage_24h + "%"}
                              </div>
                            ) : (
                              <div className="text-red-700 text-xl ">
                                {coin.price_change_percentage_24h + "%"}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-2 text-xl text-indigo-300">
                            {currency === "inr" ? (
                              <div>
                                ₹{" "}
                                {numberWithCommas(coin.market_cap)
                                  .toString()
                                  .slice(0, -6)}
                                M
                              </div>
                            ) : (
                              <div>
                                ${" "}
                                {numberWithCommas(coin.market_cap)
                                  .toString()
                                  .slice(0, -6)}
                                M
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="flex  mt-5 justify-center mx-auto">
              <button
                type="button"
                className="bg-yellow-400 mr-2 rounded-l-md  py-2 hover:bg-yellow-500 hover:text-gray-200 px-3"
                onClick={handlePrevPage}
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="ml-2">Prev</p>
                </div>
              </button>

              <button
                type="button"
                className="bg-yellow-400   rounded-r-md py-2  hover:bg-yellow-500 hover:text-gray-200 px-3"
                onClick={handleNextPage}
              >
                <div className="flex flex-row align-middle">
                  <span className="mr-2">Next</span>
                  <svg
                    className="w-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoinTable;
