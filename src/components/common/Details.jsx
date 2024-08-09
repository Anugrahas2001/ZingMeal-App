import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

const Details = (props) => {
  return (
    <div className="m-4">
      <div className=" flex mt-24 flex-row">
        <div className="flex justify-between w-64 h-5">
          <div className="ml-5 text-lg ">{props.hotelData.name}</div>
          <div className="flex justify-between ml-4 bg-green-500 ">
            <p className="text-sm">{props.hotelData.ratings}</p>
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-64 ml-5 mt-4">
        <p className="text-md">{props.hotelData.dishes}</p>
        <p className="text-sm flex">
          <FontAwesomeIcon className="mt-1 ml-1" icon={faIndianRupeeSign} />
          {props.hotelData.price}
        </p>
      </div>
      <div className="flex ml-5 w-64 justify-between">
        <p className="">
          {props.hotelData.availability
            ? "Currently Available"
            : "Currently Not avilable"}
        </p>
        <p className="">27 min</p>
      </div>
    </div>
  );
};

export default Details;
