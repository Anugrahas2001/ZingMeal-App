import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../common/Header";
import { Link } from "react-router-dom";
// import axios from "../../axios/axios";
import axios from '@axios/axios';
import { CounterContext } from "../common/CountContext";
import { cartItemCounter } from "../../slices/cartItemSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const inputRef = useRef(null);
  const [dishname, setDishName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { cartItemCount, setCartItemCount } = useContext(CounterContext);
  const dispatch = useDispatch();
  const getAccessToken = () => Cookies.get("accessToken");
  const userId = useSelector((store) => store.user.id);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    const fetchInitialCartItemCount = async () => {
      const config = {
        headers: { Authorization: getAccessToken() },
      };

      try {
        const countData = await axios.get("/restaurant/getCount", config);
        const newCount = countData.data.Count;
        setCartItemCount(newCount);
        dispatch(cartItemCounter(newCount));
      } catch (error) {
        console.error("Error fetching initial cart item count:", error);
      }
    };

    fetchInitialCartItemCount();
  }, []);

  const debouncedSearch = useDebouncedCallback(async (dishname) => {
    if (dishname) {
      try {
        axios.get(`/user/search/${dishname}`).then((response) => {
          setSuggestions(response.data.Data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    setSuggestions([]);
  }, 300);

  const searchItemHandler = (e) => {
    const value = e.target.value;
    setDishName(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = () => {
    setSuggestions([]);
    setDishName("");
  };

  const cartLink = (
    <Link to="/cart">
      <div className="flex">
        <FontAwesomeIcon
          className="margin-left w-9 mt-1"
          icon={faShoppingCart}
        />
        <div className="flex relative bottom-3 right-4">
          <p className="text-sm w-6 h-6 pl-2 rounded-full bg-red-500 text-white top-5 mb-4 flex items-center">
            {userId ? cartItemCount : 0}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <Header cartLink={cartLink} orderLink="/userOrder">
        <div className="relative w-1/3 ">
          <div className="flexrounded-md text-gray-500 h-10  m-2 shadow rounded-md flex">
            <FontAwesomeIcon className="mt-3 ml-2" icon={faMagnifyingGlass} />
            <input
              className="w-full  text-gray-500 h-10 p-2 border-none outline-none"
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              ref={inputRef}
              value={dishname}
              onChange={searchItemHandler}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg">
              {suggestions.map((suggestion) => (
                <Link to={`/restuarent/${suggestion.id}`}>
                  <div
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex">
                      <img
                        className="w-10 rounded object-cover h-10 mr-3"
                        src={suggestion.restaurantImg}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {suggestion.restaurantName}
                        </span>
                        <span
                          className={`${
                            suggestion.restaurantStatus === "Open"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {suggestion.restaurantStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Header>
    </div>
  );
};

export default Search;
