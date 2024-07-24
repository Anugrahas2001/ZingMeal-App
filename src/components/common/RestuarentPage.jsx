import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faStar ,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import hotelData from "../../json/hotel.json";
import foodItems from "../../json/FoodItems.json";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestuarentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const addToCartFunction = (id) => {
    dispatch(addToCart(id));
    notify();
  };

  const hotelDetails = hotelData
    .filter((hotel) => {
      return hotel.id === id;
    })
    .map((item) => {
      return (
        <div key={item.id}>
          <div className="">
            <div className="w-full pl-36 pr-36 mt-8 rounded-md">
              <img
                className="w-full object-cover h-72 rounded-md"
                src={item.hotel_backdrop}
                alt={item.name}
              />
              <div className="flex relative bottom-10 left-3/4 ml-28 ">
              <div className="bg-white flex p-1 rounded-sm cursor-pointer">
              <FontAwesomeIcon className="mt-1" icon={faPenToSquare} />
              <button className="ml-1">Edit Info</button>
              </div>
              </div>
            </div>

            <div className="flex w-96 justify-between h-8 items-center rounded-lg">
              <div className="ml-36 text-xl font-semibold">{item.name}</div>
              <div className="w-9 h-5 bg-black flex text-white">
                <p>{item.ratings} </p>
                <FontAwesomeIcon className="text-sm mt-1" icon={faStar} />
              </div>
            </div>
            <div className="ml-36 text-lg text-gray-400">{item.category}</div>
            <div className="ml-36 text-lg  text-gray-400">
              Basavanagudi,banglore,Karnataka
            </div>
            <div className="ml-36 w-64 justify-between text-lg flex">
              <div className="text-orange-400">{item.status}</div>
              <div className="text-lg">
                {item.opening_time}-{item.closing_time}
              </div>
            </div>
          </div>
          <div className="flex w-3/4 justify-between ml-8 mt-4">
            <p className="ml-36  text-3xl">Menu Items</p>
            <div className="bg-gray-600 font-semibold text-white h-9 w-24 rounded-md">
              <button className="p-2">Add Menu</button>
            </div>
          </div>
          <div className="mt-14">
          {foodItems
            .filter((food) => {
              return food.category === item.category;
            })
            .map((dish) => {
              return (
                <div className="ml-36 mt-4" key={dish.id}>
                  <div className="flex w-3/4 justify-between">
                    {/* <Link to={`/food/${dish.id}`}> */}
                    <div className="flex">
                      <img
                        className="w-48 h-36 rounded-lg"
                        src={dish.foodImage}
                        alt={dish.foodName}
                      />
                      {/* </Link> */}
                      <div className="flex flex-col ml-3 ">
                        <div className="text-lg">{dish.foodName}</div>
                        <div className="text-lg">{dish.category}</div>
                        <div className="text-sm">
                          {<FontAwesomeIcon icon={faIndianRupeeSign} />}
                          {dish.price} per one
                        </div>
                        <div className="text-sm">{dish.description}</div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="bg-green-600 font-semibold h-8 w-24 ml-3 rounded-md"
                        onClick={() => {
                          addToCartFunction(dish.id);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
        </div>
      );
    });

  return (
    <div className="">
      {/* <Search /> */}
      {hotelDetails}
      <ToastContainer />
    </div>
  );
};

export default RestuarentPage;
