import React from "react";
import Card from "../components/Card/CardScripts";
import axios from "axios";

function Orders() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://65eb66ad43ce16418933cd79.mockapi.io/orders"
        );
        
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false);
      
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="products">
      <div className="container">
        <div className="products__wrapper jc_sb">
          <h1 className="products__title">Orders</h1>
        </div>
        <div className="products__wrapper">
          {isLoading ? (
              <div className="products_img_loader">
                <img src="img/3-dots-fade.svg" alt="img-loader-product" />
              </div>
            ) : (
              orders.map((item, index) => (
                <Card
                  key={index}
                  productObj={item}
                  loading={isLoading}
                  {...item}
                />
              ))
            )}
        </div>
      </div>
    </section>
  );
}
export default Orders;
