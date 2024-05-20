import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner/Banner";
import { CointsTable } from "../components/CointsTable";

const Home = ({ setClickWatch }) => {
  return (
    <div>
      <Banner />
      <CointsTable setClickWatch={setClickWatch} />
    </div>
  );
};

export default Home;
