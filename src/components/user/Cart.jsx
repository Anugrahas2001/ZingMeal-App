import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faIndianRupeeSign,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { clearCartItems, updateCart } from "../../slices/cartItemSlice";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { addOrder } from "../../slices/orderSlice";
import Search from "../user/Search";
import axios from "../../axios/axios";
import Cookies from "js-cookie";

const Cart = () => {
  const cartId = useSelector((store) => store.cart.id);
  const cartItems = useSelector((store) => store.cartItem);
  const accessToken = Cookies.get("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [btnState, setBtnState] = useState("Place Order");
  const [btn, setBtn] = useState(false);
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  var min = 50;
  var max = 200;
  const random = Math.floor(min + Math.random() * (max - min));
  let totalAmountWithoutDiscount = 0;
  let totalDiscountPrice = 0;
  let totalAmountWithActualPrice = 0;
  let deliveryCharges = 0;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    axios
      .get(`/user/getAllCartItems/${cartId}`)
      .then((response) => {
        setFoodItems(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cartId]);

  const updateCartItemHandler = (cartItemId, val) => {
    axios
      .patch(`/user/updateCartItem/${cartItemId.id}`, { value: val }, config)
      .then((response) => {
        const updatedQuantity = response.data.Data.quantity;

        if (updatedQuantity === 0 || val===0) {
          setFoodItems((prevItems) =>
            prevItems.filter((item) => item.id !== cartItemId.id)
          );
        } else {
          setFoodItems((prevItems) =>
            prevItems.map((item) =>
              item.id === cartItemId.id
                ? { ...item, quantity: updatedQuantity }
                : item
            )
          );
          // console.log(cartItemId.id,"update cart")
          // dispatch(updateCart({ id: cartItemId.id, quantity: val }));
        
        }

       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  const cartHandler = (totalPrice) => {
    dispatch(addOrder({ cart: cartItems, price: totalPrice }));
    setBtn(!btn);
    setBtnState((prevState) =>
      prevState === "Place Order" ? "Order Placed" : "Place Order"
    );

    setTimeout(() => {
      dispatch(clearCartItems());
      navigate("/order", { state: { idArray } });
    }, 5000);
  };

  const data = foodItems.map((item) => {
    return (
      <div className="border h-48 w-2/3 key={item.id} ">
        <div className="flex mt-3 items-center">
          <div className="flex justify-center items-center mb-1">
            <img
              className="w-48 ml-7 mb-2 h-36 rounded-lg p-1"
              src={item.food.imageFile}
              alt={item.food.foodName}
            />
            <div className="flex flex-col ml-4">
              <div className="flex">
                <p className="text-lg w-96">{item.food.foodName}</p>
              </div>
              <p className="line-clamp-1 w-3/4 ">{item.food.foodDescription}</p>
              <p>{item.food.foodType}</p>
              <div className="flex">
                <p>{item.rating}</p>
                <FontAwesomeIcon className="w-3 mt-1" icon={faStar} />
              </div>

              <div className="text-sm flex">
                <FontAwesomeIcon className="test-sm mt-1" icon={faIndianRupeeSign} />
                {!item.food.discount ? (
                  item.food.actualPrice
                ) : (
                  <>
                    <span>{item.food.discountPrice}</span>
                    <div>
                      <div className="ml-5">
                        <FontAwesomeIcon
                          className="test-sm mt-1"
                          icon={faIndianRupeeSign}
                        />
                        <span className="line-through text-green-600">
                          {item.food.actualPrice}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-center items-center ml-10">
                <button
                  className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full"
                  onClick={() => updateCartItemHandler({ id: item.id }, 1)}
                >
                  +
                </button>
                <button className="w-14 ml-2 bg-slate-300 text-lg font-semibold rounded-sm ">
                  {item.quantity}
                </button>
                <button
                  className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full"
                  onClick={() => updateCartItemHandler({ id: item.id }, -1)}
                >
                  -
                </button>
                <button
                  className="w-20 h-8 ml-5 bg-orange-500 text-white text-lg font-semibold rounded-sm mr-1"
                  onClick={() => updateCartItemHandler({ id: item.id }, 0)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full overflow-x-hidden">
      <Search />
      <div className=" w-full ml-10 mr-10">
        <div className="flex flex-wrap ml-5" key={data.id}>
          {data}
          <div className="w-96 h-auto shadow-lg ml-3 absolute right-5">
            <div className="m-5">
              <div className="text-lg h-10 m-5 mt-2 flex justify-center items-center font-semibold shadow-lg ">
                <p className="text-lg text-gray-500 h-5 ">Price Details</p>
              </div>

              {foodItems.map((item) => {
                const originalPrice = item.food.actualPrice * item.quantity;
                totalAmountWithActualPrice += originalPrice;

                const foodPrice = !item.food.discount
                  ? item.food.actualPrice
                  : item.food.discountPrice;

                const totalAmount = foodPrice * item.quantity;
                totalAmountWithoutDiscount += Math.round(totalAmount);

                totalDiscountPrice =
                  totalAmountWithActualPrice - totalAmountWithoutDiscount;

                deliveryCharges =
                  item.cart.deliveryCharge == 0
                    ? "Free"
                    : item.cart.deliveryCharge;

                return (
                  <div className="text-lg h-5 m-5 mt-2 flex justify-between ">
                    <div className="flex">
                      <p className="text-md">
                        {item.food.foodName} <FontAwesomeIcon icon={faXmark} />
                      </p>
                      <p>{item.quantity}</p>
                    </div>
                    <div className="flex">
                      <FontAwesomeIcon
                        className="text-sm mt-2"
                        icon={faIndianRupeeSign}
                      />
                      <p className="mb-2 text-md">
                        {Math.round(foodPrice * item.quantity)}
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
                  {totalAmountWithoutDiscount}
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
                  <p className="mb-2 text-md text-green-600">
                    {totalDiscountPrice}
                  </p>
                </div>
              </div>
              <div className="text-lg h-5 m-5 mt-2 flex justify-between">
                <p>Delivery Charges</p>
                <div className="flex">
                  <p className="mb-2 text-md text-green-600">
                    {deliveryCharges}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg h-6 m-5 mt-2 font-semibold flex justify-between border-dashed border-gray-400 border-t-2">
                  <p>Total Amount</p>
                  <div className="flex">
                    <p className="mb-2 text-md text-green-600">
                      {/* {ItemsPrice - random} */}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm ml-6 text-red-500 cursor-pointer">
                    Cash On Delivery
                  </p>
                  <p className="text-sm ml-6 text-red-500 mr-7 cursor-pointer">
                    Online Pyment
                  </p>
                </div>
              </div>
              <div className="text-lg h-6 m-5 mt-2 flex justify-between border-dashed border-gray-400 border-t-2">
                <p className="text-sm text-green-800 font-bold mt-1">
                  You will save ₹{totalDiscountPrice} on this order
                </p>
              </div>
              <div
                className="text-lg h-14 rounded-sm m-5 mt-2 flex justify-between bg-blue-600 cursor-pointer"
                onClick={() => {
                  // cartHandler(ItemsPrice + random);
                }}
              >
                {/* {console.log(ItemsPrice - random, "cart")} */}
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
