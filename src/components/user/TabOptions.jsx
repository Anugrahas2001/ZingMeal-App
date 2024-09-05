import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios/axios";
// import axios from '@axios/axios';
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import { LoadingContext } from "../common/LoaderContext";

const TabOptions = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [show, setShow] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);

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
  const foodItemsToDisplay = uniqueFoodItems.slice(0, 6).map((food) => {
    return (
      <div
        className=" w-full flex justify-center items-center flex-col pl-1 mt-4 xs:ml-1"
        key={food.id}
      >
        <img
          className="object-cover rounded-full w-44 h-44 cursor-pointer lg:w-44 lg:h-44 lg:rounded-full md:w-30 md:h-24 md:rounded-full sm:w-28 sm:h-12 xs:w-8 xs:h-8"
          src={food.imageFile}
          alt={food.foodCategory}
          onClick={() => {
            categoryHandler(food.foodCategory);
          }}
        />
        <p className="food-name xs:text-sm">{food.foodCategory}</p>
      </div>
    );
  });

  return (
    <div className="overflow-x-hidden ml-16 mr-16 mt-5 lg:ml-12 lg:mr-12 md:ml-10 md:mr-10 sm:ml-8 sm:mr-8 xs:ml-6 xs:mr-6">
      <p className="text-3xl mt-2 lg:text-3xl md:text-2xl sm:text-xl xs:text-lg">Eat what makes you happy</p>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex">{foodItemsToDisplay}</div>
          <div className="w-full flex justify-center">
            {foodCategories && show && (
              <div className="w-full flex justify-around rounded-md shadow p-3 flex-wrap mt-4 lg:mt-4 md:mt-2 sm:mt-1 xs:mt-1 sm:p-2 sm:flex sm:flex-wrap xs:p-0 xs:flex xs:flex-wrap">
                {foodCategories.map((food) => (
                  <Link to={`/restuarent/${food.restaurant.id}`} key={food.id}>
                    <div className="flex rounded-md h-64 p-3 shadow mb-4 m-7 lg:p-3 lg:h-64 md:p-2 md:h-56 sm:p-2 sm:h-44 sm:m-2 xs:m-1 xs:h-44 xs:p-1">
                      <div className="flex flex-col w-72 lg:w-72 md:w-56 sm:w-32 xs:w-24">
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
                          <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">{food.foodName}</p>
                          <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">{food.preparingTime} min</p>
                        </div>
                        <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">{food.foodType}</p>
                        <p className="text-base lg:text-base md:text-sm sm:text-xs xs:text-xs">Available : {food.createdBy}</p>
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
