import React, { createContext, useContext } from "react";
import create from "zustand";

const useCartStore = create((set) => ({
  data: [],
  totalItems: 0,
  totalAmounts: 0,

  addToCart: (payload) =>
    set((state) => {
      const existingItemIndex = state.data.findIndex(
        (item) => item.id === payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedData = state.data.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + payload.quantity;
            const newTotalPrice = newQuantity * item.price;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: newTotalPrice,
            };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedData));
        return {
          data: updatedData,
          totalItems: state.totalItems,
          totalAmounts: state.totalAmounts,
        };
      } else {
        const updatedData = [...state.data, payload];
        localStorage.setItem("cart", JSON.stringify(updatedData));
        return {
          data: updatedData,
          totalItems: state.totalItems + 1,
          totalAmounts: state.totalAmounts,
        };
      }
    }),
  removeItem: (payload) =>
    set((state) => {
      const updatedData = state.data.filter((item) => item.id !== payload.id);
      localStorage.setItem("cart", JSON.stringify(updatedData));
      return {
        data: updatedData,
        totalItems: state.totalItems - 1,
        totalAmounts: state.totalAmounts,
      };
    }),
}));

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const store = useCartStore();
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
