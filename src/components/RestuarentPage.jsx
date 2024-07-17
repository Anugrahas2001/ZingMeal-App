import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import hotelData from './json/HotelJson'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

const RestuarentPage = () => {
  const [restaurantData,setRestuarentData]=useState([]);


  useEffect(()=>{
    setRestuarentData(hotelData);
  })

  return (
    <>
      <div className="restuarent-page max-width">
        <Header />
        <div className="resturent-page-banner">
          <img
            className="restuarent-page-image"
            src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
          <div className="restuarent-page-hotel-name">Nmr Restuarent</div>
          <div className="restuarent-page-hotel-categories">
            Dessers,Biriyani,Rice
          </div>
          <div className="restuarent-page-hotel-address">
            Basavanagudi,banglore,Karnataka
          </div>
          <div className="status-time">
            <div className="status">Open</div>
            <div className="opening-time">10Am-10Pm</div>
          </div>
        </div>
        <p className='food-listing-description'>Menu Items</p>
        <div className='restuarent-page'>
        <div className='restuatrent-page-foodname'>Chicken Biriyani</div>
        <div className='restuatrent-page-foodCategory'>Biriyani</div>
        <div className='restuatrent-page-foodPrice'>{<FontAwesomeIcon icon={faIndianRupeeSign}/>}420</div>
        <div className='restuatrent-page-description'>Chicken biriyani is the favorite food kerala</div>
        </div>
        <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D" alt="" />

      </div>
    </>
  );
}

export default RestuarentPage
