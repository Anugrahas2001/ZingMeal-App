import React from "react";
import foodItems from "../json/FoodItems.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./common/Header";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../slices/orderSlice";

const Order = () => {
  const orders = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const notify = () => {
    toast.error("Order Cancelled!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const cancelOrderHandler = (id) => {
    notify();
    dispatch(cancelOrder(id));
  };

  const renderOrderItems = (order) => {

    return order.map((item) => {
      const foodData = foodItems.find((foodItem) => foodItem.id === item.id);
      return (
        <div key={item.id} className="mt-1 ">
          <div className="flex">
            <img
              className="w-20 rounded-sm m-2"
              src={foodData.foodImage}
              alt={foodData.foodName}
            />
            <div className="flex flex-col m-2  w-96">
              <div className="flex">
              <p>{foodData.foodName}</p>
              <div className="flex  ml-2">
              <FontAwesomeIcon className="mt-1 text-sm" icon={faXmark}/>
              <p>{item.quantity}</p>
              </div>
              </div>
              <p className="text-gray-400">{foodData.category}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Header />
      <div className="w-full ml-44 h-auto">
        <div className="w-full mt-2">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="w-2/3 h-auto m-2 flex shadow-2xl mb-4"
            >
              <div className="w-64 ml-4">
                <p>OrderID: {order.orderId}</p>
                <div>{renderOrderItems(order.order)}</div>
              </div>
              <div>
                <div className="ml-36 flex justify-center flex-col">
                  <p className="ml-10 mt-3">{order.status}</p>
                  <p className="text-sm">Your item has been preparing</p>
                </div>
              </div>
              <div className="h-auto ml-20 flex flex-col justify-between">
                <div className="flex">
                  <p className="mt-5">Total Price:</p>
                  <div className="bg-yellow-400 flex p-1 rounded-md mt-5 h-7">
                    <FontAwesomeIcon
                      className="mt-1"
                      icon={faIndianRupeeSign}
                    />
                    <p className="ml-1">{order.totalPrice}</p>
                  </div>
                </div>
                <button
                  className="w-20 p-1 text-white self-center cursor-pointer rounded-md bg-red-500 mt-4 mb-4"
                  onClick={() => cancelOrderHandler(order.orderId)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
        <div className="h-auto mt-10">
          <h1 className="font-semibold text-2xl ml-2">Past orders</h1>
          <div className="w-full ">
            <div className="w-2/3 h-auto m-2 flex shadow-2xl">
              <div className="w-64 ml-4">
                <p className="">OrderID:CHE#46271</p>
                <div className="">
                  <div className="mt-1 ">
                    <div className="flex">
                      <img
                        className="w-20 rounded-sm m-2"
                        src="https://t3.ftcdn.net/jpg/02/55/42/50/360_F_255425068_CyDrGsVcu1Bl2SdJ2yXx35Rlp8jyNCCQ.jpg"
                        alt=" "
                      />
                      <div className="flex flex-col m-2  w-96">
                        <p>Chicken Shawarma</p>
                        <p className="text-gray-400">Shawarma</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ml-36 flex justify-center flex-col">
                  <p className="ml-10 mt-3">Delivered</p>
                  <p className="text-sm">Your item has been Delivered</p>
                </div>
              </div>
              <div className="h-auto ml-20 flex flex-col justify-between">
                <div className="flex">
                  <p className="mt-5">Total Price:</p>
                  <div className="bg-yellow-400 flex p-1 rounded-md mt-5 h-7">
                    <FontAwesomeIcon
                      className="mt-1"
                      icon={faIndianRupeeSign}
                    />
                    <p className="ml-1">1500</p>
                  </div>
                </div>
                <button className="w-20 p-1 text-white self-center cursor-pointer rounded-md bg-red-500 mt-4 mb-4">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
