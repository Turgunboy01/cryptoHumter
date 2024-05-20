import React from "react";
import useCartStore from "../context/useCardStore";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./CointsTable";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const WatchList = ({ setClickWatch, clickWatch }) => {
  const { data, removeItem } = useCartStore();
  const { symbol } = CryptoState();
  const handleDelate = (id) => {
    removeItem({ id: id });
  };
  return (
    <div
      className={`h-[100vh] w-[500px] fixed top-0 ${
        clickWatch ? "right-0" : "right-[-100%]"
      }  overflow-y-scroll transition-all   bg-[#515151] p-[50px] divScroll`}
    >
      {data.length > 0 ? (
        <>
          <div className=" grid grid-rows-2 grid-cols-2 relative  gap-[25px]">
            {data.map((item) => (
              <div
                key={item.id}
                className="w-[200px] h-[250px] flex justify-center items-center  flex-col h-[250px] rounded-[25px] bg-[#14161A]"
              >
                <img
                  src={item.image}
                  className="w-[120px] h-[120px] object-cover"
                  alt=""
                />
                <h3 className="text-[#fff] mt-4">
                  {symbol} {numberWithCommas(item.current_price.toFixed(2))}
                </h3>
                <button
                  className="bg-[#FF0000] rounded-lg px-3 py-1 text-[#fff] mt-3"
                  onClick={() => handleDelate(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <IconButton sx={{ position: "absolute", top: "-45px",right:'-25px' }} 
            onClick={() => setClickWatch(false)}
            >
              <Close />
            </IconButton>
          </div>
        </>
      ) : (
        <div className="">
          <div className="flex justify-center h-screen items-center  flex-col gap-2">
            <h3 className="text-[30px] font-semibold  text-[#fff]">No Items</h3>
            <button
              className="bg-[#FF0000] px-5 py-2 rounded-lg text-[#fff] mt-3"
              onClick={() => setClickWatch(false)}
            >
              Go Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchList;
