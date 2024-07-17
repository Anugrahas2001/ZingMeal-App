import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import PrevArrow from './common/PrevArrow';
import NextArrow from './common/NextArrow';
import axios from 'axios';
import FoodItems from '../json/FoodItems.json'



const TabOptions = () => {

  const [foodItems,setFoodItems]=useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  useEffect(()=>{
    setFoodItems(FoodItems);
  })

  const foodItemsToDisplay=foodItems.slice(0,6).map((food)=>{
   return(
    <>
    <div className="h-36 w-36 flex justify-center items-center flex-col ml-6 mt-4" key={food.id}>
      <img
        className="w-96 object-cover rounded-full"
        src={food.foodImage}
        alt={food.category}
      />
      <p className="food-name">{food.category}</p>
    </div>
    </>
   )

  })

  return (
   
      <div className="">
        <p className="text-3xl  ml-28 mt-2">Eat what makes you happy</p>
        {/* <Slider {...settings}> */}
          <div className="flex ml-16 pl-3">
            {foodItemsToDisplay}
          </div>
        {/* </Slider> */}
      </div>
  );
}

export default TabOptions;
