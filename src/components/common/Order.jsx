import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios/axios";
import Cookies from "js-cookie";
import { LoadingContext } from "./LoaderContext";
import { Preparing,Packed,Dispatched,Delivered} from "../../constants/constants";
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
          <div className="flex flex-col m-2 w-full md:w-40">
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
        <div className="ml-32 mr-36 h-auto lg:ml-32 lg:mr-36 md:ml-24 md:mr-24 sm:ml-16 sm:mr-16 xs:ml-8 xs:mr-8">
          <div className="w-full mt-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="w-full h-auto m-2 flex flex-col md:flex-row justify-between shadow mb-4 p-5 "
              >
                <div className="w-full md:w-80 ml-0 md:ml-4">
                  <p className="font-semibold text-base lg:text-base xs:text-xs">OrderID: {order.id}</p>
                  <div>{renderOrderItems(order.orderItems)}</div>
                </div>
                <div>
                  {isUserPage && (
                    <div className="flex justify-between md:justify-center items-center flex-col">
                      <p className="text-base lg:text-base xs:text-xs">{order.orderStatus}</p>
                      <p className="text-base lg:text-base xs:text-xs flex justify-center">
                        Your item has been {order.orderStatus}
                      </p>
                    </div>
                  )}
                  {isRestaurantPage && (
                    <div className="flex mt-4 md:mt-0">
                      <p className="text-base lg:text-base xs:text-xs">{order.orderStatus}</p>
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
                    <p className="text-base lg:text-base xs:text-xs">Total Price:</p>
                    <div className="bg-yellow-400 flex items-center p-1 rounded-md h-7 sm:h-5 xs:h-5 mt-1">
                      <FontAwesomeIcon
                        className="mt-1 text-sm sm:text-xs sm:mt-1 xs:mt-1 xs:text-xs xs:mb-1"
                        icon={faIndianRupeeSign}
                      />
                      <p className="ml-1 text-sm xs:text-xs">{Math.round(order.totalPrice)}</p>
                    </div>
                  </div>
                  {isUserPage && (
                    <button
                      className="w-20 p-1 text-white self-center cursor-pointer rounded-md bg-red-500 mt-4 mb-4 sm:text-sm xs:text-xs"
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
                    <p className="font-semibold text-base lg:text-base xs:text-xs">Order ID: {order.id}</p>
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
                  <div className="flex justify-center">
                    <div className="flex justify-between md:justify-center flex-col sm:justify-center xs:justify-center">
                      <p className="flex justify-center mt-3 text-base lg:text-base sm:text-xs xs:text-xs">{order.orderStatus}</p>
                      <p className="text-base flex justify-center lg:text-base sm:text-xs xs:text-xs w-52">
                        Your item has been {order.orderStatus}
                      </p>
                    </div>
                  </div>
                  <div className="h-auto flex flex-col">
                    {/* <div className="flex justify-between md:justify-start sm:justify-start xs:justify-start">
                      <p className="mt-5 text-base lg:text-base xs:text-xs">Total Price:</p>
                      <div className="bg-yellow-400 flex items-center p-1 rounded-md mt-5 h-7 sm:h-5 xs:h-5">
                        <FontAwesomeIcon
                          className="mt-1 text-sm sm:text-xs xs:text-xs"
                          icon={faIndianRupeeSign}
                        />
                        <p className="ml-1 text-sm sm:text-xs xs:text-xs">{order.totalPrice}</p>
                      </div>
                    </div> */}
                    <div className="flex flex-nowrap justify-center md:justify-start">
                    <p className="text-base lg:text-base xs:text-xs">Total Price:</p>
                    <div className="bg-yellow-400 flex items-center p-1 rounded-md h-7 sm:h-5 xs:h-5 mt-1">
                      <FontAwesomeIcon
                        className="mt-1 text-sm sm:text-xs sm:mt-1 xs:mt-1 xs:text-xs xs:mb-1"
                        icon={faIndianRupeeSign}
                      />
                      <p className="ml-1 text-sm xs:text-xs">{order.totalPrice}</p>
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
