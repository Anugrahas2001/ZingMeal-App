
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { addToCart, cartItemCount } from "../../slices/cartItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios/axios";
import Cookies from "js-cookie";

const RestuarentPage = ({ onUpdateCount }) => {
  const [hotel, setHotel] = useState({});
  const [foods, setFoods] = useState([]);
  const { id } = useParams();
  const userId = useSelector((store) => store.user.id);
  const cartId = useSelector((store) => store.cart.id);
  const restaurantId = useSelector((store) => store.restaurant.id);
  const cartItems = useSelector((store) => store.cartItem);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`/restaurant/getRestaurant/${id}`)
      .then((response) => setHotel(response.data.Data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    axios.get(`/restaurant/getAllFoodsInRestaurant/${id}`)
      .then((response) => setFoods(response.data.Data))
      .catch(console.error);
  }, [id]);

  const notify = () => {
    toast.success("Item added successfully!", {
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

  const getAccessToken = () => Cookies.get("accessToken");

  const addToCartFunction = async (foodId) => {
    const accessToken = getAccessToken();

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    try {
      const cartItem = await axios.post(`/user/addToCart/${userId}/${cartId}/${foodId}`, {}, config);
      const id = cartItem.data.Data.id;
      console.log(id, "cart idd");

      await axios.patch(`/restaurant/totalPrice/${restaurantId}/${cartId}`, {}, config);

      const countData = await axios.get("/restaurant/getCount", config);
      const newCount = countData.data.Count;
   
      onUpdateCount(newCount);
      dispatch(cartItemCount(newCount));
      dispatch(addToCart(id));

      notify();
    } catch (error) {
      console.error("Error in addToCartFunction:", error);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div key={hotel.id} className="ml-36 mr-36">
        <div className="max-w-full mt-8 rounded-md">
          <img
            className="w-full object-cover h-72 rounded-md"
            src={hotel.restaurantImg}
            alt={hotel.restaurantName}
          />
        </div>

        <div className="flex w-full justify-between h-8 items-center rounded-lg">
          <div className="flex">
            <div className="text-2xl">{hotel.restaurantName}</div>
            <div className="w-10 mt-2 h-4 bg-black flex text-white items-center justify-center ml-4 text-sm">
              <p>3.3</p>
              <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
            </div>
          </div>
        </div>
        <div className="text-lg text-gray-400">{hotel.restaurantAddress}</div>
        <div className="w-64 justify-between text-lg flex">
          <div className="text-orange-400">{hotel.status}</div>
          <div className="text-lg">
            {Math.round(new Date(hotel.openingTime).getTime())}-
            {Math.round(new Date(hotel.closingTime).getTime())}
          </div>
        </div>

        <div className="flex w-full justify-between mt-4">
          <p className="text-3xl">Menu Items</p>
        </div>
        <div className="mt-14">
          {foods.map((dish) => (
            <div className="mt-4 w-full" key={dish.id}>
              <div className="flex w-full justify-between">
                <div className="flex">
                  <img
                    className="w-48 h-36 rounded-lg"
                    src={dish.imageFile}
                    alt={dish.foodName}
                  />
                  <div className="flex flex-col ml-3">
                    <div className="flex">
                      <div className="text-lg">{dish.foodName}</div>
                      <div className="w-10 h-4 bg-black flex text-white items-center justify-center mt-1 ml-4 text-sm">
                        <p>4.3</p>
                        <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
                      </div>
                    </div>
                    <div className="text-lg">{dish.foodCategory}</div>
                    <div className="text-sm flex">
                      <FontAwesomeIcon className="test-sm mt-1" icon={faIndianRupeeSign} />
                      {!dish.discount ? (
                        dish.actualPrice
                      ) : (
                        <>
                          <span>{dish.discountPrice}</span>
                          <div>
                            <div className="ml-5">
                              <FontAwesomeIcon className="test-sm mt-1" icon={faIndianRupeeSign} />
                              <span className="line-through text-green-600">{dish.actualPrice}</span>
                            </div>
                          </div>
                          <span className="text-red-600 ml-2">{dish.discount}% off</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm">{dish.description}</div>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-green-600 font-semibold h-8 w-24 rounded-md cursor-pointer"
                    onClick={() => addToCartFunction(dish.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RestuarentPage;

