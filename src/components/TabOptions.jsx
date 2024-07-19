import React from 'react';
import foodItems from '../json/foodItems.json'



const TabOptions = () => {

  const foodItemsToDisplay = foodItems.slice(0, 6).map((food) => {
    return (
      <>
        <div
          className="h-36 w-36 flex justify-center items-center flex-col ml-6 mt-4"
          key={food.id}
        >
          <img
            className="w-96 object-cover rounded-full"
            src={food.foodImage}
            alt={food.category}
          />
          <p className="food-name">{food.category}</p>
        </div>
      </>
    );
  });

  return (
   
      <div>
        <p className="text-3xl  ml-28 mt-2">Eat what makes you happy</p>
          <div className="flex ml-16 pl-3">
            {foodItemsToDisplay}
          </div>
      </div>
  );
}

export default TabOptions;
