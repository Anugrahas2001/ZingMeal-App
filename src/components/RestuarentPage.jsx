import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import hotelData from '../json/HotelJson.json'
import FoodItems from '../json/FoodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import Cart from './Cart'

const RestuarentPage = ({hotelName}) => {
  const [restaurantData,setRestuarentData]=useState([]);
  const [cartData,setCartData]=useState([]);
  const [cartbutton,setCartButton]=useState({});


  useEffect(()=>{
    setRestuarentData(hotelData);
  },[])

  const cartHandler=(cartImg,cartName)=>{
   {(!cartData.some(item => item.name === cartName))?setCartData([...cartData, {
    image: cartImg,
    name: cartName
  }]):" "}

    setCartButton((prevState)=>({
      ...prevState,
      [cartName]:prevState[cartName]==="Add to cart"?"Go to cart":"Add to cart"
    }))
    // setDishCount((prevCount)=>({
    //   ...prevCount,
    //   [cartName]:(prevCount[cartName]||0)+1
    // }))

  }

  
  // const IncrementHandler=(dishName)=>{
  //   setDishCount((prevCount)=>({
  //     ...prevCount,
  //     [dishName]:(prevCount[dishName]||0)+1
  //   }));
  // }

  // const DecrementHandler=(dishName)=>{
  //   setDishCount((prevCount)=>({
  //     ...prevCount,
  //     [dishName]:(prevCount[dishName])>0?prevCount[dishName]-1:0
  //   }));
  // }

  const hotelDetails=restaurantData.filter((hotel)=>{
    return hotel.name===hotelName;
  })
  .map((item)=>{
    return(
        <>
       <div className="">
          <div className="w-full pl-36 pr-36 mt-8 rounded-md">
            <img
              className="w-full object-cover h-72 rounded-md"
              src={item.hotel_backdrop}
              alt=""
            />
          </div>
          
          <div className='flex w-96 justify-between h-8 items-center rounded-lg'>
          <div className="ml-36 text-xl font-semibold">{item.name}</div>
          <div className='w-8 h-5 bg-black text-white'>
            <p>{item.ratings}</p>
          </div>
          </div>
          <div className="ml-36 text-lg text-gray-400">
            {item.category}
          </div>
          <div className="ml-36 text-lg  text-gray-400">
            Basavanagudi,banglore,Karnataka
          </div>
          <div className="ml-36 w-64 justify-between text-lg flex">
            <div className="text-orange-400">{item.status}</div>
            <div className="text-lg">{item.opening_time}-{item.closing_time}</div>
          </div>
        </div>
        <p className="ml-36 mt-4 text-3xl">Menu Items</p>
        {  FoodItems.filter((food)=>{
        return food.category===item.category
      }).map((dish)=>{return(
        <div className="ml-36 mt-4">
        <div className="flex">
          <img
            className="w-48 h-36 rounded-lg"
            src={dish.foodImage}
            alt={dish.foodName}
          />
          <div className="flex flex-col ml-3 w-1/3">
            <div className="text-lg">{dish.foodName}</div>
            <div className="text-lg">{dish.category}</div>
            <div className="text-sm">
              {<FontAwesomeIcon icon={faIndianRupeeSign} />}420 per item
            </div>
            <div className="text-sm">
              Chicken biriyani is the favorite food kerala
            </div>
          </div>
          <div>
            {/* <button className="w-14 h-8 bg-green-600 font-bold rounded-md" onClick={()=>{IncrementHandler(dish.foodName)}}>
              +
            </button> */}
            <button className="bg-green-600 font-semibold h-8 w-24 ml-1 rounded-md" onClick={()=>{cartHandler(dish.foodImage,dish.foodName)}}>
             {cartbutton[dish.foodName]||"Add to cart"}
            </button>
            {/* <button className="w-14 bg-green-600 font-bold h-8 ml-1 rounded-md" onClick={()=>{DecrementHandler(dish.foodName)}}>
              -
            </button> */}
          </div>
        </div>
   
      </div>
      )})
  }
      </>
      
    )
  })

console.log(hotelDetails,"The hotel details is")


  return (
    <>
      <div className="">
        <Header />
       {hotelDetails}
       <Cart cartData={cartData}  />
      </div>
    </>
  );
}

export default RestuarentPage
