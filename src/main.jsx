import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CryptoContext from "./context/CryptoContext.jsx";
import { CartProvider } from "./context/useCardStore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <CryptoContext>
        <App />
      </CryptoContext>
    </CartProvider>
  </React.StrictMode>
);
