import React from "react";
import AppContext from "../context";

function Info({ title, desctiption, image }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cart_empty">
      <img src={image} alt="img-cart-empty" />
      <h2>{title}</h2>
      <p>{desctiption}</p>
      <button
        onClick={() => setCartOpened(false)}
        className="cart_empty__button green_button"
      >
        back to shop
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="line"
            d="M1 7H14.7143"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="arrow"
            d="M8.71436 1L14.7144 7L8.71436 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
export default Info;
