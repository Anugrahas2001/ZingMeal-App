import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
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
      <div className="flex ml-0 sm:ml-2 sm:mt-4 xs:mt-4">
        <FontAwesomeIcon
          className="w-9 mt-1 xs:w-3 xs:text-sm xs:mt-0"
          icon={faShoppingCart}
        />
        <div className="flex relative bottom-3 right-4 lg:right-4 md:right-3 sm:right-3 xs:right-1">
          <p className="text-sm w-6 h-6 pl-2 rounded-full bg-red-500 text-white top-5 mb-4 flex items-center xs:w-4 xs:h-4">
            {userId ? cartItemCount : 0}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <Header cartLink={cartLink} orderLink="/userOrder">
        <div className="relative w-full lg:w-2/5 md:w-2/5 md:h-7 sm:w-3/4 xs:w-3/4 xs:m-0">
          <div className="flex rounded-md text-gray-500 h-10 m-2 shadow item sm:m-1 items-center justify-center sm:ml-1 xs:m-0">
            <FontAwesomeIcon className="mt-2 ml-2 text-base md:text-sm md:ml-1 sm:text-xs xs:text-xs xs:mt-1 xs:ml-1" icon={faMagnifyingGlass} />
            <input
              className="w-full text-gray-500 h-10 p-2 border-none outline-none text-base md:text-sm md:h-7 sm:h-3 sm:text-xs xs:text-xs xs:p-1"
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
                        className="w-10 rounded object-cover h-10 mr-3 sm:w-7"
                        src={suggestion.restaurantImg}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-base lg:text-base sm:text-sm xs:text-sm">
                          {suggestion.restaurantName}
                        </span>
                        <span
                          className={`text-base lg:text-base sm:text-sm xs:text-sm ${
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







// import React, { useContext, useEffect, useRef, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faShoppingCart,
// } from "@fortawesome/free-solid-svg-icons";
// import Header from "../common/Header";
// import { Link } from "react-router-dom";
// import axios from "../../axios/axios";
// import { CounterContext } from "../common/CountContext";
// import { cartItemCounter } from "../../slices/cartItemSlice";
// import Cookies from "js-cookie";
// import { useDispatch, useSelector } from "react-redux";
// import { useDebouncedCallback } from "use-debounce";

// const Search = () => {
//   const inputRef = useRef(null);
//   const [dishname, setDishName] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isSearchVisible, setSearchVisible] = useState(false); // State for search bar visibility
//   const { cartItemCount, setCartItemCount } = useContext(CounterContext);
//   const dispatch = useDispatch();
//   const getAccessToken = () => Cookies.get("accessToken");
//   const userId = useSelector((store) => store.user.id);

//   useEffect(() => {
//     const fetchInitialCartItemCount = async () => {
//       const config = {
//         headers: { Authorization: getAccessToken() },
//       };

//       try {
//         const countData = await axios.get("/restaurant/getCount", config);
//         const newCount = countData.data.Count;
//         setCartItemCount(newCount);
//         dispatch(cartItemCounter(newCount));
//       } catch (error) {
//         console.error("Error fetching initial cart item count:", error);
//       }
//     };

//     fetchInitialCartItemCount();
//   }, []);

//   const debouncedSearch = useDebouncedCallback(async (dishname) => {
//     if (dishname) {
//       try {
//         axios.get(`/user/search/${dishname}`).then((response) => {
//           setSuggestions(response.data.Data);
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   }, 300);

//   const searchItemHandler = (e) => {
//     const value = e.target.value;
//     setDishName(value);
//     debouncedSearch(value);
//   };

//   const handleSuggestionClick = () => {
//     setSuggestions([]);
//     setDishName("");
//   };

//   const cartLink = (
//     <Link to="/cart">
//       <div className="flex ml-0 sm:ml-2 sm:mt-4 xs:mt-4">
//         <FontAwesomeIcon
//           className="w-9 mt-1"
//           icon={faShoppingCart}
//         />
//         <div className="flex relative bottom-3 right-4 lg:right-4 md:right-3 sm:right-3">
//           <p className="text-sm w-6 h-6 pl-2 rounded-full bg-red-500 text-white top-5 mb-4 flex items-center">
//             {userId ? cartItemCount : 0}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div>
//       <Header cartLink={cartLink} orderLink="/userOrder">
//         <div className="relative w-full lg:w-2/5 md:w-2/5 sm:w-3/4 xs:w-full xs:m-0">
//           {/* Search Bar for larger screens */}
//           <div className={`flex rounded-md text-gray-500 h-10 m-2 shadow item sm:m-1 items-center justify-center ${isSearchVisible ? "block" : "hidden"} lg:flex md:flex sm:flex`}>
//             <FontAwesomeIcon className="mt-2 ml-2 text-base md:text-sm md:ml-1 sm:text-xs xs:text-xs xs:mt-1 xs:ml-1" icon={faMagnifyingGlass} />
//             <input
//               className="w-full text-gray-500 h-10 p-2 border-none outline-none text-base md:text-sm md:h-7 sm:h-3 sm:text-xs xs:text-xs xs:p-1"
//               type="text"
//               placeholder="Search for restaurant, cuisine or a dish"
//               ref={inputRef}
//               value={dishname}
//               onChange={searchItemHandler}
//             />
//           </div>

//           {/* Search Icon and Search Bar Toggle for xs screens */}
//           <div className="flex items-center sm:hidden absolute left-44 mb-4">
//             <FontAwesomeIcon
//               className="mt-2 ml-2 text-base md:text-sm md:ml-1 sm:text-xs xs:text-xs cursor-pointer"
//               icon={faMagnifyingGlass}
//               onClick={() => setSearchVisible(!isSearchVisible)}
//             />
//             {isSearchVisible && (
//               <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-lg">
//                 <div className="flex rounded-md text-gray-500 h-10 m-2 shadow item sm:m-1 items-center justify-center">
//                   <FontAwesomeIcon className="mt-2 ml-2 text-base md:text-sm md:ml-1 sm:text-xs xs:text-xs xs:mt-1 xs:ml-1" icon={faMagnifyingGlass} />
//                   <input
//                     className="w-full text-gray-500 h-10 p-2 border-none outline-none text-base md:text-sm md:h-7 sm:h-3 sm:text-xs xs:text-xs xs:p-1"
//                     type="text"
//                     placeholder="Search for restaurant, cuisine or a dish"
//                     ref={inputRef}
//                     value={dishname}
//                     onChange={searchItemHandler}
//                   />
//                 </div>
//                 {suggestions.length > 0 && (
//                   <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg">
//                     {suggestions.map((suggestion) => (
//                       <Link to={`/restuarent/${suggestion.id}`} key={suggestion.id}>
//                         <div
//                           className="p-2 hover:bg-gray-200 cursor-pointer"
//                           onClick={() => handleSuggestionClick(suggestion)}
//                         >
//                           <div className="flex">
//                             <img
//                               className="w-10 rounded object-cover h-10 mr-3 sm:w-7"
//                               src={suggestion.restaurantImg}
//                               alt=""
//                             />
//                             <div className="flex flex-col">
//                               <span className="font-semibold text-base lg:text-base sm:text-sm xs:text-sm">
//                                 {suggestion.restaurantName}
//                               </span>
//                               <span
//                                 className={`text-base lg:text-base sm:text-sm xs:text-sm ${
//                                   suggestion.restaurantStatus === "Open"
//                                     ? "text-green-500"
//                                     : "text-red-500"
//                                 }`}
//                               >
//                                 {suggestion.restaurantStatus}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </Header>
//     </div>
//   );
// };

// export default Search;
