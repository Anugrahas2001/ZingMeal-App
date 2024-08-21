import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";

const Hotels = () => {
  const [hotelData, setHotel] = useState([]);
  useEffect(() => {
    axios
      .get("/restaurant/allRestaurants")
      .then((response) => {
        setHotel(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hotelDetails = hotelData.map((hotel) => {
    return (
      <div className="flex flex-col w-1/4 rounded-md shadow ml-14 mt-7">
        <Link to={`/restuarent/${hotel.id}`}>
          <div className="w-80 h-28 rounded-md ">
            <img
              className="w-full object-cover rounded-md p-3 ml-1"
              src={hotel.restaurantImg}
              alt={hotel.restaurantName}
            />
          </div>
        </Link>
        <div className="m-4">
          <div className=" flex mt-24 flex-row">
            <div className="flex justify-between w-64 h-5">
              <div className="ml-5 text-lg ">{hotel.restaurantName}</div>
              <div className="flex justify-between ml-4 bg-green-500 ">
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-64 ml-5 mt-4"></div>
          <div className="flex ml-5 w-64 justify-between">
            <p className="">
              {hotel.restaurantStatus === "Open"
                ? "Currently Available"
                : "Currently Not avilable"}
            </p>
            <p className="">27 min</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full ml-16 mr-16">
      <p className="text-3xl mt-2 w-full">Explore the food life!</p>
      <div
        className="flex flex-wrap w-full cursor-pointer p-3"
        key={hotelDetails.id}
      >
        {hotelDetails}
      </div>
    </div>
  );
};

export default Hotels;
