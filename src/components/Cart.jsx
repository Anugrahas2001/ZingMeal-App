import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import foodItems from '../json/foodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import {updateCart,removeFromCart} from '../slices/cartSlice'

const Cart = () => {

  const selector=useSelector((store)=>store.cart.cartIds)
  const quantity=useSelector((store)=>store.cart.quantity)

  const dispatch=useDispatch();
    
    const data=foodItems.filter((item)=>selector.includes(item.id))
    .map((item)=>{
        return (
          <>
              <div className="border h-auto w-2/3 key={item.id}">
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
                      <p>
                        {item.price}*{quantity}=
                        {Math.floor(item.price * quantity)}
                      </p>

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
                          {quantity}
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
                            dispatch(removeFromCart({ value: 0, id: item.id }))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
          </>
        );
    })
  return (
      <div className=" w-full m-3">
       <div className='flex flex-wrap'>
       {data}
        {/* <div className='w-96 bg-red-400 h-auto m-2 ml-7'>
          <div className='w-96 p-3 shadow-lg'>
          <p className='text-lg text-gray-500 h-5 p-2'>Price Details</p>
          </div>
          <div className='text-lg  h-5 ml-4 mt-2'>
            <p>Price ({data.length} items)</p>
            <div className='flex'>
            <FontAwesomeIcon icon={faIndianRupeeSign}/>
            <p className='mb-2'>{1400}</p>
            </div>
          </div>
        </div> */}
       </div>
      </div>
  );
}



export default Cart
