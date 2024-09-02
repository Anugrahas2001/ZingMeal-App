import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
// import axios from '@axios/axios';
import { LoadingContext } from "../common/LoaderContext";
import Loader from "../common/Loader";

const Hotels = () => {
  let min = 17;
  let max = 50;

  const [hotelData, setHotel] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/restaurant/allRestaurants")
      .then((response) => {
        setHotel(response.data.Data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [setLoading]);

  const hotelDetails = hotelData.map((hotel) => {
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    return (
      <div
        key={hotel.id}
        className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-md shadow-lg m-10"
      >
        <Link to={`/restuarent/${hotel.id}`}>
          <div className="relative h-56 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover p-3"
              src={hotel.restaurantImg}
              alt={hotel.restaurantName}
            />
          </div>
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-semibold">{hotel.restaurantName}</div>
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded">
              <FontAwesomeIcon icon={faStar} className="text-sm" />
              <p className="ml-1">1</p>
            </div>
          </div>
          <div className="mb-2 text-gray-600 flex justify-between">
            <p>
              {hotel.restaurantStatus === "Open"
                ? "Currently Available"
                : "Currently Not Available"}
            </p>
            <div className="text-gray-600">
              <p>{random} min</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full px-4 md:px-8 lg:px-16">
      <p className="text-3xl mt-2 w-full">Explore the food life!</p>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center ml-16 mr-16">
          {hotelDetails}
        </div>
      )}
    </div>
  );
};

export default Hotels;
