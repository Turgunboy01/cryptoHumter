import { Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";
const Banner = () => {
  return (
    <div className="banner py-[60px]">
      <Container>
        <div className=" flex flex-col justify-center items-center py-[30px] ">
          <Typography
            variant="h2"
            className=" font-bold"
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "60px",
              //   fontFamily: "Montserrat",
              color: "#87CEEB",
            }}
          >
            Cryptofolio watch list
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
            //   fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
