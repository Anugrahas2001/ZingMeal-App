import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faIndianRupeeSign,
  faXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  addToCart,
  cartItemCounter,
  clearCartItems,
} from "../../slices/cartItemSlice";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { addOrder } from "../../slices/orderSlice";
import Search from "../user/Search";
import axios from "../../axios/axios";
import Cookies from "js-cookie";
import { CounterContext } from "../common/CountContext";
import Footer from "../common/Footer";

const Cart = () => {
  const cartId = useSelector((store) => store.cart.id);
  const userId = useSelector((store) => store.user.id);
  const restaurantId = useSelector((store) => store.restaurant.id);
  const accessToken = Cookies.get("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [btnState, setBtnState] = useState("Place Order");
  const [btn, setBtn] = useState(false);
  const [option, setOption] = useState("");
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { cartItemCount, setCartItemCount } = useContext(CounterContext);

  let totalAmountWithoutDiscount = 0;
  let totalDiscountPrice = 0;
  let totalAmountWithActualPrice = 0;
  let deliveryCharges = 0;
  let payableAmount = 0;

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
        updateTotalPrice();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cartId]);

  useEffect(() => {
    const fetchInitialCartItemCount = async () => {
      try {
        const countData = await axios.get("/restaurant/getCount", config);
        const newCount = countData.data.Count;
        setCartItemCount(newCount);
        dispatch(cartItemCounter(newCount));
      } catch (error) {
        console.error("Error fetching initial cart item count:", error);
      }
    };

    fetchInitialCartItemCount();
  }, []);

  const updateTotalPrice = () => {
    axios
      .patch(`/restaurant/totalPrice/${restaurantId}/${cartId}`, config)
      .then((response) => {
        const totalPrice = response.data.totalPrice;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCartItemHandler = async (cartItemId, val) => {
    try {
      const response = await axios.patch(
        `/user/updateCartItem/${cartItemId.id}`,
        { value: val },
        config
      );
      const id = cartItemId.id;
      const updatedQuantity = response.data.Data.quantity;
      if (updatedQuantity === 0 || val === 0) {
        setFoodItems((prevItems) =>
          prevItems.filter((item) => item.id !== cartItemId.id)
        );
        setCartItemCount((prevCount) => prevCount - 1);
      } else {
        setFoodItems((prevItems) =>
          prevItems.map((item) =>
            item.id === cartItemId.id
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
        if (val > 0) {
          setCartItemCount((prevCount) => prevCount + 1);
        }
      }
      updateTotalPrice();

      try {
        const countData = await axios.get("/restaurant/getCount", config);
        const newCount = countData.data.Count;
        setCartItemCount(newCount);
        dispatch(cartItemCounter(newCount));
        dispatch(addToCart(id));
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayHandler = async (amount, currency, orderId) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_dcM4CwYb7Oe9M2",
      amount: amount,
      currency: currency,
      name: "Anugraha S",
      description: "Payment to order food",
      order_id: orderId,
      handler: async function (response) {
        try {
          const paymentDetails = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: orderId,
            razorpaySignature: response.razorpay_signature,
            paymentMethod: "Online Payment",
          };

          const res = await axios.post(
            `/user/paymentSuccess/${userId}/${cartId}`,
            paymentDetails,
            config
          );

          setOrderItems(res.data);
          const id = res.data.Data.id;
          dispatch(addOrder(id));
          setBtn(!btn);
          setBtnState((prevState) =>
            prevState === "Place Order" ? "Order Placed" : "Place Order"
          );

          setTimeout(() => {
            dispatch(clearCartItems());
            navigate("/userOrder", { state: { orderItems } });
          }, 5000);
        } catch (err) {
          console.log(err);
        }
      },
      prefill: {
        name: "Anugraha S",
        email: "anugrahas2001@gmail.com",
        contact: "7306634251",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const createRazorpayOrder = async (amount, currency) => {
    if (!userId) {
      navigate("/");
      return;
    }
    try {
      const response = await axios.post("/user/createOrder", {
        amount,
        currency,
      });
      const { orderId } = response.data;

      if (option === "Online Payment" && orderId) {
        handleRazorpayHandler(amount, currency, orderId);
      } else if (option === "Cash On Delivery") {
        const res = await axios.post(
          `/user/paymentSuccess/${userId}/${cartId}`,
          { razorpayOrderId: orderId, paymentMethod: "Cash On Delivery" },
          config
        );

        setOrderItems(res.data);
        const id = res.data.Data.id;
        dispatch(addOrder(id));
        setBtn(!btn);
        setBtnState((prevState) =>
          prevState === "Place Order" ? "Order Placed" : "Place Order"
        );

        setTimeout(() => {
          dispatch(clearCartItems());
          navigate("/userOrder", { state: { foodItems } });
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = foodItems.map((item) => {
    return (
      <div
        className="border h-48 w-full lg:max-w-3xl lg:h-48 md:max-w-2xl md:h-40 md:mt-0 sm:max-w-xl sm:h-36 xs:max-w-xl xs:h-32"
        key={item.id}
      >
        <div className="flex mt-3 items-center ml-7 lg:ml-7 md:ml-0 sm:ml-0 xs:ml-0">
          <div className="flex flex-row items-center mb-1 xs:w-52">
            <img
              className="w-full object-cover mb-2 h-36 rounded-lg p-3 lg:w-full lg:h-36 md:w-96 md:h-32 sm:w-72 sm:h-24 sm:rounded-md xs:w-64 xs:h-20 xs:rounded-md"
              src={item.food.imageFile}
              alt={item.food.foodName}
            />
            <div className="flex flex-col ml-4 lg:ml-4 md:ml-0 sm:ml-0 xs:ml-0">
              <div className="flex">
                <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                  {item.food.foodName}
                </p>
              </div>
              <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                {item.food.foodType}
              </p>
              <div className="flex items-center">
                <p className="ml-1 text-lg lg:text-lg md:text-sm xs:text-xs">
                  1
                </p>
                <FontAwesomeIcon className="w-3 mt-1 xs:w-2" icon={faStar} />
              </div>

              <div className="text-sm flex items-center lg:text-sm md:text-sm sm:text-xs xs:text-xs">
                <FontAwesomeIcon
                  className="text-sm mt-1 lg:mt-1 md:mt-0 lg:text-sm md:text-sm sm:text-xs xs:text-xs"
                  icon={faIndianRupeeSign}
                />
                {!item.food.discount ? (
                  item.food.actualPrice
                ) : (
                  <>
                    <span className="mr-2 xs:mr-1">
                      {item.food.discountPrice}
                    </span>
                    <div className="line-through text-green-600">
                      <FontAwesomeIcon
                        className="text-sm mt-1 lg:mt-1 md:mt-0 lg:text-sm md:text-sm sm:text-xs xs:text-xs"
                        icon={faIndianRupeeSign}
                      />
                      <span>{item.food.actualPrice}</span>
                    </div>
                    <span className="text-red-600 ml-2">
                      {item.food.discount}% off
                    </span>
                  </>
                )}
              </div>

              <div className="flex justify-center mt-2 px-2 lg:justify-start md:justify-start sm:justify-start xs:justify-start">
                <button
                  className="w-10 h-10 bg-slate-200 text-lg font-semibold rounded-full flex items-center justify-center lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-7 sm:h-7 xs:w-6 xs:h-6 xs:ml-1"
                  onClick={() => updateCartItemHandler({ id: item.id }, -1)}
                >
                  -
                </button>
                <button className="w-10 h-10 bg-slate-300 text-lg font-semibold rounded-full flex items-center justify-center ml-2 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-7 sm:h-7 xs:w-6 xs:h-6 lg:text-lg md:text-lg sm:text-sm xs:text-sm xs:ml-1">
                  {item.quantity}
                </button>
                <button
                  className="w-10 h-10 bg-slate-200 text-lg font-semibold rounded-full flex items-center justify-center ml-2 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-7 sm:h-7 xs:w-6 xs:h-6 xs:ml-1"
                  onClick={() => updateCartItemHandler({ id: item.id }, 1)}
                >
                  +
                </button>

                <FontAwesomeIcon
                  className="mt-2 ml-2 text-2xl cursor-pointer lg:w-10 lg:h-7 lg:mt-2 md:w-6 md:h-6 md:mt-1 sm:w-7 sm:h-5 sm:mt-1 xs:w-5 xs:h-4 xs:mt-1 xs:ml-1"
                  onClick={() => updateCartItemHandler({ id: item.id }, 0)}
                  icon={faTrash}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full overflow-x-hidden">
      <Search cartItemCount={cartItemCount} />
      <div className="w-full flex justify-center" key={data.id}>
        <div className="flex flex-wrap md:flex-nowrap w-4/5">
          <div className="flex flex-wrap m-4 w-full lg:m-4 md:m-2">
            {userId && data}
          </div>
          {cartItemCount > 0 ? (
            <div className="h-4/5 shadow-lg mt-8 md:mt-0 md:ml-3 m-4 w-2/3 lg:h-4/5 md:h-auto md:w-2/3 sm:w-full sm:h-auto xs:w-full xs:h-auto">
              <div className="m-5">
                <div className="text-lg h-8 m-5 mt-2 flex justify-center items-center font-semibold shadow-lg">
                  <p className="text-lg text-gray-500 h-5">Price Details</p>
                </div>

                {userId &&
                  foodItems.map((item) => {
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

                    payableAmount =
                      totalAmountWithoutDiscount-totalDiscountPrice + item.cart.deliveryCharge;

                    return (
                      <div className="text-lg ml-4 mr-4 flex justify-between">
                        <div className="flex">
                          <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                            {item.food.foodName}{" "}
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="text-lg lg:text-lg md:text-sm xs:text-xs lg:mt-2 md:mt-1"
                            />
                          </p>
                          <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="flex text-lg lg:text-lg md:text-sm sm:text-xs xs:text-xs">
                          <FontAwesomeIcon
                            className="text-sm mt-3 lg:mt-3 md:mt-2 sm:mt-1 sm:text-xs xs:text-xs xs:mt-1"
                            icon={faIndianRupeeSign}
                          />
                          <p className="mb-2 text-lg lg:text-lg md:text-sm md:mt-1 xs:text-xs">
                            {Math.round(foodPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                <div className="text-lg h-5 m-5 mt-2 flex justify-between border-dashed border-gray-300 border-t-2 sm:mt-0 sm:mb-0 xs:mt-0 xs:mb-0">
                  <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                    Price ({data.length} items)
                  </p>
                  <div className="flex text-lg lg:text-lg md:text-sm sm:text-xs xs:text-xs sm:mt-0 sm:mb-0 xs:mt-0 xs:mb-0">
                    <FontAwesomeIcon
                      className="text-sm mt-2 lg:mt-2 md:mt-1 sm:text-xs sm:mt-1 xs:text-xs xs:mt-1"
                      icon={faIndianRupeeSign}
                    />
                    {totalAmountWithoutDiscount}
                  </div>
                </div>

                <div className="text-lg h-5 m-5 mt-2 flex justify-between sm:mt-1 sm:mb-0 xs:mt-0 xs:mb-0">
                  <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                    Discount
                  </p>
                  <div className="flex text-lg lg:text-lg md:text-sm sm:text-xs xs:text-xs">
                    <p className="text-green-600">-</p>
                    <FontAwesomeIcon
                      className="text-sm mt-2 lg:mt-2 md:mt-1 sm:text-xs sm:mt-1 text-green-600 xs:text-xs xs:mt-1"
                      icon={faIndianRupeeSign}
                    />
                    <p className="text-green-600">
                      {totalDiscountPrice ? totalDiscountPrice : 0}
                    </p>
                  </div>
                </div>

                <div className="text-lg h-5 m-5 mt-2 flex justify-between sm:mt-0 sm:mb-0 xs:mt-0 xs:mb-0">
                  <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                    Delivery Charges
                  </p>
                  <div className="flex text-lg lg:text-lg md:text-sm xs:text-xs">
                    <FontAwesomeIcon
                      className="text-sm mt-2 lg:mt-2 md:mt-1 sm:text-xs xs:text-xs xs:mt-1"
                      icon={faIndianRupeeSign}
                    />
                    {deliveryCharges}
                  </div>
                </div>

                <div className="text-lg h-5 m-5 mt-2 flex justify-between border-dashed border-gray-300 border-t-2">
                  <p className="text-lg lg:text-lg md:text-sm xs:text-xs">
                    Total Amount
                  </p>
                  <div className="flex text-lg lg:text-lg md:text-sm xs:text-xs">
                    <FontAwesomeIcon
                      className="text-sm mt-2 lg:mt-2 md:mt-1 sm:text-xs xs:text-xs xs:mt-1"
                      icon={faIndianRupeeSign}
                    />
                    {payableAmount}
                  </div>
                </div>

                <div className="flex justify-between items-center md:flex-row xs:justify-center">
                  <div className="flex justify-center items-center xs:ml-4">
                    <input
                      type="checkbox"
                      name="option"
                      value="Cash On Delivery"
                      className="mr-1 xs:w-3 xs:mr-0 px-1 sm:mr-0 xs:mt-0"
                      checked={option === "Cash On Delivery"}
                      onChange={(e) => {
                        setOption(e.target.value);
                      }}
                    />
                    <label
                      htmlFor="pay"
                      className="text-sm text-red-500 lg:text-sm md:text-xs xs:text-xs lg:ml-2 md:ml-1"
                    >
                      Cash On Delivery
                    </label>
                  </div>
                  <div className="flex justify-center items-center mt-4 md:mt-0 sm:mt-0 xs:mt-0">
                    <input
                      type="checkbox"
                      name="option"
                      value="Online Payment"
                      className="mr-1 xs:w-3 xs:mr-0 px-1"
                      checked={option === "Online Payment"}
                      onChange={(e) => {
                        setOption(e.target.value);
                      }}
                    />
                    <label
                      htmlFor="pay"
                      className="text-sm text-red-500 lg:text-sm md:text-xs xs:text-xs"
                    >
                      Online Payment
                    </label>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <button
                    onClick={() =>
                      createRazorpayOrder(payableAmount, "INR", "recept_id")
                    }
                    className="h-10 ml-4 mt-3 bg-blue-600 w-full text-white text-lg font-semibold rounded-sm lg:h-10 md:h-8 lg:text-lg md:text-sm sm:text-xs sm:h-7 xs:text-xs"
                  >
                    {btnState}
                  </button>

                  {option === "Cash On Delivery" && btn && (
                    <Confetti
                      width={dimension.width}
                      height={dimension.height}
                      numberOfPieces={1000}
                      recycle={false}
                      gravity={0.1}
                    />
                  )}
                </div>

                <div className="text-lg flex justify-between items-center mt-4">
                  <p className="text-sm text-green-800 font-bold ml-2 lg:text-sm md:text-xs xs:text-xs">
                    You will save ₹{totalDiscountPrice} on this order
                  </p>
                </div>
              </div>
              {/* <Footer /> */}
            </div>
          ) : (
            <div className="text-4xl w-full flex justify-center items-center mt-32">
              Please add items to the cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
