import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'

const Details = (props) => {
  return (
    <>
     <div className='rating-name-main-container'>
     <div className="hotel-name-container">
        {props.hotelData.name}
      </div>
     <div className="rating-card-container">
        <div className="rating-card">
          <div className="ratings">{props.hotelData.ratings}</div>
          <FontAwesomeIcon className='star-icon' icon={faStar} />
        </div>
      </div>
     </div>
     <div className='dishes-price-container'>
     <p className='information text-overflow'>{props.hotelData.dishes}</p>
     <p className='information'><FontAwesomeIcon icon={faIndianRupeeSign}/>{props.hotelData.price}</p>
     </div>
     <div className='avilability-time'>
     <p className='information'>{props.hotelData.availability?"Currently Available":"Currently Not avilable"}</p>
     <p className='information'>27 min</p>
     </div>
    </>
  );
}

export default Details
