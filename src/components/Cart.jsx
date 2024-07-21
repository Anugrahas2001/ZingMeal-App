import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import foodItems from '../json/FoodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import {updateCart} from '../slices/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {

  const cartItems=useSelector((store)=>store.cart)
  const dispatch=useDispatch();
  let ItemsPrice=0;

  const min = 50;
  const max = 300;
  const random = Math.floor(min + (Math.random() * (max - min)));

  
  const idMap = cartItems.reduce((acc,val)=>{
    acc[val.id] = val
     return acc
  },{})

    const data=foodItems.filter((item)=>Object.keys(idMap).includes(item.id))
    .map((item)=>{
      ItemsPrice=ItemsPrice+item.price*idMap[item.id].quantity;
        return (
          <>
          <div className="border h-56 w-2/3 key={item.id}">
            <div className="  flex mt-3 items-center">
              <div className="flex justify-center items-center mb-1">
                <img
                  className="w-48 ml-7 mb-2 h-36 rounded-lg p-1"
                  src={item.foodImage}
                  alt={item.foodName}
                />
                <div className="flex flex-col ml-4">
                  <div className="flex">
                    <p className="text-lg w-96">{item.foodName}</p>
                    <p>Delivery Time: 30min</p>
                  </div>
                  <div className="flex">
                    <p>{item.rating}</p>
                    <FontAwesomeIcon className="w-3 mt-1" icon={faStar} />
                  </div>
                  <p>{item.hotel}</p>
                  <p>{item.type}</p>
                  <p>{item.price}</p>
                  
                  <div className="flex absolute right-2/3">
                    <FontAwesomeIcon
                      className="text-sm mt-1"
                      icon={faIndianRupeeSign}
                    />
                    <p className="mb-2 text-md">{Math.floor(item.price*idMap[item.id].quantity)}</p>
                  </div>
                  
                  <div className="flex justify-center items-center">
                    <button
                      className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full"
                      onClick={() =>
                        dispatch(updateCart({ value: 1, id: item.id }))
                      }
                    >
                      +
                    </button>
                    <button className="w-14 ml-2 bg-slate-300 text-lg font-semibold rounded-sm ">
                      {idMap[item.id].quantity}
                    </button>
                    <button
                      className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full"
                      onClick={() =>
                        dispatch(updateCart({ value: -1, id: item.id }))
                      }
                    >
                      -
                    </button>
                    <button
                      className="w-20 h-8 ml-5 bg-orange-500 text-white text-lg font-semibold rounded-sm mr-1"
                      onClick={() =>
                        dispatch(updateCart({ value: 0, id: item.id }))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Link to={`/checkout/${item.id}`}><div className=' h-5 flex items-center justify-center'>
          <p className='text-lg  absolute right-1/3 mr-7 bg-blue-600 text-white font-semibold cursor-pointer'>Checkout</p>
            </div>
            </Link>
          </div>
          
          
          </>
        );
    })
    console.log(data,"idd")
  return (
    <div className=" w-full m-3">
      <div className="flex flex-wrap" key={data.id}>
        {data}
        {/* <div className="w-96 h-auto shadow-lg ml-3 absolute right-5">
          <div className="m-5">
            <div className="text-lg h-10 m-5 mt-2 flex justify-center items-center font-semibold shadow-lg ">
              <p className="text-lg text-gray-500 h-5 ">Price Details</p>
            </div>
            <div className="text-lg h-5 m-5 mt-2 flex justify-between">
              <p>Price ({data.length} items)</p>
              <div className="flex">
                <FontAwesomeIcon
                  className="text-sm mt-2"
                  icon={faIndianRupeeSign}
                />
                <p className="mb-2 text-md">{ItemsPrice}</p>
              </div>
            </div>

            <div className="text-lg h-5 m-5 mt-2 flex justify-between">
              <p>Discount</p>
              <div className="flex">
                <p className="text-green-600">-</p>
                <FontAwesomeIcon
                  className="text-sm mt-2 text-green-600"
                  icon={faIndianRupeeSign}
                />
                <p className="mb-2 text-md text-green-600">{random}</p>
              </div>
            </div>

            <div className="text-lg h-5 m-5 mt-2 flex justify-between">
              <p>Delivery Charges</p>
              <div className="flex">
                <p className="mb-2 text-md text-green-600">Free</p>
              </div>
            </div>

            <div className="text-lg h-6 m-5 mt-2 font-semibold flex justify-between border-dashed border-gray-400 border-t-2">
              <p>Total Amount</p>
              <div className="flex">
                <p className="mb-2 text-md text-green-600">
                  {ItemsPrice + random}
                </p>
              </div>
            </div>

            <div className="text-lg h-6 m-5 mt-2 flex justify-between border-dashed border-gray-400 border-t-2">
              <p className="text-sm text-green-800 font-bold mt-1">
                You will save ₹10,152 on this order
              </p>
            </div>

            
              <div className="text-lg h-14 rounded-sm m-5 mt-2 flex justify-between bg-blue-600 cursor-pointer" onClick={oderHndler}>
                <p className=" text-white text-lg font-bold flex justify-center items-center ml-24">
                  Checkout
                </p>
              </div>
            
          </div>
        </div> */}
      </div>
    </div>
  );
}



export default Cart
