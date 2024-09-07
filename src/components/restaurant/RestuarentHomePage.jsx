import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faStar,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
import Header from "../common/Header";
import { LoadingContext } from "../common/LoaderContext";
import Loader from "../common/Loader";
import moment from "moment/moment";
import ReadMore from "../common/ReadMore";
import Footer from "../common/Footer";

const RestuarentPage = () => {
  const restaurantId = useSelector((store) => store.restaurant.id);
  const [hotel, setHotel] = useState({});
  const [foods, setFoods] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/restaurant/getRestaurant/${restaurantId}`)
      .then((response) => setHotel(response.data.Data))
      .catch(console.error);
    setLoading(false);
  }, [restaurantId]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/restaurant/getAllFoodsInRestaurant/${restaurantId}`)
      .then((response) => setFoods(response.data.Data))
      .catch(console.error);
    setLoading(false);
  }, [restaurantId]);

  const notify = () => {
    toast.success("Restaurant deleted successfully!", {
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

  const notifyCart = () => {
    toast.error("Can't delete the food.Food is associated with the cart", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className:"w-80 lg:w-80 md:w-72 md:text-sm sm:w-64 sm:text-xs xs:w-64 xs:text-xs xs:h-3",
      transition: Bounce,
    });
  };

  const notifyOrder = () => {
    toast.error("Can't delete the food.Food is associated with the order", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      className:"w-80 lg:w-80 md:w-72 md:text-sm sm:w-64 sm:text-xs xs:w-64 xs:text-xs xs:h-3",
      transition: Bounce,
    });
  };

  const deleteFoodHandler = (foodId) => {
    setLoading(true);
    axios
      .delete(`/restaurant/delete/${foodId}`)
      .then(() => {
        return axios.get(`/restaurant/getAllFoodsInRestaurant/${restaurantId}`);
      })
      .then((response) => {
        setFoods(response.data.Data);
        setLoading(false);
        notify();
      })
      .catch((error) => {
        console.error("Failed to delete food or fetch updated list:", error);

        if (
          error.response &&
          error.response.data.message ===
            "Can't delete this food as it is related to some cart items"
        ) {
          notifyCart();
        } else if (
          error.response &&
          error.response.data.message ===
            "Can't delete this food as it related to some orders"
        ) {
          notifyOrder();
        }

        setLoading(false);
      });
  };

  const menuData = foods.map((food) => {
    return (
      <div className="p-4 w-full xs:p-1" key={food.id}>
        <div className="flex justify-between items-center">
          <div className="flex xs:flex-row xs:space-x-3 w-full">
            <img
              className="w-48 rounded-lg lg:w-48 lg:h-36 md:w-40 md:h-32 sm:w-32 sm:h-28 xs:w-28 xs:h-14 xs:mt-3"
              src={food.imageFile}
              alt={food.foodName}
            />
            <div className="flex flex-col ml-3">
              <div className="flex">
                <div className="text-lg lg:text-lg md:text-lg sm:text-sm xs:text-sm">
                  {food.foodName}
                </div>
                <div className="w-10 h-4 bg-black flex text-white items-center justify-center mt-1 ml-4 text-sm">
                  <p>4.3</p>
                  <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
                </div>
              </div>
              <div className="text-lg lg:text-lg md:text-lg sm:text-sm xs:text-xs">
                {food.foodCategory}
              </div>
              <div className="text-sm">
                <div className="text-sm flex lg:text-sm md:text:sm xs:text-xs">
                  <FontAwesomeIcon
                    className="test-sm mt-1 lg:text-sm md:text:sm xs:text-xs"
                    icon={faIndianRupeeSign}
                  />
                  {!food.discount ? (
                    food.actualPrice
                  ) : (
                    <>
                      <span>{food.discountPrice}</span>
                      <div className="ml-5 flex xs:ml-3">
                        <FontAwesomeIcon
                          className="test-sm mt-1"
                          icon={faIndianRupeeSign}
                        />
                        <span className="line-through text-green-600">
                          {food.actualPrice}
                        </span>
                      </div>
                      <span className="text-red-600 ml-2lg:text-sm md:text-sm xs:text-xs xs:w-12 xs:ml-1 flex">
                        {food.discount}% off
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-sm xs:w-full xs:flex-row xs:text-xs">
                <ReadMore
                  className="w-full"
                  text={food.foodDescription}
                  foodId={food.id}
                />
              </div>
              <div className="flex mt-1">
                <Link to={`/editFood/${food.id}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer w-7 xs:w-3"
                  />
                </Link>
                <FontAwesomeIcon
                  className="ml-2 cursor-pointer mt-1 w-7 xs:ml-1 xs:w-3"
                  icon={faTrash}
                  onClick={() => {
                    deleteFoodHandler(food.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <Header isRestaurantPage={true} orderLink="/restaurantOrder" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="ml-36 mr-36 lg:ml-36 lg:mr-36 md:ml-24 md:mr-24 sm:ml-12 sm:mr-12 xs:ml-8 xs:mr-8"
            key={hotel.id}
          >
            <div className="max-w-full mt-8 rounded-md">
              <img
                className="w-full object-cover h-72 rounded-md lg:h-72 md:h-64 sm:h-48 xs:h-32"
                src={hotel.restaurantImg}
                alt={hotel.restaurantName}
              />
              <div className="relative bottom-10 left-3/4 sm:left-2/3 xs:left-2/3">
                <Link to="/editRestaurant">
                  <div className="bg-white flex pl-2 p-1 rounded-sm cursor-pointer w-32 md:w-28 sm:w-24 xs:w-20">
                    <FontAwesomeIcon className="mt-1" icon={faPenToSquare} />
                    <button className="ml-1 xs:text-xs">Edit Info</button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex h-8 items-center rounded-lg mt-3 sm:mt-1">
              <div className="text-2xl lg:text-2xl md:text-xl sm:text-lg xs:text-lg font-semibold">
                {hotel.restaurantName}
              </div>
              <div className="w-9 h-5 bg-black flex text-white items-center justify-center ml-4 text-sm sm:h-4 sm:text-xs">
                <p>1</p>
                <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
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

            <div className="flex w-full justify-between mt-4 lg:w-full md:w-96 sm:w-80 xs:w-64">
              <p className="text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-sm">
                Menu Items
              </p>
              <Link to="/add">
                <div className="bg-gray-600 font-semibold text-white h-9 w-24 lg:w-24 md:w-20 sm:w-20 xs:w-20 rounded-md flex justify-center items-center xs:ml-2">
                  <button className="p-2 md:p-1 text-base sm:text-sm sm:p-1 xs:text-xs">Add  Menu</button>
                </div>
              </Link>
            </div>
            <div className="mt-4">{menuData}</div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default RestuarentPage;
