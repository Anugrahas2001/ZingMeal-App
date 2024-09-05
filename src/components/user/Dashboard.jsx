import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
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
        className="flex flex-col w-full sm:w-4/5 md:w-3/4 lg:w-1/4 xs:w-full rounded-md shadow-lg lg:m-7"
      >
        <Link to={`/restuarent/${hotel.id}`}>
          <div className="relative h-56 rounded-md overflow-hidden xs:h-32 xs:w-full">
            <img
              className="w-full h-full object-cover p-3"
              src={hotel.restaurantImg}
              alt={hotel.restaurantName}
            />
          </div>
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-semibold lg:text-lg md:text-lg xs:text-sm">{hotel.restaurantName}</div>
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded xs:px-1 xs:py-0">
              <FontAwesomeIcon icon={faStar} className="text-sm" />
              <p className="ml-1">1</p>
            </div>
          </div>
          <div className="mb-2 text-gray-600 flex justify-between lg:text-lg md:text-lg xs:text-sm">
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
    <div className="overflow-x-hidden ml-16 mr-16 mt-5 lg:ml-14 lg:mr-14 md:ml-10 md:mr-10 sm:ml-8 sm:mr-8 xs:ml-6 xs:mr-5">
      <p className="text-3xl mt-2 lg:text-3xl md:text-2xl sm:text-xl xs:text-lg">Explore the food life!</p>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center mt-5 md:ml-10 md:mr-10 sm:ml-8 sm:mr-8 xs:ml-6 xs:mr-6">
          {hotelDetails}
        </div>
      )}
    </div>
  );
};

export default Hotels;
