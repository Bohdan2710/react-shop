import axios from "axios";
import Header from "./components/Header/HeaderScripts";
import Cart from "./components/Cart/CartScripts";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchVlaue, setSearchVlaue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  //get data
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [resCart, resFavorites, resItems] = await Promise.all([
          axios.get("https://65eb66ad43ce16418933cd79.mockapi.io/cart"),
          axios.get("https://65eb66ad43ce16418933cd79.mockapi.io/favorites"),
          axios.get("https://65eb66ad43ce16418933cd79.mockapi.io/items"),
        ]);

        setIsLoading(false);

        setCartItems(resCart.data);
        setFavorites(resFavorites.data);
        setItems(resItems.data);
      } catch (error) {
        alert(`Error: ${error}`);
        console.error(error);
      }
    }
    fetchData();
  }, []);

  //for prevent.default and add true for cartOpened when click on cart
  const setTrueCartOpened = (e) => {
    e.preventDefault();
    setCartOpened(true);
  };

  const onAddToCart = async (items) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(items.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(items.id))
        );
        await axios.delete(
          `https://65eb66ad43ce16418933cd79.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, items]);
        const { data } = await axios.post(
          "https://65eb66ad43ce16418933cd79.mockapi.io/cart",
          items
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item
          })
        );
      }
    } catch (error) {
      alert(`Error: onAddToCart`);
      console.error(error);
    }
  };

  const removeItemCart = async (id) => {
    try {
      await axios.delete(
        `https://65eb66ad43ce16418933cd79.mockapi.io/cart/${id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert(`error removeItemCart`);
      console.error(error);
    }
  };

  const onAddFavorite = async (items) => {
    try {
      if (favorites.find((favItems) => favItems.id === items.id)) {
        await axios.delete(
          `https://65eb66ad43ce16418933cd79.mockapi.io/favorites/${items.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(items.id))
        );
      } else {
        const { data } = await axios.post(
          "https://65eb66ad43ce16418933cd79.mockapi.io/favorites",
          items
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Error, try again");
      console.error(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper">
        <Cart
          items={cartItems}
          booleanCart={cartOpened}
          onClose={() => setCartOpened(false)}
          onRemove={removeItemCart}
        />
        <Header items={items} onClickCart={setTrueCartOpened} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchVlaue={searchVlaue}
                setSearchVlaue={setSearchVlaue}
                onAddToCart={onAddToCart}
                onAddFavorite={onAddFavorite}
                isLoading={isLoading}
                added
              />
            }
            exact
          />

          <Route path="/favorites" element={<Favorites />} exact />
          <Route path="/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
