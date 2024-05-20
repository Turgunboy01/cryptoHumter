import React, { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import WatchList from "./components/WatchList";

const App = () => {
  const [clickWatch, setClickWatch] = useState(false);
  return (
    <div className="relative">
      <BrowserRouter>
        <Header setClickWatch={setClickWatch} />

        <Routes>
          <Route path="/" element={<Home setClickWatch={setClickWatch} />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <div className="absolute top-0 right-0">
          {clickWatch && (
            <WatchList setClickWatch={setClickWatch} clickWatch={clickWatch} />
          )}{" "}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
