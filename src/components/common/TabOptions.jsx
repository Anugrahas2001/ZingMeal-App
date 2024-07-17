import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import axios from 'axios';
import FoodItems from '../json/FoodItems';



const TabOptions = () => {

  const [foodItems,setFoodItems]=useState([]);
  console.log(foodItems)
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
     <div className="food-box-container">
    <div className="food-box" key={food.id}>
      <img
        className="food-image"
        src={food.foodImage}
        alt={food.category}
      />
      <p className="food-name">{food.category}</p>
    </div>
  </div>
    </>
   )

  })

  return (
    <div className="option-container">
      <div className="food-list max-width">
        <p className="description">Eat what makes you happy</p>
        {/* <Slider {...settings}> */}
          <div className="food-list-container">
            {foodItemsToDisplay}
          </div>
        {/* </Slider> */}
      </div>
    </div>
  );
}

export default TabOptions;
