import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/CointsTable";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(coin);
  if (!coin) return <LinearProgress style={{ backgroundColor: "87CEEB" }} />;

  return (
    <div className="flex h-[92.5vh] overflow-hidden bg-[#000] text-[#fff]">
      <div className="flex-[.3] border-r h-screen flex-col  flex p-[30px]  ">
        <div className="flex flex-col items-center mb-[20px]">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" sx={{ fontWeight: "700px" }}>
            {coin?.name}
          </Typography>
        </div>
        <Typography variant="subtitle1" className="">
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className="mt-5">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", justifyContent: "start" }}>
            <Typography variant="h5" className="">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <div className="flex-[.7]">
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
