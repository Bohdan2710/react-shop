import React from "react";
import Card from "../components/Card/CardScripts";

function Home({
  items,
  searchVlaue,
  setSearchVlaue,
  onAddToCart,
  onAddFavorite,
  isLoading,
}) {
  const filterItems = items.filter((item) =>
    item.nameProduct.toLowerCase().includes(searchVlaue.toLowerCase())
  );

  return (
    <>
      <section className="slider">
        <div className="container">
          <div className="slider__wrap">
            <div className="slider__img_logo">
              <img src="img/logo-slider.png" alt="img-logo-slider" />
            </div>
            <div className="slider__content">
              <h2 className="slider__content_title">
                <span>Stan Smith,</span>Forever!
              </h2>
              <button className="slider__content_button green_button">
                buy
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="products">
        <div className="container products__container">
          <div className="products__wrapper jc_sb">
            <h1 className="products__title">
              {searchVlaue ? `Search by: ${searchVlaue}` : `All sneakers`}
            </h1>
            <div className="products__search">
              <img src="img/search.svg" alt="img-search" />
              <input
                type="text"
                placeholder="search..."
                name="products_search"
                onChange={(event) => setSearchVlaue(event.target.value)}
                value={searchVlaue}
              />
              {searchVlaue && (
                <img
                  onClick={() => setSearchVlaue("")}
                  className="delete_value_input"
                  src="img/delete-product.svg"
                  alt="img-delet-value"
                />
              )}
            </div>
          </div>
          <div className="products__wrapper">
            {isLoading ? (
              <div className="products_img_loader">
                <img src="img/3-dots-fade.svg" alt="img-loader-product" />
              </div>
            ) : (
              filterItems.map((item, index) => (
                <Card
                  key={index}
                  productObj={item}
                  onFavorite={(items) => onAddFavorite(items)}
                  onPlus={(items) => onAddToCart(items)}
                  loading={isLoading}
                  {...item}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
