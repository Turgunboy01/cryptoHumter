import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
  }, [days, coin, currency]); // coin va currency ni bog'lanishga qo'shildi

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <div className="">
      <ThemeProvider theme={darkTheme}>
        <div className="flex items-center flex-col justify-center mt-[30] p-[40px]">
          {!historicData || flag === false ? ( // Mantiqiy operator to'g'irlandi
            <CircularProgress
              style={{ color: "#87CEEB" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#87CEEB",
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
            </>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default CoinInfo;
