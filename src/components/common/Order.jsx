import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios/axios";
import Cookies from "js-cookie";

const Order = (props) => {
  const dispatch = useDispatch();
  const { isUserPage, children } = props;
  const restaurantId = useSelector((store) => store.restaurant.id);
  const [orders, setOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  console.log(pastOrders, "paasttts");

  const accessToken = Cookies.get("accessToken");
  const [orderStatuses, setOrderStatuses] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = isUserPage
          ? await axios.get(`/restaurant/filterPending`)
          : await axios.get(
              `/restaurant/allOrdersInRestaurant/${restaurantId}`
            );
        console.log(response.data.sortedOrders, "the dataaaaaaa");
        setOrders(response.data.sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [isUserPage, dispatch]);

  useEffect(() => {
    axios
      .get(`/restaurant/cancelAndDelivered`)
      .then((response) => {
        console.log(response.data.Data, "resshdkkdc,,d");
        setPastOrders(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cancelOrderHandler = async (orderId) => {
    try {
      const response = await axios.delete(
        `/user/cancelOrder/${orderId}`,
        config
      );
      // const updatedOrder = await axios.get(`/restaurant/filterPending`);
      // setOrders(updatedOrder.data.sortedOrders);

      // const newOrderStatuses = { ...orderStatuses };
      // delete newOrderStatuses[orderId];
      // setOrderStatuses(newOrderStatuses);
      console.log(response, "after cancel");

      notify();
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order.", {
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
    }
  };

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

  const changeOrderStatusHandler = async (orderId, newStatus) => {
    console.log(newStatus, orderId, "new");
    setOrderStatuses(newStatus);
    const response = await axios.patch(
      `/restaurant/updateOrderStatus/${restaurantId}/${orderId}`,
      {
        orderStatus: newStatus,
      },
      config
    );
    console.log(response, "response daaaaataaaa");
  };

  const renderOrderItems = (orderItems) => {
    return orderItems.map((item) => {
      return (
        <div key={item.food.id} className="mt-1 ">
          <div className="flex">
            <img
              className="w-20 rounded-sm m-2"
              src={item.food.imageFile}
              alt={item.food.foodName}
            />
            <div className="flex flex-col m-2  w-96">
              <div className="flex">
                <p>{item.food.foodName}</p>
                <div className="flex  ml-2">
                  <FontAwesomeIcon className="mt-1 text-sm" icon={faXmark} />
                  <p>{item.quantity}</p>
                </div>
              </div>
              <p className="text-gray-400">{item.food.foodCategory}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full overflow-x-hidden">
      {children}
      <div className="ml-36 mr-36 h-auto">
        <div className="w-full mt-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="w-full h-auto m-2 flex justify-between shadow mb-4 p-5"
            >
              <div className="w-80 ml-4">
                <p className="font-semibold">OrderID: {order.id}</p>
                <div>{renderOrderItems(order.orderItems)}</div>
              </div>
              <div>

                {isUserPage && (
                  <div className="flex justify-center items-center flex-col">
                    <p>{order.orderStatus}</p>
                    <p className="text-sm">
                      Your item has been
                      {order.orderStatus}
                    </p>
                  </div>
                )}

                {/* {isRestaurantPage && (
                  <div className="flex justify-center flex-col">
                    <select
                      className="ml-10 mt-2 outline-none"
                      value={orderStatuses[order.id] || "PREPARING"}
                      onChange={(e) => {
                        changeOrderStatusHandler(order.id, e.target.value);
                      }}
                    >
                      <option value="PREPARING">PREPARING</option>
                      <option value="PACKED">PACKED</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </div>
                )} */}
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
                  onClick={() => cancelOrderHandler(order.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
        <p className="font-semibold text-xl">Past Orders</p>
        {pastOrders.map((order) => {
          return (
            <div
              key={order.id}
              className="w-full h-auto m-2 flex justify-between shadow mb-4 p-5"
            >
              <div className="w-80 ml-4">
                <p>Order ID: {order.id}</p>
                {order.orderItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <img
                        className="w-20 rounded-sm m-2"
                        src={item.food.imageFile}
                        alt={item.food.foodName}
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="flex justify-center flex-col">
                  <p className="ml-10 mt-3">{order.orderStatus}</p>
                  <p className="text-sm">
                    Your item has been {order.orderStatus}
                  </p>
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
                    <p className="ml-1">{order.totalPrice}</p>{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
