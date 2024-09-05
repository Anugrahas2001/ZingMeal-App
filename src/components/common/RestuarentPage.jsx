import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, cartItemCounter } from "../../slices/cartItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";
import axios from "../../axios/axios";
import Cookies from "js-cookie";
import { LoadingContext } from "./LoaderContext";
import Loader from "./Loader";
import { CounterContext } from "./CountContext";
import moment from "moment/moment";
import ReadMore from "./ReadMore";
import Footer from "./Footer";

const RestuarentPage = () => {
  const [hotel, setHotel] = useState({});
  const [foods, setFoods] = useState([]);
  const [type, setType] = useState("");
  const { id } = useParams();
  const userId = useSelector((store) => store.user.id);
  const cartId = useSelector((store) => store.cart.id);
  const restaurantId = useSelector((store) => store.restaurant.id);
  const { setCartItemCount } = useContext(CounterContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAccessToken = () => Cookies.get("accessToken");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/restaurant/getRestaurant/${id}`)
      .then((response) => {
        setHotel(response.data.Data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/restaurant/getAllFoodsInRestaurant/${id}`)
      .then((response) => {
        setFoods(response.data.Data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchInitialCartItemCount = async () => {
      const config = {
        headers: { Authorization: getAccessToken() },
      };

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

  const setFoodTypeHandler = () => {
    axios
      .get(`/restaurant/foodByType/${id}/${type}`)
      .then((response) => {
        setFoods(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const foodTypeHandler = (e) => {
    setType(e.target.value);
    setFoodTypeHandler();
  };

  const notify = () => {
    toast.success("Food successfully added to cart", {
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

  const addToCartFunction = async (foodId) => {
    const accessToken = Cookies.get("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    if (!userId) {
      navigate("/");
      return;
    }
    try {
      setLoading(true);
      const cartItem = await axios.post(
        `/user/addToCart/${userId}/${cartId}/${foodId}`,
        {},
        config
      );
      const id = cartItem.data.Data.id;

      await axios.patch(
        `/restaurant/totalPrice/${restaurantId}/${cartId}`,
        {},
        config
      );
      const countData = await axios.get("/restaurant/getCount", config);
      const newCount = countData.data.Count;

      setCartItemCount(newCount);
      dispatch(cartItemCounter(newCount));
      dispatch(addToCart(id));
      notify();
    } catch (error) {
      console.error("Error in addToCartFunction:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div key={hotel.id} className="ml-36 mr-36 lg:ml-32 lg:mr-32 md:ml-14 md:mr-14 xs:ml-8 xs:mr-8">
            <div className="max-w-full mt-8 rounded-md xs:w-full xs:rounded-sm xs:mt-5">
              <img
                className="w-full object-cover h-96 rounded-md lg:h-80 md:h-44 sm:h-32 xs:h-28"
                src={hotel.restaurantImg}
                alt={hotel.restaurantName}
              />
            </div>

            <div className="flex w-full justify-between h-8 items-center rounded-lg">
              <div className="flex">
                <div className="text-2xl lg:text-2xl md:text-xl sm:text-lg xs:text-lg">{hotel.restaurantName}</div>
                <div className="w-10 mt-2 h-4 bg-black flex text-white items-center justify-center ml-4 text-sm lg:w-10 lg:h-5 md:w-7 md:h-4 md xs:w-8 xs:h-3 xs:px-5">
                  <p className="xs:text-sm xs:ml-1">3.3</p>
                  <FontAwesomeIcon className="text-sm ml-1 xs:text-sm xs:mr-1" icon={faStar} />
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-400 lg:text-lg md:text-lg sm:text-sm xs:text-sm">
              {hotel.restaurantAddress}
            </div>
            <div className="w-52 justify-between text-lg flex lg:text-lg md:text-sm xs:text-sm lg:w-52 md:w-40 xs:w-36">
              <div className="text-orange-400">{hotel.restaurantStatus}</div>
              <div className="text-lg lg:text-lg md:text-sm xs:text-xs">
                {moment(hotel.openingTime, "YYYY-MM-DD HH:mm:ss").format(
                  "hh:mm A"
                )}
                -
                {moment(hotel.closingTime, "YYYY-MM-DD HH:mm:ss").format(
                  "hh:mm A"
                )}
              </div>
            </div>

            <div className="flex w-full justify-between mt-4 lg:w-full md:w-96 sm:w-80 xs:w-72">
              <p className="text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-sm">Menu Items</p>
            </div>
            <div className="mt-3">
              <input
                type="checkbox"
                id="veg"
                value="Veg"
                className="mr-1 xs:w-4 xs:mr-0"
                checked={type === "Veg"}
                onChange={foodTypeHandler}
              />
              <label htmlFor="veg" className="mr-3 lg:text-lg md:text-lg sm:text-sm xs:text-xs">
                Veg
              </label>
              <input
                type="checkbox"
                id="nonveg"
                name="type"
                value="Non-Veg"
                className="mr-1 xs:w-4 xs:mr-0"
                checked={type === "Non-Veg"}
                onChange={foodTypeHandler}
              />
              <label htmlFor="nonveg" className="mr-3 lg:text-lg md:text-lg sm:text-sm xs:text-xs" name="type">
                Non-Veg
              </label>
            </div>
            <div className="mt-14 lg:mt-14 md:mt-8 sm:mt-2 xs:mt-0">
              {foods.map((dish) => (
                <div className="mt-4 w-full" key={dish.id}>
                  <div className="flex w-full justify-between">
                    <div className="flex xs:flex-row xs:space-x-3 w-full">
                      <img
                        className="w-48 rounded-lg lg:w-48 lg:h-36 md:w-40 md:h-32 sm:w-32 sm:h-28 xs:w-28 xs:h-14 xs:mt-3"
                        src={dish.imageFile}
                        alt={dish.foodName}
                      />
                      <div className="flex flex-col ml-3">
                        <div className="flex">
                          <div className="text-lg lg:text-lg md:text-lg sm:text-sm xs:text-sm">{dish.foodName}</div>
                          <div className="w-10 h-4 bg-black flex text-white items-center justify-center mt-1 ml-4 text-sm lg:w-10 md:w-10 sm:w-6 xs:w-7 xs:px-4 xs:ml-2">
                            <p className="text-sm lg:text-sm md:text-sm sm:text-sm xs:text-xs">4.3</p>
                            <FontAwesomeIcon
                              className="text-sm ml-1 lg:text-sm md:text-sm sm:text-sm xs:text-xs"
                              icon={faStar}
                            />
                          </div>
                        </div>
                        <div className="text-lg lg:text-lg md:text-lg sm:text-sm xs:text-xs">{dish.foodType}</div>
                        <div className="text-lg lg:text-lg md:text-lg sm:text-sm xs:text-xs">{dish.foodCategory}</div>
                        <div className="text-sm flex lg:text-sm md:text:sm xs:text-xs">
                          <FontAwesomeIcon
                            className="test-sm mt-1 lg:text-sm md:text:sm xs:text-xs"
                            icon={faIndianRupeeSign}
                          />
                          {!dish.discount ? (
                            dish.actualPrice
                          ) : (
                            <>
                              <span>{dish.discountPrice}</span>
                              {/* <div> */}
                                <div className="ml-5 flex xs:ml-3">
                                  <FontAwesomeIcon
                                    className="test-sm mt-1"
                                    icon={faIndianRupeeSign}
                                  />
                                  <span className="line-through text-green-600">
                                    {dish.actualPrice}
                                  </span>
                                </div>
                              {/* </div> */}
                              <span className="text-red-600 ml-2lg:text-sm md:text-sm xs:text-xs xs:w-12 xs:ml-1 flex">
                                {dish.discount}% off
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-base lg:text-base xs:w-full xs:flex-row xs:text-xs">
                          <ReadMore className="w-full"
                            text={dish.foodDescription}
                            foodId={dish.id}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-end">
                      <button
                        className="bg-green-600 font-semibold h-8 w-24 rounded-md cursor-pointer ml-4 lg:w-24 lg:h-8 md:w-20 md:h-6 sm:w-14 sm:h-6 xs:w-10 xs:h-5 xs:text-sm xs:ml-3"
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
        </>
      )}
      <Footer />
    </div>
  );
};

export default RestuarentPage;
