import React from "react";

import Info from "../Info";

import axios from "axios";

import "./CartStyles.scss";

import AppContext from "../../context";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function Cart({ onClose, booleanCart, items = [], onRemove }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [loadingOrder, setloadingOrder] = React.useState(false);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    try {
      setloadingOrder(true);
      const { data } = await axios.post(
        "https://65eb66ad43ce16418933cd79.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

        

      for (let i = 0; i < cartItems.length; i++) {
        await delay(1000);
        const item = cartItems[i];
        await axios.delete(`https://65eb66ad43ce16418933cd79.mockapi.io/cart/${item.id}`);
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }

    setloadingOrder(false);
  };

  return (
    <div className={booleanCart ? "cart_overlay active" : "cart_overlay"}>
      <div className="cart">
        <div className="cart__head">
          <h3 className="cart__title">Cart</h3>
          <button onClick={onClose} className="cart__close button_card">
            <img src="img/delete-product.svg" alt="img-close" />
          </button>
        </div>
        {items.length > 0 ? (
          <>
            <div className="cart__blocks">
              {items.map((obj) => (
                <div key={obj.id} className="cart__block">
                  <div className="cart__block_img">
                    <img src={obj.image} alt="img-product" />
                  </div>
                  <div className="cart__block_content">
                    <h4 className="cart__block_title">{obj.nameProduct}</h4>
                    <span className="cart__block_sum">${obj.price}</span>
                  </div>
                  <button
                    className="cart__block_delete button_card"
                    onClick={() => onRemove(obj.id)}
                  >
                    <img src="img/delete-product.svg" alt="img-delete" />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart__total_sum">
              <span>Total:</span>
              <div className="cart__total_sum_line"></div>
              <span>{totalPrice}$</span>
            </div>
            <button
              disabled={loadingOrder}
              onClick={onClickOrder}
              className="cart__checkout green_button"
            >
              checkout
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
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Order Done!" : "Cart empty"}
            desctiption={
              isOrderComplete
                ? `Your order id #${orderId} . Your order is being processed.`
                : "Add at least one pair of sneakers to order."
            }
            image={
              isOrderComplete ? "img/checkout-done.png" : "img/empty-box.png"
            }
          />
        )}
      </div>
    </div>
  );
}
export default Cart;
