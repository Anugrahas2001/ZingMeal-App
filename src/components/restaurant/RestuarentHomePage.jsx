import React from "react";
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
import Header from "../common/Header";
import { Link } from "react-router-dom";

const RestuarentPage = () => {
  const selector = useSelector((store) => store.menu);
  console.log(selector, "the selector");

  const restuarentEditHandler = () => {};

  const menuData = selector.map((item) => {
    return (
      <div className="p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              className="w-48 h-36 rounded-lg"
              src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Chicken Biriyani"
            />
            <div className="flex flex-col ml-3">
              <div className="flex">
                <div className="text-lg">Chicken Biriyani</div>
                <div className="w-10  h-4 bg-black flex text-white items-center justify-center mt-1 ml-4 text-sm">
                  <p>4.3</p>
                  <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
                </div>
              </div>
              <div className="text-lg">{item.category}</div>
              <div className="text-sm">
                <FontAwesomeIcon icon={faIndianRupeeSign} />
                {item.price} per one
              </div>
              <div className="text-sm">{item.description}</div>
              <div className="flex mt-1">
                <FontAwesomeIcon icon={faPenToSquare} />
                <FontAwesomeIcon className="ml-2" icon={faTrash} />
              </div>
            </div>
          </div>
          {/* <button className="bg-green-600 font-semibold h-8 w-24 ml-3 rounded-md">
            Add
          </button> */}
        </div>
      </div>
    );
  });

  return (
    <div className="w-full overflow-x-hidden">
      <Header orderLink="/restaurantOrder" />
      <div className="ml-36 mr-36 ">
        <div className="max-w-full mt-8 rounded-md">
          <img
            className="w-full object-cover h-72 rounded-md"
            src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Nmr Hotel"
          />
          <div className="relative bottom-10 left-3/4">
            <Link to="/edit">
              <div
                className="bg-white flex pl-2 p-1 rounded-sm cursor-pointer w-32"
                onClick={restuarentEditHandler}
              >
                <FontAwesomeIcon className="mt-1" icon={faPenToSquare} />
                <button className="ml-1">Edit Info</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex h-8 items-center rounded-lg mt-3 ">
          <div className="text-2xl font-semibold">NMR Hotel</div>
          <div className="w-9 h-5 bg-black flex text-white items-center justify-center ml-4 text-sm">
            <p>1</p>
            <FontAwesomeIcon className="text-sm ml-1" icon={faStar} />
          </div>
        </div>
        <div className="text-lg text-gray-400">Non-Veg</div>
        <div className="text-lg text-gray-400">
          Basavanagudi, Bangalore, Karnataka
        </div>
        <div className="flex text-lg mt-2">
          <div className="text-orange-400">Open</div>
          <div className="text-lg ml-4">10 AM - 11 PM</div>
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
          <div className="flex justify-between items-center">
            <div className="flex">
              <img
                className="w-48 h-36 rounded-lg"
                src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Chicken Biriyani"
              />
              <div className="flex flex-col ml-3">
                <div className="flex">
                  <div className="text-lg">Chicken Biriyani</div>
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
            {/* <button className="bg-green-600 font-semibold h-8 w-24 ml-3 rounded-md">
              Add
            </button> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RestuarentPage;
