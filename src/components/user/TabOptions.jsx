// import React, { useContext, useEffect, useState } from "react";
// import axios from "../../axios/axios";
// // import axios from '@axios/axios';
// import { Link } from "react-router-dom";
// import Loader from "../common/Loader";
// import { LoadingContext } from "../common/LoaderContext";

// const TabOptions = () => {
//   const [foodItems, setFoodItems] = useState([]);
//   const [foodCategories, setFoodCategories] = useState([]);
//   const [show, setShow] = useState(false);
//   const { loading, setLoading } = useContext(LoadingContext);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("/restaurant/allFoods")
//       .then((response) => {
//         setFoodItems(response.data.allFoods);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   const categoryHandler = (category) => {
//     axios
//       .get(`/restaurant/foodsByCategory/${category}`)
//       .then((response) => {
//         setFoodCategories(response.data.Data);
//         setShow(!show);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const uniqueFoodItems = foodItems.filter(
//     (food, index, self) =>
//       index === self.findIndex((f) => f.foodCategory === food.foodCategory)
//   );
//   const foodItemsToDisplay = uniqueFoodItems.map((food) => {
//     return (
//       <div
//         className=" w-full flex justify-center items-center flex-col pl-1 mt-4 xs:ml-1 overflow-scroll scroll-m-2"
//         key={food.id}
//       >
//         <img
//           className="object-cover rounded-full w-44 h-44 cursor-pointer lg:w-44 lg:h-44 lg:rounded-full md:w-30 md:h-24 md:rounded-full sm:w-56 sm:h-16 xs:w-48 xs:h-16 xs:rounded-full"
//           src={food.imageFile}
//           alt={food.foodCategory}
//           onClick={() => {
//             categoryHandler(food.foodCategory);
//           }}
//         />
//         <p className="food-name xs:text-sm">{food.foodCategory}</p>
//       </div>
//     );
//   });

//   return (
//     <div className="overflow-x-hidden ml-16 mr-16 mt-5 lg:ml-12 lg:mr-12 md:ml-10 md:mr-10 sm:ml-8 sm:mr-8 xs:ml-6 xs:mr-6">
//       <p className="text-3xl mt-2 lg:text-3xl md:text-2xl sm:text-xl xs:text-lg">Eat what makes you happy</p>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <div className="flex">{foodItemsToDisplay}</div>
//           <div className="w-full flex justify-center">
//             {foodCategories && show && (
//               <div className="w-full flex justify-around rounded-md shadow p-3 flex-wrap mt-4 lg:mt-4 md:mt-2 sm:mt-1 xs:mt-1 sm:p-2 sm:flex sm:flex-wrap xs:p-0 xs:flex xs:flex-wrap">
//                 {foodCategories.map((food) => (
//                   <Link to={`/restuarent/${food.restaurant.id}`} key={food.id}>
//                     <div className="flex rounded-md h-64 p-3 shadow mb-4 m-7 lg:p-3 lg:h-64 md:p-2 md:h-56 sm:p-2 sm:h-44 sm:m-2 xs:m-1 xs:h-44 xs:p-1">
//                       <div className="flex flex-col w-72 lg:w-72 md:w-56 sm:w-32 xs:w-24">
//                         {loading ? (
//                           <Loader />
//                         ) : (
//                           <>
//                             {" "}
//                             <img
//                               className="h-40 rounded-md lg:h-40 md:h-36 sm:h-24 xs:h-20"
//                               src={food.imageFile}
//                               alt={food.foodName}
//                             />
//                           </>
//                         )}
//                         <div className="flex justify-between">
//                           <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">{food.foodName}</p>
//                           <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">{food.preparingTime} min</p>
//                         </div>
//                         <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">{food.foodType}</p>
//                         <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">Available : {food.createdBy}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TabOptions;


import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios/axios";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import { LoadingContext } from "../common/LoaderContext";

