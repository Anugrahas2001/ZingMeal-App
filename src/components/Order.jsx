import React from 'react'
import foodItems from '../json/FoodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Header from './common/Header' 
import { useSelector } from 'react-redux';

const Order = () => {

    const [{orderId,totalPrice,status}]=useSelector((store)=>store.order)

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
            <div className='ml-36 flex justify-center flex-col'>
              <p className="ml-10 mt-3">{status}</p>
              <p className="text-sm">Your item has been preparing</p>
            </div>
          </div>

          <div className='h-auto ml-20'>
  <div className="flex flex-col justify-between h-full">
    <div className="flex">
      <p className='mt-5'>Total Price:</p>
      <div className="bg-yellow-400 flex p-1 rounded-md mt-5 h-7">
        <FontAwesomeIcon className="mt-1" icon={faIndianRupeeSign} />
        <p className="ml-1">{totalPrice}</p>
      </div>
    </div>
    <button className='w-20 p-2 text-white self-center cursor-pointer rounded-md bg-red-500 mb-4'>Cancel</button>
  </div>
</div>

          </div>
        </div>
      </div> 
    </div>
  );
}

export default Order
