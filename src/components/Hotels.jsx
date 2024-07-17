import React, { useEffect, useState } from 'react'
import hotelData from './json/HotelJson'
import Details from './common/Details';
import { Link } from 'react-router-dom';
import RestuarentPage from './RestuarentPage';

const Hotels = () => {
    const [hotels,setHotels]=useState([]);
    const lastIndex=3;
    const firstIndex=lastIndex-3;
  
    useEffect(()=>{
        setHotels(hotelData);
    })

    

    const hotelDeatails=hotels.slice(firstIndex,lastIndex).map((hotel)=>{
        return (
          <>
      <div className='restuarent-card-details'>
        <div className="restuarent-single-card" key={hotel.id}>
        <Link to='/restuarent'> <img
                    className="image-size"
                    src={hotel.hotel_backdrop}
                    alt={hotel.name}
                  onClick={()=>{RestuarentPagehandler(hotel.hotel_backdrop,hotel.name)}} /> </Link>
          </div>
          <Details hotelData={hotel}/>
     </div>
    
          </>
        );
     })

    

  return (
    <div className="hotel-main-container">
      <div className="max-width">
      <p className='food-listing-description'>Explore the food life!</p>
        <div className="restuarent-card">
        <div className='restuarent-banner max-width'>
        {hotelDeatails}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels
