import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useUserContext } from "../../context/Context";

const Banner = () => {
  const profit = useRef(false);
  const { currency } = useUserContext();
  const [trending, setTrending] = useState([]);

  const fetchTrending = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then((res) => {
        // console.log(res.data);
        setTrending(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(trending);

  useEffect(() => {
    // console.log(currency);
    fetchTrending();
  }, [currency]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const items = trending.map((coin) => {
    const price_change = coin.price_change_percentage_24h;
    // console.log(coin);
    // console.log(profit);
    if (price_change < 0) profit.current = false;
    else profit.current = true;

    return (
      <Link to={`/coins/${coin.id}`}>
        <div className=" flex flex-col items-center">
          <img src={coin.image} alt={coin.name} className="  h-28 md:h-32 " />
          <div className="flex flex-col justify-center items-center pt-2">
            <div className="text-yellow-500 text-2xl ">{coin.symbol}</div>
            <div className="text-indigo-400  flex justify-between  ">
              <div className="mr-1 text-lg">{coin.name}</div>

              {profit.current ? (
                <div className="text-green-700 text-lg">
                  {" +" + coin.price_change_percentage_24h.toFixed(2)} %
                </div>
              ) : (
                <div className="text-red-700  text-lg ">
                  {" " + coin.price_change_percentage_24h.toFixed(2)}%
                </div>
              )}
            </div>

            <div className="text-white text-xl pb-2">
              {currency === "inr" ? (
                <div>₹ {numberWithCommas(coin.current_price)}</div>
              ) : (
                <div>$ {numberWithCommas(coin.current_price)}</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };

  return (
    <>
      <div className="bg1 ">
        <div className="text-6xl font-mono text-yellow-500 flex justify-center items-center pt-6  animate-bounce">
          Cryptonium
        </div>
        <div className="text-2xl font- text-indigo-400 flex justify-center py-2 pb-8">
          Get All The Info About Your Fav Crypto Here
        </div>
        <div>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={2000}
            animationDuration={1500}
            responsive={responsive}
            autoPlay
            items={items}
            disableButtonsControls={true}
            disableDotsControls={true}
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
