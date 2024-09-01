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
        className=" w-full flex justify-center items-center flex-col pl-1 mt-4"
        key={food.id}
      >
        <img
          className="object-cover rounded-full w-44 h-44 cursor-pointer"
          src={food.imageFile}
          alt={food.foodCategory}
          onClick={() => {
            categoryHandler(food.foodCategory);
          }}
        />
        <p className="food-name">{food.foodCategory}</p>
      </div>
    );
  });

  return (
    <div className="overflow-x-hidden ml-16 mr-16 mt-5">
      <p className="text-3xl mt-2">Eat what makes you happy</p>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex">{foodItemsToDisplay}</div>
          <div className="w-full flex justify-center">
            {foodCategories && show && (
              <div className="flex justify-center rounded-md shadow p-3 flex-wrap mt-4">
                {foodCategories.map((food) => (
                  <Link to={`/restuarent/${food.restaurant.id}`} key={food.id}>
                    <div className="flex rounded-md h-64 p-3 shadow mb-4 m-7">
                      <div className="flex flex-col w-72">
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            {" "}
                            <img
                              className="h-40 rounded-md"
                              src={food.imageFile}
                              alt={food.foodName}
                            />
                          </>
                        )}
                        <div className="flex justify-between">
                          <p>{food.foodName}</p>
                          <p>{food.preparingTime} min</p>
                        </div>
                        <p>{food.foodType}</p>
                        <p>Available : {food.createdBy}</p>
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
