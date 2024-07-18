import React, { useEffect, useState } from 'react'
import hotelData from '../json/HotelJson.json'
import Details from './common/Details';
import { Link } from 'react-router-dom';
import RestuarentPage from './RestuarentPage';

const Hotels = () => {
    const [hotels,setHotels]=useState([]);
    const [name,setName]=useState('');
  
    useEffect(()=>{
        setHotels(hotelData);
    },[])
    
    function RestuarentHandler (hotelName){
      setName(hotelName);
    }

    const hotelDeatails=hotels.slice(0,3).map((hotel)=>{
        return (
          <>
      <div className='flex flex-col ml-4  p-2 rounded-md shadow-2xl' onClick={()=>{RestuarentHandler(hotel.name)}}>
      <Link to='/restuarent'><div className="w-80 h-36 rounded-md" key={hotel.id} >
        <img
                    className="w-full object-cover rounded-md" 
                    src={hotel.hotel_backdrop}
                    alt={hotel.name}
                   /> 
          </div></Link>
          <Details hotelData={hotel} />
     </div>
     
    
          </>
        );
     })

  return (
    <>
    <div className="hotel-main-container">
    {name&& <RestuarentPage hotelName={name} />}
      <div className="w-96">
      <p className='text-3xl ml-28 mt-2 w-full'>Explore the food life!</p>
        <div className='flex ml-28'key={hotelDeatails.id}>
        {hotelDeatails}
        </div>
        </div>
 
    </div>
    </>
  );
}

export default Hotels
