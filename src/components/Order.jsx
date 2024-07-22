import React from 'react'
import { useLocation } from 'react-router-dom'
import foodItems from '../json/FoodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Header from './common/Header' 

const Order = () => {

    const location=useLocation();
    console.log(location.state.idArray,"location")

    const orderData=foodItems.filter((item)=>location.state.idArray.includes(item.id)).map((food)=>{
        return (
          <div className='w-2/3 ml-40 mt-6'>
            <div className="flex shadow-inner">
              <img
                className="w-28 rounded-sm m-2"
                src={food.foodImage}
                alt={food.foodName}
              />
              <div className="flex flex-col m-2 w-96">
                <p>{food.foodName}</p>
                <p className="text-gray-400">{food.category}</p>
              </div>
              <div className="flex m-2 w-32">
                <FontAwesomeIcon
                  className="text-sm mt-1"
                  icon={faIndianRupeeSign}
                />
                <p className='pl-1'>{food.price}</p>
              </div>
              <div className='flex flex-col m-2'>
              <FontAwesomeIcon icon={faBell}/>
              <p>food is preparing</p>
              </div>
            </div>
          </div>
        );
    })
    console.log(orderData,"orderdata")
  return (
    <div>
      <Header/>
      {orderData}
    </div>
  )
}

export default Order
