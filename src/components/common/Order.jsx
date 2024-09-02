import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios/axios";
import Cookies from "js-cookie";
import { LoadingContext } from "./LoaderContext";
import { Preparing,Packed,Dispatched,Delivered,Cancelled } from "../../constants/constants";
import Loader from "./Loader";
import Footer from "./Footer";


const Order = (props) => {
  const dispatch = useDispatch();
  const { isUserPage, children, isRestaurantPage } = props;
  const restaurantId = useSelector((store) => store.restaurant.id);
  const [orders, setOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const userId = useSelector((store) => store.user.id);
  const { loading, setLoading } = useContext(LoadingContext);
  const accessToken = Cookies.get("accessToken");
  const [orderStatuses, setOrderStatuses] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = isUserPage
        ? await axios.get(`/restaurant/filterPending`)
        : await axios.get(`/restaurant/allOrdersInRestaurant/${restaurantId}`);

      setOrders(isUserPage ? response.data.sortedOrders : response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isUserPage, dispatch, restaurantId, setLoading]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/restaurant/cancelAndDelivered`)
      .then((response) => {
        setPastOrders(response.data.Data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [setLoading]);

  const cancelOrderHandler = async (orderId) => {
    try {
      await axios.delete(`/user/cancelOrder/${orderId}`, config);
      setOrders(orders.filter((order) => order.id != orderId));
      notify();
    } catch (error) {
      console.error("Failed to cancel order:", error.response.data);
      const errorMessage = error.response.data.message;
      if (
        errorMessage ===
        "Order can only be cancelled within 30 minutes of being placed"
      ) {
        showErrorToast(
          "Order can only be cancelled within 30 minutes of being placed"
        );
      } else if (
        errorMessage.startsWith("Can't cancel this order. Food order already")
      ) {
        const currentStatus = errorMessage.match(/Food order already (\w+)/)[1];
        showErrorToast(
          `Can't cancel this order. Food order already ${currentStatus}`
        );
      } else {
        showErrorToast("Failed to cancel order.");
      }
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
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

  const changeOrderStatusHandler = async (orderId, status) => {
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: status,
    }));
    await axios.patch(
      `/restaurant/updateOrderStatus/${restaurantId}/${orderId}`,
      { orderStatus: status },
      config
    );
    const response = await axios.get(
      `/restaurant/allOrdersInRestaurant/${restaurantId}`
    );
    setOrders(response.data.orders);
  };

  const renderOrderItems = (orderItems) => {
    return orderItems.map((item) => (
      <div key={item.food.id} className="mt-1">
        <div className="flex">
          <img
            className="w-20 rounded-sm m-2"
            src={item.food.imageFile}
            alt={item.food.foodName}
          />
          <div className="flex flex-col m-2 w-full md:w-96">
            <div className="flex justify-between">
              <p className="text-sm md:text-base">{item.food.foodName}</p>
              <div className="flex ml-2">
                <FontAwesomeIcon className="mt-1 text-sm" icon={faXmark} />
                <p>{item.quantity}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              {item.food.foodCategory}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full overflow-x-hidden">
      {children}
      {loading ? (
        <Loader />
      ) : userId || restaurantId ? (
        <div className="ml-32 mr-36 h-auto">
          <div className="w-full mt-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="w-full h-auto m-2 flex flex-col md:flex-row justify-between shadow mb-4 p-5"
              >
                <div className="w-full md:w-80 ml-0 md:ml-4">
                  <p className="font-semibold">OrderID: {order.id}</p>
                  <div>{renderOrderItems(order.orderItems)}</div>
                </div>
                <div>
                  {isUserPage && (
                    <div className="flex justify-between md:justify-center items-center flex-col">
                      <p>{order.orderStatus}</p>
                      <p className="text-sm">
                        Your item has been {order.orderStatus}
                      </p>
                    </div>
                  )}
                  {isRestaurantPage && (
                    <div className="flex mt-4 md:mt-0">
                      <p>{order.orderStatus}</p>
                      <select
                        className="outline-none mt-0 w-4"
                        value={orderStatuses[order.id]}
                        onChange={(e) =>
                          changeOrderStatusHandler(order.id, e.target.value)
                        }
                      >
                        <option value=""></option>
                        <option value={Preparing}>Preparing</option>
                        <option value={Packed}>Packed</option>
                        <option value={Dispatched}>Dispatched</option>
                        <option value={Delivered}>Delivered</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="h-auto flex flex-col justify-between mt-4 md:mt-0">
                  <div className="flex flex-nowrap justify-between md:justify-start">
                    <p className="mt-5">Total Price:</p>
                    <div className="bg-yellow-400 flex p-1 rounded-md mt-5 h-7">
                      <FontAwesomeIcon
                        className="mt-1"
                        icon={faIndianRupeeSign}
                      />
                      <p className="ml-1">{Math.round(order.totalPrice)}</p>
                    </div>
                  </div>
                  {isUserPage && (
                    <button
                      className="w-20 p-1 text-white self-center cursor-pointer rounded-md bg-red-500 mt-4 mb-4"
                      onClick={() => cancelOrderHandler(order.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isUserPage && (
            <>
              <p className="font-semibold text-2xl bg-gray-300 flex justify-center mt-10">
                Past Orders
              </p>
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="w-full h-auto m-2 flex flex-col md:flex-row justify-between shadow mb-4 p-5"
                >
                  <div className="w-full md:w-80 ml-0 md:ml-4">
                    <p className="font-semibold">Order ID: {order.id}</p>
                    {order.orderItems.map((item) => (
                      <div key={item.id}>
                        <img
                          className="w-20 rounded-sm m-2"
                          src={item.food.imageFile}
                          alt={item.food.foodName}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between md:justify-center flex-col">
                      <p className="ml-10 mt-3">{order.orderStatus}</p>
                      <p className="text-sm">
                        Your item has been {order.orderStatus}
                      </p>
                    </div>
                  </div>
                  <div className="h-auto ml-20 flex flex-col justify-between">
                    <div className="flex justify-between md:justify-start">
                      <p className="mt-5">Total Price:</p>
                      <div className="bg-yellow-400 flex p-1 rounded-md mt-5 h-7">
                        <FontAwesomeIcon
                          className="mt-1"
                          icon={faIndianRupeeSign}
                        />
                        <p className="ml-1">{order.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="text-4xl w-full text-center mt-32">
          Currently no item is available
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Order;
