import React from "react";
import hotelData from "../json/hotel.json";
import Details from "./common/Details";
import { Link } from "react-router-dom";

const Hotels = () => {
  const hotelDetails = hotelData.map((hotel) => {
    return (
      <div
        className="flex flex-col w-1/4 rounded-md shadow ml-14 mt-7"
        key={hotel.id}
      >
        <Link to={`/restuarent/${hotel.id}`}>
          <div className="w-80 h-28 rounded-md ">
            <img
              className="w-full object-cover rounded-md p-3 ml-1"
              src={hotel.hotel_backdrop}
              alt={hotel.name}
            />
          </div>
        </Link>
        <Details hotelData={hotel} />
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
