import React from "react";
import Card from "../components/Card/CardScripts";
import AppContext from "../context";

function Favorites() {
  const {favorites, onAddFavorite} = React.useContext(AppContext);
  return (
    <section className="products">
      <div className="container">
        <div className="products__wrapper jc_sb">
          <h1 className="products__title">Favorites</h1>
        </div>
        <div className="products__wrapper">
          {favorites.map((obj) => (
            <Card
              key={obj.image}
              productObj={obj}
              favorited={true}
              // onPlus={(items) => onAddToCart(items)}
              onFavorite={onAddFavorite}
              {...obj}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Favorites;
