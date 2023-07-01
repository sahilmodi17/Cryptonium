import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/Context";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "./Function";

const CoinInfo = ({ coin }) => {
  // console.log(coin);
  const { currency } = useUserContext();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);

  const fetchChart = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      console.log(response.data.prices);
      setHistoricalData(response.data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [currency, days]);

  return (
    <>
      {!historicalData ? (
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
        <div className="md:w-[75%] flex flex-col items-center justify-center md:mt-7 md:p-10 m-2 p-5 ">
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="flex  w-[100%] justify-around mt-5">
            {chartDays.map((day) => (
              <div key={day.value}>
                <button
                  className={`border hover:bg-yellow-400 hover:text-black text-indigo-200 font-mono text-xl py-1 px-2 sm:py-2 sm:px-4 rounded-lg ${
                    selectedDay === day.value ? "bg-yellow-400 text-black" : ""
                  }`}
                  onClick={() => {
                    setDays(day.value);
                    setSelectedDay(day.value);
                  }}
                >
                  {day.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CoinInfo;
