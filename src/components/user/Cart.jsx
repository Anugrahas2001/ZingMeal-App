import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faIndianRupeeSign,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { addToCart, cartItemCounter,clearCartItems } from "../../slices/cartItemSlice";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { addOrder } from "../../slices/orderSlice";
import Search from "../user/Search";
import axios from "../../axios/axios";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const cartId = useSelector((store) => store.cart.id);
  const userId = useSelector((store) => store.user.id);
  const restaurantId = useSelector((store) => store.restaurant.id);
  const accessToken = Cookies.get("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [btnState, setBtnState] = useState("Place Order");
  const [btn, setBtn] = useState(false);
  const [option, setOption] = useState("");
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        const newCount=countData.data.Count;
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
        console.log(newCount, "count from carttt")
        setCartItemCount(newCount);
        dispatch(cartItemCounter(newCount));
        dispatch(addToCart(id));
      } catch (error) {
        console.error("Error fetching count data:", error);
      }

      // onUpdateCount(newCount);
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
    console.log("inside handler");
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
        console.log(res, "result");
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
                <FontAwesomeIcon
                  className="test-sm mt-1"
                  icon={faIndianRupeeSign}
                />
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
      <Search cartItemCount={cartItemCount} />
      <div className=" w-full ml-10 mr-10" key={data.id}>
        <div className="flex flex-wrap ml-5">
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

                payableAmount = totalAmountWithoutDiscount + deliveryCharges;

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
                  <p className="text-green-600">
                    {totalDiscountPrice ? totalDiscountPrice : 0}
                  </p>
                </div>
              </div>
              <div className="text-lg h-5 m-5 mt-2 flex justify-between">
                <p>Delivery Charges</p>
                <div className="flex">
                  <FontAwesomeIcon
                    className="text-sm mt-2"
                    icon={faIndianRupeeSign}
                  />
                  {deliveryCharges}
                </div>
              </div>
              <div className="text-lg h-5 m-5 mt-2 flex justify-between border-dashed border-gray-300 border-t-2">
                <p>Total Amount</p>
                <div className="flex">
                  <FontAwesomeIcon
                    className="text-sm mt-2"
                    icon={faIndianRupeeSign}
                  />
                  {payableAmount}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  name="option"
                  value="Cash On Delivery"
                  className="text-sm ml-6 "
                  checked={option === "Cash On Delivery"}
                  onChange={(e) => {
                    setOption(e.target.value);
                  }}
                />
                <label htmlFor="pay" className="text-sm text-red-500">
                  Cash On Delivery
                </label>
                <input
                  type="checkbox"
                  name="option"
                  value="Online Payment"
                  className="text-sm ml-6 "
                  checked={option === "Online Payment"}
                  onChange={(e) => {
                    setOption(e.target.value);
                  }}
                />
                <label htmlFor="pay" className="text-sm text-red-500">
                  Online Payment
                </label>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() =>
                      createRazorpayOrder(payableAmount, "INR", "recept_id")
                    }
                    className="h-10 ml-4 mt-3 bg-blue-600 w-72 text-white text-lg font-semibold rounded-sm"
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
                <div className="text-lg flex justify-between items-center">
                  <p className="text-sm text-green-800 font-bold mt-1 ml-9">
                    You will save ₹{totalDiscountPrice} on this order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
