import React from 'react'
import { useParams } from 'react-router-dom'
import foodItems from '../json/FoodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Header from './common/Header'

const FoodRecepies = () => {

    const {id}=useParams();

    const data=foodItems.filter((item)=>item.id==id).map((food)=>{
        return (
          <div>
            <div className="w-full pl-36 pr-36 mt-8 rounded-md">
              <img
                className="w-full object-cover h-72 rounded-md shadow-sm"
                src={food.foodImage}
                alt={food.foodName}
              />
            </div>
            <div className="ml-40 mt-8 p-3">
              <div className="flex w-96 justify-between items-center">
                <p className="text-xl font-semibold">{food.foodName}</p>
                <div className="w-9 h-5 bg-black flex text-white">
                  <p>{food.rating} </p>
                  <FontAwesomeIcon className="text-sm mt-1" icon={faStar} />
                </div>
              </div>
              <p className="text-gray-600">{food.category}</p>
              <p className="font-semibold">{food.type}</p>
              <div className="flex">
                <p className="font-semibold">Available: </p>
                <p>{food.hotel}</p>
              </div>
              <div className="mt-2">
                <p className="font-bold text-2xl">How to make?</p>
              </div>
              <div className="mt-3">
                <div className="flex">
                  <p className="font-semibold">Preparing Time: </p>
                  <p>{food.CookingTime}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold">Ingredients: </p>
                  {food.ingredients.map((ingredient) => {
                    return (
                      <div className="mr-2">
                        <p className="p-1"> {ingredient}</p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p className="font-semibold">Preparing Steps:</p>
                  <p className='w-4/5'>{food.preparingSteps}</p>
                </div>
              </div>
            </div>
          </div>
        );
    })
    

    
  return (
    <div>
      <Header/>
      {data}
    </div>
  )
}

export default FoodRecepies
