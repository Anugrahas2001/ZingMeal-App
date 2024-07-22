import React from 'react'
import { useLocation } from 'react-router-dom'
import foodItems from '../json/FoodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Header from './common/Header' 
import { useSelector } from 'react-redux';

const Order = () => {

    const location=useLocation();
    const [{orderId},totalPrice]=useSelector((store)=>store.order)
    console.log(totalPrice,"Order itemssss")

    const orderData=foodItems.filter((item)=>orderId.some((order)=>order.id===item.id))
    .map((food)=>{
        return (
          <div className="mt-1 ">
            <div className="flex">
              <img
                className="w-20 rounded-sm m-2"
                src={food.foodImage}
                alt={food.foodName}
              />
              <div className="flex flex-col m-2  w-96">
                <p>{food.foodName}</p>
                <p className="text-gray-400">{food.category}</p>
              </div>
              
              {/* <div className="flex flex-col m-2">
                <FontAwesomeIcon icon={faBell} />
                <p>food is preparing</p>
              </div> */}
            </div>
          </div>
        );
    })

  return (
    <div>
      <Header />
      <div className="w-full ml-44">
        <div className='w-full mt-2 absolute'>
        <div className="w-2/3 h-auto m-2 flex shadow-2xl">
          <div className="w-64 ml-4">
            <p className="">OrderID:CHE#46271</p>
            <div className=' '>
            {orderData}
            </div>
          </div>
          <div>
            <div className='ml-36'>
              <p className="ml-10 mt-3">Dispatched</p>
              <p className="text-sm">Your item has been prepared</p>
            </div>
          </div>
          <div className='h-auto ml-11'>
          <div className="flex h-7 relative mt-5 ml-10">
            <p>Total Price:</p>
            <div className="bg-yellow-400 flex p-1 rounded-md">
              <FontAwesomeIcon className="mt-1" icon={faIndianRupeeSign} />
              <p className="ml-1 ">{totalPrice}</p>
            </div>
          </div>
          <button className='w-20 p-2 text-white mt-32 ml-16 h-auto cursor-pointer rounded-md bg-red-500'>Cancel</button>
          </div>
          </div>
          
        </div>
      </div> 
    </div>
  );
}

export default Order
