import React, { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import ApexChart from "react-apexcharts";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency, availableCurrencies } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const options = {
    chart: {
      id: "basic-bar",
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      categories: historicData.map((coin) => coin[0]),
      labels: {
        rotate: -45, // Rotate x-axis labels
        formatter: function (value, timestamp) {
          const date = new Date(timestamp);
          let hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          const strTime = `${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes} ${ampm}`;
          return days === 1 ? strTime : date.toLocaleDateString();
        },
        datetimeFormatter: {
          minute: "hh:mm TT", // Customize the label format for minute
          hour: "hh:mm TT", // Customize the label format for hour
          day: "dd MMM", // Customize the label format for day
        },
      },
      tickAmount: days === 1 ? 24 * 2 : undefined, // Ensure ticks for every 30 minutes if 1 day is selected
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
      colors: "#87CEEB", // Line rangi #87CEEB
    },
    grid: {
      show: false, // Grid chiziqlarini o'chirish
    },
  };

  const series = [
    {
      name: `Price ( Past ${days} Days ) in ${currency}`,
      data: historicData.map((coin) => coin[1]),
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex items-center flex-col justify-center mt-10 p-10">
        {!historicData.length || !flag ? (
          <CircularProgress
            style={{ color: "#87CEEB" }}
            size={250}
            thickness={1}
          />
        ) : (
          <div className="w-full">
            <div className=" flex justify-center items-center gap-2">
              <span className="w-[50px] h-[20px] border border-[3px] border-[#87CEEB]"></span>
              <h2 style={{}}>
                Price ( Past: {days} Days ) in {currency},
              </h2>
            </div>
            <ApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
