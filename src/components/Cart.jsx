import React,{useState} from 'react'

const Cart = ({cartData}) => {
    const [dishCount,setDishCount]=useState({});
    console.log(dishCount,"dish count")

    const IncrementHandler=(dishName)=>{
        setDishCount((prevCount)=>({
            ...prevCount,
            [dishName]:(prevCount[dishName]||0)+1
        }))
    }
    const DecrementHandler=(dishName)=>{
        setDishCount((prevCount)=>({
            ...prevCount,
            [dishName]:(prevCount[dishName]||0)>0?prevCount[dishName]-1:0
        }))
    }

    const data=cartData.map((item)=>{
        return(
            <>
            <div className='w-full bg-red-500 ml-32 flex mt-3 items-center'>
            <div className='flex justify-center items-center w-1/2 mt-1 mb-1'>
            <img className='w-20 rounded-sm ' src={item.image} alt={item.name} />
            {/* <p className='ml-4 text-lg w-96'>{item.name} * {dishCount?dishCount:" "}</p> */}
            <p className='ml-4 text-lg w-96'>{item.name}</p>
            <button className='w-14 bg-slate-300 text-lg font-semibold rounded-sm ml-1' onClick={()=>{IncrementHandler(item.name)}}>+</button>
            <button className='w-14 bg-slate-300 text-lg font-semibold rounded-sm ml-1'>{dishCount>0?dishCount:"0"}</button>
            <button className='w-14 bg-slate-300 text-lg font-semibold rounded-sm ml-1' onClick={()=>DecrementHandler(item.name)}>-</button>
            </div>
            <button className='w-24 h-11  bg-orange-500 text-white text-lg font-semibold rounded-sm ml-1'>Remove</button>
            </div>
            </>
        )
    })
  return (
   <>
   <h1 className='ml-32'>This is Cart page</h1>
   <p>{data}</p>
   </>
  )
}

export default Cart
