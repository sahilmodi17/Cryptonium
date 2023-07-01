import React from "react";

import Banner from "./Banner";
import CoinTable from "./CoinTable";
import Pagination from "./Pagination";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="w-[75vw] mx-auto">
        <CoinTable />
        <div className="mt-3 text-center">{/* <Pagination /> */}</div>
      </div>
    </>
  );
};

export default Home;
