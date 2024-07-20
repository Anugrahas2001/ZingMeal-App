import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import foodItems from '../json/foodItems.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {updateCart} from '../slices/cartSlice'

const Cart = () => {

  const selector=useSelector((store)=>store.cart.cartIds)
  const quantity=useSelector((store)=>store.cart.quantity)

  const dispatch=useDispatch();

    
    const data=foodItems.filter((item)=>selector.includes(item.id))
    .map((item)=>{
        return (
          <div key={item.id}>
            <div className="w-full">
              <div className="border h-auto w-1/2">
                <div className="  flex mt-3 items-center">
                  <div className="flex justify-center items-center mb-1">
                    <img
                      className="w-32 h-32 rounded-sm p-3"
                      src={item.foodImage}
                      alt={item.foodName}
                    />
                    <div className="flex flex-col">
                      <div className='flex w-full'>
                      <p className="text-lg w-96">{item.foodName}</p>
                      <p>Delivery Time: 30min</p>
                      </div>
                      <div className='flex'>
                      <p>{item.rating}</p>
                      <FontAwesomeIcon className='w-3 mt-1' icon={faStar}/> 
                      </div>
                      <p>{item.hotel}</p>
                      <p>{item.type}</p>
                      <p>{item.price}*{quantity}={Math.floor(item.price*quantity)}</p>
                      
                      <div className='flex justify-center items-center'>
                    <button className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full" onClick={()=>dispatch(updateCart({value:1,id:item.id}))}>
                      +
                    </button>
                    <button className="w-14 ml-2 bg-slate-300 text-lg font-semibold rounded-sm ">
                      {quantity}
                    </button>
                    <button className="w-14 ml-2 bg-slate-200 text-lg font-semibold rounded-full" onClick={()=>dispatch(updateCart({value:-1,id:item.id}))}>
                      -
                    </button>
                     <button className="w-20 h-8 ml-5 bg-orange-500 text-white text-lg font-semibold rounded-sm mr-1" onClick={()=>dispatch(updateCart({value:0,id:item.id}))}>
                    Remove
                  </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className=" h-16 pt-2 w-2/3 ml-32 shadow ">
              <div className="bg-blue-700 w-36 h-11 relative left-2/3 ml-14 flex justify-center items-center rounded-md">
                <p className="text-white font-semibold" onClick={OderHandler}>
                  Place Order
                </p>
              </div>
            </div> */}
            </div>
          </div>
        );
    })

  //  const value= data.map((item)=>{
  //    return(
  //     console.log(item)
  //    )
  //   })
  return (
    <div className="m-2 ">
      {/* <h1 className='ml-32'>This is Cart page</h1> */}
      <div className=" w-full">
        {data}
        {/* {value} */}
      </div>
    </div>
  );
}



export default Cart
