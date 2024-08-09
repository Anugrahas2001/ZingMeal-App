import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./common/Header";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../slices/cartSlice";
import { Link } from "react-router-dom";

const Search = () => {
  const inputRef = useRef(null);
  const [dishname, setDishName] = useState("");
  const count = useSelector(selectTotalQuantity);

  useEffect(() => {
    inputRef.current.focus();
  });

  const cartLink = (
    <Link to="/cart">
      <div className="flex">
        <FontAwesomeIcon
          className="margin-left w-9 mt-1"
          icon={faShoppingCart}
        />
        <div className="flex relative bottom-3 right-4">
          <p className="text-sm w-6 h-6 pl-2 rounded-full bg-red-500 text-white top-5 mb-4 flex items-center">
            {count}
          </p>
        </div>
      </div>
    </Link>
  );
  return (
    <div>
      <Header cartLink={cartLink}>
        <div className="w-1/3 flexrounded-md text-gray-500 h-10  m-2 shadow rounded-md flex">
          <FontAwesomeIcon className="mt-3 ml-2" icon={faMagnifyingGlass} />
          <input
            className="w-full  text-gray-500 h-10 p-2 border-none outline-none"
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            ref={inputRef}
            value={dishname}
            onChange={(e) => {
              setDishName(e.target.value);
            }}
          />
        </div>
      </Header>
    </div>
  );
};

export default Search;
