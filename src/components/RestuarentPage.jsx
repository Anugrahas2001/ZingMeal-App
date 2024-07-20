import React from 'react'
import Header from './common/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign,faStar } from '@fortawesome/free-solid-svg-icons'
import {useParams} from 'react-router-dom'
import hotelData from '../json/hotel.json'
import foodItems from '../json/foodItems.json'
import { addToCart } from '../slices/cartSlice'
import { useDispatch} from 'react-redux'



const RestuarentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

 

  const hotelDetails = hotelData
    .filter((hotel) => {
      return hotel.id === id;
    })
    .map((item) => {
      return (
        <div key={item.id}>
          <div className="" >
            <div className="w-full pl-36 pr-36 mt-8 rounded-md">
              <img
                className="w-full object-cover h-72 rounded-md"
                src={item.hotel_backdrop}
                alt=""
              />
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
          <p className="ml-36 mt-4 text-3xl">Menu Items</p>
          {foodItems
            .filter((food) => {
              return food.category === item.category;
            })
            .map((dish) => {
              return (
                <div className="ml-36 mt-4" key={dish.id}>
                  <div className="flex">
                    <img
                      className="w-48 h-36 rounded-lg"
                      src={dish.foodImage}
                      alt={dish.foodName}
                    />
                    <div className="flex flex-col ml-3 w-1/3">
                      <div className="text-lg">{dish.foodName}</div>
                      <div className="text-lg">{dish.category}</div>
                      <div className="text-sm">
                        {<FontAwesomeIcon icon={faIndianRupeeSign} />}
                        {dish.price} per one
                      </div>
                      <div className="text-sm">{dish.description}</div>
                    </div>
                    <div>
                      <button
                        className="bg-green-600 font-semibold h-8 w-24 ml-1 rounded-md"
                        onClick={() => dispatch(addToCart(dish))}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
      );
    });

  return (
   
      <div className="">
        <Header />
        {hotelDetails}
      </div>
    
  );
};

export default RestuarentPage
