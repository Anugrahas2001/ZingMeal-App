import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";

const TabOptions = () => {

  const [foodItems,setFoodItems]=useState([]);
console.log(foodItems,"items")
  

  useEffect(() => {
    axios.get("/restaurant/allFoods").then((response) => {
      // console.log(response.data,"data")
      setFoodItems(response.data.allFoods)
    }).catch((error)=>{
      console.log(error)
    });
  }, []);

  const uniqueFoodItems = foodItems.filter(
    (food, index, self) =>
      index === self.findIndex((f) => f.foodCategory === food.foodCategory)
  );
  const foodItemsToDisplay = uniqueFoodItems.slice(0, 6).map((food) => {
    return (
      <div
        className=" w-full flex justify-center items-center flex-col pl-1 mt-4"
        key={food.id}>
        <img
          className="object-cover rounded-full w-44 h-44"
          src={food.imageFile
          }
          alt={food.foodCategory}
        />
        <p className="food-name">{food.foodCategory}</p>
      </div>
    )});

  return (
    <div className="overflow-x-hidden ml-16 mr-16">
      <p className="text-3xl mt-2">Eat what makes you happy</p>
      <div className="flex">{foodItemsToDisplay}</div>
    </div>
  );
};

export default TabOptions;
