import React from "react";
import foodItems from "../json/FoodItems.json";

const TabOptions = () => {
  const foodItemsToDisplay = foodItems.slice(0, 6).map((food) => {
    return (
      <div
        className=" w-full flex justify-center items-center flex-col pl-1 mt-4"
        key={food.id}
      >
        <img
          className="w-full object-cover rounded-full"
          src={food.foodImage}
          alt={food.category}
        />
        <p className="food-name">{food.category}</p>
      </div>
    );
  });

  return (
    <div className="overflow-x-hidden m-4">
      <p className="text-3xl mt-2">Eat what makes you happy</p>
      <div className="flex">{foodItemsToDisplay}</div>
    </div>
  );
};

export default TabOptions;
