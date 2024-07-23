import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import foodItems from "../json/FoodItems.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faIndianRupeeSign,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { updateCart,clearCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import Header from "./common/Header";
import { addOrder} from "../slices/orderSlice";
// import {
//   UPDATE_CART_DECREMENT,
//   UPDATE_CART_INCREMENT,
//   UPDATE_CART_REMOVE,
// } from "../constants/constants";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems, "cartItems");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState("Place Order");
  const [btn, setBtn] = useState(false);
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [empty,setEmpty]=useState(cartItems);
  let ItemsPrice = 0;

  var min = 50;
  var max = 200;
  const random = Math.floor(min + Math.random() * (max - min));

  const idMap = cartItems.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const detectSize = () => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  };

  const cartHandler = (totalPrice) => {
    dispatch(addOrder({ cart: cartItems, price: totalPrice }));
    setBtn(!btn);
    setBtnState((prevState) =>
      prevState === "Place Order" ? "Order Placed" : "Place Order"
    );

    setTimeout(() => {
      dispatch(clearCart());
      navigate("/order", { state: { idArray } });
    }, 5000);
  };

  const idArray = Object.keys(idMap);

  const data = foodItems
    .filter((item) => Object.keys(idMap).includes(item.id))
    .map((item) => {
      ItemsPrice = ItemsPrice + item.price * idMap[item.id].quantity;
      return (
        <>
          <div className="border h-48 w-2/3 key={item.id}">
            <div className="  flex mt-3 items-center">
              <div className="flex justify-center items-center mb-1">
                <img
                  className="w-48 ml-7 mb-2 h-36 rounded-lg p-1"
                  src={item.foodImage}
                  alt={item.foodName}
                />
                <div className="flex flex-col ml-4">
                  <div className="flex">
                    <p className="text-lg w-96">{item.foodName}</p>
                    <p>Delivery Time: 30min</p>
                  </div>
                  <div className="flex">
                    <p>{item.rating}</p>
                    <FontAwesomeIcon className="w-3 mt-1" icon={faStar} />
                  </div>
                  <p>{item.hotel}</p>
                  <p>{item.type}</p>
                  <div className="flex">
                    <FontAwesomeIcon
                      className="text-sm mt-1"
                      icon={faIndianRupeeSign}
                    />
                    <p>{item.price}</p>
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full"
                      onClick={() =>
                        dispatch(
                          updateCart({
                            value: 1,
                            id: item.id,
                          })
                        )
                      }
                    >
                      +
                    </button>
                    <button className="w-14 ml-2 bg-slate-300 text-lg font-semibold rounded-sm ">
                      {idMap[item.id].quantity}
                    </button>
                    <button
                      className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full"
                      onClick={() =>
                        dispatch(
                          updateCart({
                            value: -1,
                            id: item.id,
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      className="w-20 h-8 ml-5 bg-orange-500 text-white text-lg font-semibold rounded-sm mr-1"
                      onClick={() =>
                        dispatch(
                          updateCart({ value: 0, id: item.id })
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  return (
    <div>
      <Header />
      <div className=" w-full m-3">
        <div className="flex flex-wrap" key={data.id}>
          {data}
          <div className="w-96 h-auto shadow-lg ml-3 absolute right-5">
            <div className="m-5">
              <div className="text-lg h-10 m-5 mt-2 flex justify-center items-center font-semibold shadow-lg ">
                <p className="text-lg text-gray-500 h-5 ">Price Details</p>
              </div>
              {cartItems.map((item) => {
                const foodItem = foodItems.find((food) => food.id == item.id);
                console.log(foodItem,"items of food")
                if(!foodItem) return null;
                return (
                  <div className="text-lg h-5 m-5 mt-2 flex justify-between ">
                    <div className="flex">
                      <p>
                        {foodItem.foodName} <FontAwesomeIcon icon={faXmark} />
                      </p>
                      <p>{idMap[foodItem.id].quantity}</p>
                    </div>
                    <div className="flex">
                      <FontAwesomeIcon
                        className="text-sm mt-2"
                        icon={faIndianRupeeSign}
                      />
                      <p className="mb-2 text-md">
                        {foodItem.price * idMap[foodItem.id].quantity}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="text-lg h-5 m-5 mt-2 flex justify-between border-dashed border-gray-300 border-t-2">
                <p>Price ({data.length} items)</p>
                <div className="flex">
                  <FontAwesomeIcon
                    className="text-sm mt-2"
                    icon={faIndianRupeeSign}
                  />
                  <p className="mb-2 text-md">{ItemsPrice}</p>
                </div>
              </div>

              <div className="text-lg h-5 m-5 mt-2 flex justify-between">
                <p>Discount</p>
                <div className="flex">
                  <p className="text-green-600">-</p>
                  <FontAwesomeIcon
                    className="text-sm mt-2 text-green-600"
                    icon={faIndianRupeeSign}
                  />
                  <p className="mb-2 text-md text-green-600">{random}</p>
                </div>
              </div>

              <div className="text-lg h-5 m-5 mt-2 flex justify-between">
                <p>Delivery Charges</p>
                <div className="flex">
                  <p className="mb-2 text-md text-green-600">Free</p>
                </div>
              </div>

              <div className="flex flex-col">
              <div className="text-lg h-6 m-5 mt-2 font-semibold flex justify-between border-dashed border-gray-400 border-t-2">
                <p>Total Amount</p>
                <div className="flex">
                  <p className="mb-2 text-md text-green-600">
                    {ItemsPrice - random}
                  </p>
                </div>
              </div>
              <p className="text-sm ml-6 text-red-500">Cash On Delivery</p>
              </div>

              <div className="text-lg h-6 m-5 mt-2 flex justify-between border-dashed border-gray-400 border-t-2">
                <p className="text-sm text-green-800 font-bold mt-1">
                  You will save ₹{random} on this order
                </p>
              </div>

              <div
                className="text-lg h-14 rounded-sm m-5 mt-2 flex justify-between bg-blue-600 cursor-pointer"
                onClick={() => {
                  cartHandler(ItemsPrice + random);
                }}
              >
                {console.log(ItemsPrice - random, "cart")}
                <p className=" text-white text-lg font-bold flex justify-center items-center ml-24">
                  {btnState}
                </p>
                {btn && (
                  <Confetti width={dimension.width} height={dimension.height} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
