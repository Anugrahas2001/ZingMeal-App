import React from "react";
import Order from "../common/Order";
import Header from "../common/Header";
import Footer from "../common/Footer";

const RestaurantOrder = () => {
  return (
    <div>
      <Order isRestaurantPage={true}>
        <Header />
      </Order>
      <Footer />
    </div>
  );
};

export default RestaurantOrder;
