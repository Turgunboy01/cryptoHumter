import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@mui/material";
import React from "react";
import { CryptoState } from "../context/CryptoContext";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = ({ setClickWatch }) => {
  const { currency, setCurrency } = CryptoState();

  //   const history = useHistory();
  return (
    <div className="bg-[#14161A]">
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar className="flex justify-between">
              <Typography
                //   onClick={() => history.push(`/`)}
                variant="h6"
                className="uppercase font-semibold text-[#87CEEB]"
              >
                Cryptofolio
              </Typography>
              <div className="flex gap-[15px]">
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  style={{
                    width: 100,
                    height: 40,
                    marginLeft: 15,
                    border: "1px solid #fff",
                    color: "#fff",
                  }}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"INR"}>INR</MenuItem>
                  <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
                <button
                  onClick={() => setClickWatch(true)}
                  className="px-[19px] py-[8px] font-semibold bg-[#87CEEB] rounded "
                >
                  WHATCH LIST
                </button>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
