import React from "react";

import AppContext from "../../context";

import "./CardStyles.scss";

function Card({
  id,
  nameProduct,
  price,
  image,
  onPlus,
  onFavorite,
  favorited = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isChoose, setIsChoose] = React.useState(favorited);
  const obj = { id, parentId: id, nameProduct, price, image };

  const clickAdd = () => {
    onPlus(obj);
  };

  const clickChoose = () => {
    onFavorite(obj);
    setIsChoose(!isChoose);
  };

  return (
    <div className="products__block">
      {onFavorite && (
        <button
          className="products__block_choose button_card"
          onClick={clickChoose}
        >
          <img
            src={isChoose ? "img/liked.svg" : "img/unliked.svg"}
            alt="img-product"
          />
        </button>
      )}
      <div className="products__block_img_product">
        <img src={image} alt="img-product" />
      </div>
      <p className="products__block_name">{nameProduct}</p>
      <div className="products__block_wrap">
        <p className="products__block_price">
          <span>Price:</span>
          {price}$
        </p>
        {onPlus && (
          <button
            onClick={clickAdd}
            className="products__block_add_btn button_card"
          >
            <img
              src={isItemAdded(id) ? "img/add.svg" : "img/notadd.svg"}
              alt="img-product"
            />
          </button>
        )}
      </div>
    </div>
  );
}
export default Card;