const TabOptions = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [show, setShow] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/restaurant/allFoods")
      .then((response) => {
        setFoodItems(response.data.allFoods);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const categoryHandler = (category) => {
    axios
      .get(`/restaurant/foodsByCategory/${category}`)
      .then((response) => {
        setFoodCategories(response.data.Data);
        setShow(!show);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uniqueFoodItems = foodItems.filter(
    (food, index, self) =>
      index === self.findIndex((f) => f.foodCategory === food.foodCategory)
  );

  const foodItemsToDisplay = uniqueFoodItems.map((food) => (
    <div
      className="flex-none w-44 h-44 mx-1 overflow-hidden cursor-pointer mt-4 lg:w-44 lg:h-44 md:w-40 md:h-40 sm:w-28 sm:h-28 xs:w-24 xs:h-24"
      key={food.id}
    >
      <img
        className="object-cover rounded-full w-full h-full lg:h-4/5 lg:w-4/5 ml-6 md:w-3/4 md:h-3/4 md:ml-3 sm:w-2/3 sm:h-2/3 sm:ml-5 xs:w-3/4 xs:h-3/4 xs:ml-1"
        src={food.imageFile}
        alt={food.foodCategory}
        onClick={() => {
          categoryHandler(food.foodCategory);
        }}
      /> 
      <p className="text-center text-black text-lg font-semibold ml-4 sm:ml-3 xs:ml-0 sm:text-sm xs:text-sm">{food.foodCategory}</p>


    </div>
  ));

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth / 4,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth / 4,
      behavior: 'smooth'
    });
  };

  return (
    <div className="overflow-hidden ml-16 mr-16 mt-5 lg:ml-12 lg:mr-12 md:ml-10 md:mr-10 sm:ml-6 sm:mr-5 xs:ml-3 xs:mr-3">
      <p className="text-3xl mt-2 lg:text-3xl md:text-2xl sm:text-xl xs:text-lg">
        Eat what makes you happy
      </p>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="relative flex items-center">
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 w-8 h-8 flex items-center bg-gray-300 p-2 rounded-full sm:w-3 sm:h-3"
            >
              &lt;
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto whitespace-nowrap scroll-smooth"
            >
              {foodItemsToDisplay}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 w-8 h-8 flex items-center bg-gray-300 p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
          <div className="w-full flex justify-center mt-4">
            {foodCategories && show && (
              <div className="w-full flex justify-around rounded-md shadow p-3 flex-wrap lg:p-3 lg:flex-wrap mt-4 lg:mt-4 md:mt-2 sm:mt-1 xs:mt-1 sm:p-2 sm:flex sm:flex-wrap xs:p-1 xs:flex xs:flex-wrap">
                {foodCategories.map((food) => (
                  <Link to={`/restuarent/${food.restaurant.id}`} key={food.id}>
                    <div className="flex rounded-md h-64 p-3 shadow mb-4 m-7 lg:p-3 lg:h-64 md:p-2 md:h-56 sm:p-2 sm:h-44 sm:m-2 xs:m-0 xs:h-44 mt-4 xs:mt-3">
                      <div className="flex flex-col w-72 lg:w-72 md:w-56 sm:w-32 xs:w-28">
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            {" "}
                            <img
                              className="h-40 rounded-md lg:h-40 md:h-36 sm:h-24 xs:h-20"
                              src={food.imageFile}
                              alt={food.foodName}
                            />
                          </>
                        )}
                        <div className="flex justify-between">
                          <p className="text-base lg:text-base md:text-sm sm:text-sm xs:text-sm font-semibold">
                            {food.foodName}
                          </p>
                          {/* <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">
                            {food.preparingTime} min
                          </p> */}
                        </div>
                        <p className="text-base lg:text-base md:text-sm sm:text-sm xs:text-sm font-semibold">
                          {food.foodType}
                        </p>
                        <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-sm">
                          Available : {food.createdBy}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TabOptions;

