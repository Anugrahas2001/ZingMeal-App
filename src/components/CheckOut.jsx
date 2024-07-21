import React from 'react'
import { useParams } from 'react-router-dom'

const CheckOut = () => {

    const {id}=useParams();
    console.log(id,"iddd from checkout")
    
  return (
    
    <div>
        <h1>hkkks</h1>
      <div className="w-96 h-auto shadow-lg ml-3 absolute right-5">
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
        </div>
    </div>
  )
}

export default CheckOut
