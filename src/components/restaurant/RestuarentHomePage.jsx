import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faStar,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import Header from "../common/Header";

const RestuarentPage = () => {
  // const selector = useSelector((store) => store.menu);
  const navigate = useNavigate();
  const restaurantId = useSelector((store) => store.restaurant.id);
  const [hotel, setHotel] = useState({});
  const [foods, setFoods] = useState([]);
  console.log(foods, "foodsjkak");

  useEffect(() => {
    axios
      .get(`/restaurant/getRestaurant/${restaurantId}`)
      .then((response) => setHotel(response.data.Data))
      .catch(console.error);
  }, [restaurantId]);

  useEffect(() => {
    axios
      .get(`/restaurant/getAllFoodsInRestaurant/${restaurantId}`)
      .then((response) => setFoods(response.data.Data))
      .catch(console.error);
  }, [restaurantId]);
  console.log(hotel, "hotel");

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


  function formatTimeWithMeridian(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const deleteFoodHandler = (foodId) => {
    console.log(foodId, "iddd");
    axios
      .delete(`/restaurant/delete/${foodId}`)
      .then(() => {
        return axios.get(`/restaurant/getAllFoodsInRestaurant/${restaurantId}`);
      })
      .then((response) => {
        setFoods(response.data.Data);
        notify();
      })
      .catch((error) => {
        console.error("Failed to delete food or fetch updated list:", error);
      });
  };

  const menuData = foods.map((food) => {
    return (
      <div className="p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              className="w-48 h-36 rounded-lg"
              src={food.imageFile}
              alt={food.foodName}
            />
            <div className="flex flex-col ml-3">
              <div className="flex">
                <div className="text-lg">{food.foodName}</div>
                <div className="w-10  h-4 bg-black flex text-white items-center justify-center mt-1 ml-4 text-sm">
                  <p>4.3</p>
                  <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
                </div>
              </div>
              <div className="text-lg">{food.foodCategory}</div>
              <div className="text-sm">
                <div className="text-sm flex">
                  <FontAwesomeIcon
                    className="test-sm mt-1"
                    icon={faIndianRupeeSign}
                  />
                  {!food.discount ? (
                    food.actualPrice
                  ) : (
                    <>
                      <span>{food.discountPrice}</span>
                      <div>
                        <div className="ml-5">
                          <FontAwesomeIcon
                            className="test-sm mt-1"
                            icon={faIndianRupeeSign}
                          />
                          <span className="line-through text-green-600">
                            {food.actualPrice}
                          </span>
                        </div>
                      </div>
                      <span className="text-red-600 ml-2">
                        {food.discount}% off
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-sm line-clamp-1">{food.foodDescription}</div>
              <div className="flex mt-1">
                <Link to={`/editFood/${food.id}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer"
                    onClick={() => {
                      // updateFoddMenuHandler(food.id);
                    }}
                  />
                </Link>
                <FontAwesomeIcon
                  className="ml-2 cursor-pointer"
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
    <div className="w-full overflow-x-hidden">
      <Header orderLink="/restaurantOrder" />
      <div className="ml-36 mr-36" key={hotel.id}>
        <div className="max-w-full mt-8 rounded-md">
          <img
            className="w-full object-cover h-72 rounded-md"
            src={hotel.restaurantImg}
            alt={hotel.restaurantName}
          />
          <div className="relative bottom-10 left-3/4">
            <Link to="/editRestaurant">
              <div
                className="bg-white flex pl-2 p-1 rounded-sm cursor-pointer w-32"
                // onClick={restuarentEditHandler}
              >
                <FontAwesomeIcon className="mt-1" icon={faPenToSquare} />
                <button className="ml-1">Edit Info</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex h-8 items-center rounded-lg mt-3 ">
          <div className="text-2xl font-semibold">{hotel.restaurantName}</div>
          <div className="w-9 h-5 bg-black flex text-white items-center justify-center ml-4 text-sm">
            <p>1</p>
            <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
          </div>
        </div>
        {/* <div className="text-lg text-gray-400">Non-Veg</div> */}
        <div className="text-lg text-gray-400">{hotel.restaurantAddress}</div>
        <div className="flex text-lg mt-2 ">
          <div className="text-orange-400">{hotel.restaurantStatus}</div>
          <div className="text-lg ml-5 w-52">
            {formatTimeWithMeridian(new Date(hotel.openingTime))}-
            {formatTimeWithMeridian(new Date(hotel.closingTime))}
          </div>
        </div>
       
        <div className="flex w-full justify-between p-4">
          <p className="text-3xl">Menu Items</p>
          <Link to="/add">
            <div className="bg-gray-600 font-semibold text-white h-9 w-24 rounded-md">
              <button className="p-2">Add Menu</button>
            </div>
          </Link>
        </div>
        <div className="mt-4">{menuData}</div>

        <div className="p-4 w-full mt-4">
          {foods.map((food) => {
            <div className="flex justify-between items-center">
              <div className="flex">
                <img
                  className="w-48 h-36 rounded-lg"
                  src={food.imageFile}
                  alt={food.foodName}
                />
                <div className="flex flex-col ml-3">
                  <div className="flex">
                    <div className="text-lg">{food.foodName}</div>
                    <div className="w-10  h-4 bg-black flex text-white items-center justify-center mt-1 ml-4 text-sm">
                      <p>4.7</p>
                      <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
                    </div>
                  </div>
                  <div className="text-lg">Biriyani</div>
                  <div className="text-sm">
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                    250 per one
                  </div>
                  <div className="text-sm">It is favorite food of mallus</div>
                  <div className="flex mt-1">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <FontAwesomeIcon className="ml-2" icon={faTrash} />
                  </div>
                </div>
              </div>
            </div>;
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RestuarentPage;

// import RestuarentPage from '../common/RestuarentPage'
// import Header from '../common/Header'

// const RestuarentHomePage = () => {
//   return (
//     <div>
//       <Header orderLink="/restaurantOrder" />
//       <RestuarentPage isRestaurantPage={true}/>
//     </div>
//   )
// }

// export default RestuarentHomePage
