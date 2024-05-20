import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      //   className="border border-[gold] rounded px-5"
      style={{
        border: "1px solid #87CEEB",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        cursor: "pointer",
        backgroundColor: selected ? "#87CEEB" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "#87CEEB",
          color: "black",
        },
        width: "22%",
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
