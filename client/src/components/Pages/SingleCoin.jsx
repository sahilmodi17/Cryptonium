import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/Context";
import axios from "axios";
import { numberWithCommas } from "./Function";
import CoinInfo from "./CoinInfo";

const SingleCoin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency } = useUserContext();

  const fetchCoin = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  return (
    <>
      {!coin ? (
        <div>
          <div className="mt-3 flex justify-center">
            <div className="w-[75vw] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="animate-pulse bg-yellow-400 h-2.5 rounded-full"></div>
              <div className="flex justify-center text-yellow-400 text-3xl animate-pulse">
                Loading please wait...
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col justify-center md:w-[30%] w-[100%] items-center mt-7 border-r-2 border-gray-400">
            <img
              src={coin?.image.large}
              alt={coin?.name}
              className="h-48 m-5"
            />
            <div className="text-6xl font-mono text-yellow-400 mx-auto overflow-hidden overflow-ellipsis max-w-[80%] text-center">
              {coin?.name}
            </div>
            <div className="text-gray-200 font-mono mt-5 mx-5">
              <div className="text-justify">
                {coin?.description.en.split(". ")[0]}.
              </div>
              <div className="text-3xl font-sans text-gray-200 mt-5">
                Rank: {coin?.market_cap_rank}
              </div>
              <div className="text-3xl font-sans text-gray-200">
                {currency === "inr" ? (
                  <div className="mt-3">
                    Current Price: ₹{" "}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}
                    <div className="text-3xl mt-3">
                      Market Cap: ₹{" "}
                      {numberWithCommas(
                        coin?.market_data.market_cap[currency.toLowerCase()]
                      )
                        .toString()
                        .slice(0, -6)}{" "}
                      M
                    </div>
                  </div>
                ) : (
                  <div className="">
                    Current Price: ${" "}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}
                    <div className="text-3xl mt-3">
                      Market Cap: ${" "}
                      {numberWithCommas(
                        coin?.market_data.market_cap[currency.toLowerCase()]
                      )
                        .toString()
                        .slice(0, -6)}{" "}
                      M
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <CoinInfo coin={coin} />
        </div>
      )}
    </>
  );
};

export default SingleCoin;
