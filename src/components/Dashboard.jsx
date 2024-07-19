import React from 'react'
import hotelData from '../json/hotel.json'
import Details from './common/Details';
import { Link } from 'react-router-dom';

const Hotels = () => {
  const hotelDetails = hotelData.map((hotel) => {
    return (
      <div
        className="flex flex-col ml-4  w-80 p-2 rounded-md shadow-2xl"
        key={hotel.id}
      >
        <Link to={`/restuarent/${hotel.id}`}>
          <div className="w-80 h-36 rounded-md">
            <img
              className="w-full object-cover rounded-md"
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
    <div className="w-full">
      <p className="text-3xl ml-28 mt-2 w-full">Explore the food life!</p>
      <div
        className="flex flex-wrap w-full cursor-pointer"
        key={hotelDetails.id}
      >
        {hotelDetails}
      </div>
    </div>
  );
};

export default Hotels
