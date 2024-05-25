import { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
// import { unstable_HistoryRouter } from "react-router-dom";
import { CoinList } from "../config/api";
import { ThemeProvider } from "@emotion/react";
import {
  Container,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  createTheme,
  makeStyles,
} from "@mui/material";
import axios from "axios";
import { RemoveRedEye } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
// import useCartStore from "../context/useCardStore";
import { useCart } from "../context/useCardStore";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CointsTable = ({ setClickWatch }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();
  const { addToCart, data } = useCart();
  console.log(data);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const handleAddToCart = (product) => {
    const tempProduct = {
      ...product,
    };
    addToCart(tempProduct);
    setClickWatch(true);
  };

  return (
    <div className="bg-[#14161A] tables">
      <ThemeProvider theme={darkTheme}>
        <Container className="text-center py-[30px]">
          <Typography variant="h4" className=" text-[#eee]">
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{
              marginBotom: "20px",
              width: "100%",
              marginTop: 20,
              color: "#fff",
            }}
            color=""
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "#87CEEB" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "white",
                            marginTop: "50px",
                            backgroundColor: "#87CEEB",
                            fontWeight: "700",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          className="bg-[#16171A] hover:bg-[#09050ae8]"
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={() => navigate(`/coins/${row.id}`)}
                            style={{
                              display: "flex",
                              gap: 15,
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              style={{ marginBottom: 10, height: "50px" }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                  color: "#fff",
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right" sx={{ color: "white" }}>
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            <IconButton onClick={() => handleAddToCart(row)}>
                              <RemoveRedEye
                                onClick={() => handleAddToCart(row)}
                                sx={{
                                  color:
                                    profit > 0 ? "rgb(14, 203, 129)" : "white",
                                }}
                              />
                            </IconButton>
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" sx={{ color: "white" }}>
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className="pagination"
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};
