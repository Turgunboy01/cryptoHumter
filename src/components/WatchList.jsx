import React from "react";
import useCartStore from "../context/useCardStore";

const WatchList = ({ setClickWatch, clickWatch }) => {
  const { data, removeItem } = useCartStore();
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
          <div className=" grid grid-rows-2 grid-cols-2  gap-[25px]">
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
                  {item.current_price.toFixed(2)}
                </h3>
                <button
                  className="bg-[#FF0000] rounded-lg px-3 py-1 text-[#fff] mt-3"
                  onClick={() => handleDelate(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="">
          <div className="flex justify-center h-screen items-center  flex-col gap-2">
            <h3 className="text-[30px] font-semibold ">No Items</h3>
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