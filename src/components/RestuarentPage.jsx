import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import hotelData from '../json/HotelJson.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

const RestuarentPage = () => {
  const [restaurantData,setRestuarentData]=useState([]);


  useEffect(()=>{
    setRestuarentData(hotelData);
  })

  return (
    <>
      <div className="">
        <Header />
        <div className="">
          <div className='w-full pl-36 pr-36 mt-8 rounded-md'>
          <img
            className="w-full object-cover h-72 rounded-md"
            src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
          </div>
          <div className="ml-36 text-xl font-semibold">NMR Restuarent</div>
          <div className="ml-36 text-lg text-gray-400">
            Dessers,Biriyani,Rice
          </div>
          <div className="ml-36 text-lg  text-gray-400">
            Basavanagudi,banglore,Karnataka
          </div>
          <div className="ml-36 w-64 justify-between text-lg flex">
            <div className="text-orange-400">Open</div>
            <div className="text-lg">10Am-10Pm</div>
          </div>
        </div>
        <p className='ml-36 mt-4 text-3xl'>Menu Items</p>
      <div className='ml-36 mt-4'>
      <div className='flex'>
       <img className='w-48 h-36 rounded-lg'
         src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
       <div className='flex flex-col ml-3 w-1/3'>
        <div className='text-lg'>Chicken Biriyani</div>
        <div className='text-lg'>Biriyani</div>
        <div className='text-sm'>{<FontAwesomeIcon icon={faIndianRupeeSign}/>}420 per item</div>
        <div className='text-sm'>Chicken biriyani is the favorite food kerala</div>
        </div>
        <div >
        <button className='w-14 h-8 bg-green-600 font-bold rounded-md'>+</button>
        <button className='bg-green-600 font-semibold h-8 w-24 ml-1 rounded-md'>Add To Cart</button>
        <button className='w-14 bg-green-600 font-bold h-8 ml-1 rounded-md'>-</button>
        </div>
      </div>
       </div>
      </div>
    </>
  );
}

export default RestuarentPage
