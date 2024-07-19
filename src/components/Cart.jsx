import React,{useState} from 'react'

const Cart = ({cartData,RemoveCartElementhandler}) => {
   

    // const IncrementHandler=(dishName)=>{
    //     setDishCount((prevCount)=>({
    //         ...prevCount,
    //         [dishName]:(prevCount[dishName]||0)+1
    //     }))
    // }
    // const DecrementHandler=(dishName)=>{
    //     setDishCount((prevCount)=>({
    //         ...prevCount,
    //         [dishName]:(prevCount[dishName]||0)>0?prevCount[dishName]-1:0
    //     }))
    // }

    // const OderHandler=()=>{
    //     alert("Order placed successfully");
    // }

    const data=cartData.map((item)=>{
        return (
          <>
            <div className="border w-2/3 ml-32 h-auto">
              <div className="w-full ml-32 flex mt-3 items-center">
                <div className="flex justify-center items-center w-1/2 mt-1 mb-1">
                  <img
                    className="w-20 rounded-sm "
                    src={item.image}
                    alt={item.name}
                  />
                  {/* <p className='ml-4 text-lg w-96'>{item.name} * {dishCount?dishCount:" "}</p> */}
                  <p className="ml-4 text-lg w-96">{item.name}</p>
                  <button
                    className="w-10 h-10 bg-slate-200 text-lg font-semibold ml-1 rounded-full"
                    onClick={() => {
                      IncrementHandler(item.name);
                    }}
                  >
                    +
                  </button>
                  <button className="w-14 bg-slate-300 text-lg font-semibold rounded-sm ml-1">
                  </button>
                  <button
                    className="w-10 h-10 bg-slate-200 text-lg font-semibold ml-1 rounded-full"
                    onClick={() => DecrementHandler(item.name)}
                  >
                    -
                  </button>
                </div>
                <button
                  className="w-20 h-8 ml-28  bg-orange-500 text-white text-lg font-semibold rounded-sm mr-1"
                  onClick={() => {
                    RemoveCartElementhandler(item.name);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className=" h-16 pt-2 w-2/3 ml-32 shadow ">
              <div className="bg-blue-700 w-36 h-11 relative left-2/3 ml-14 flex justify-center items-center rounded-md">
                <p className="text-white font-semibold" onClick={OderHandler}>
                  Place Order
                </p>
              </div>
            </div>
          </>
        );
    })
  return (
   <>
   <h1 className='ml-32'>This is Cart page</h1>
   <p>{data}</p>
   </>
  )
}

export default Cart
