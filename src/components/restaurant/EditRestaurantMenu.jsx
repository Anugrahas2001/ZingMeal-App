import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios/axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRestaurantMenu = () => {
  const restaurantId = useSelector((store) => store.restaurant.id);
  console.log(restaurantId, "id data");
  // const [hotel, setHotel] = useState({});
  const [restaurant, setRestaurant] = useState({
    restaurantName: "",
    restaurantImg: null,
    openingTime: "",
    closingTime: "",
    restaurantStatus: "",
  });

  useEffect(() => {
    axios
      .get(`/restaurant/getRestaurant/${restaurantId}`)
      .then((response) => {
        const data = response.data.Data;
        setRestaurant({
          restaurantName: data.restaurantName,
          restaurantImg: null,
          openingTime: data.openingTime,
          closingTime: data.closingTime,
          restaurantStatus: data.restaurantStatus,
        });
      })
      .catch(console.error);
  }, [restaurantId]);

  const notify = () => {
    toast.success("Restaurant Edited successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const notifyFail = () => {
    toast.error("Failed to Edit restaurant details", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmitMenu = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("restaurantName", restaurant.restaurantName);
    formData.append("restaurantImg", restaurant.restaurantImg);
    formData.set("restaurantStatus", restaurant.restaurantStatus);
    formData.set("openingTime", restaurant.openingTime);
    formData.set("closingTime", restaurant.closingTime);

    axios
      .put(`/restaurant/updateRestaurant/${restaurantId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data, "dataaa");
        notify();
      })
      .catch((error) => {
        console.log(error);
        notifyFail();
      });

    setRestaurant({
      restaurantName: "",
      restaurantImg: null,
      openingTime: "",
      closingTime: "",
      restaurantStatus: "",
    });
  };

  // console.log(restaurant," shsjjj  kskkk hotel data");

  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleSubmitMenu}
        className="bg-white p-7 rounded-md shadow-md w-full max-w-2xl"
      >
        <div className="flex flex-col mt-4">
          <label
            htmlFor="restaurantName"
            className="bg-gray-300 p-2  flex justify-center items-center"
          >
            Restuarent Name
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            type="text"
            required
            id="restaurantName"
            placeholder="Add restuarent name"
            value={restaurant.restaurantName}
            onChange={(e) => {
              setRestaurant({ ...restaurant, restaurantName: e.target.value });
            }}
          />
        </div>

        <div className="flex justify-around">
          <div className="flex flex-col mt-4 w-80">
            <label
              htmlFor="openingTime"
              className="bg-gray-300 p-2 w-full flex justify-center items-center"
            >
              Opening Time
            </label>
            <input
              type="text"
              id="openingTime"
              required
              placeholder="Opening Time"
              className="w-full p-2 border border-gray-600 rounded-sm outline-none"
              value={restaurant.openingTime}
              onChange={(e) => {
                setRestaurant({ ...restaurant, openingTime: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col mt-4 w-80 ml-2">
            <label
              htmlFor="closingTime"
              className="bg-gray-300 p-2 w-full flex justify-center items-center"
            >
              Closing Time
            </label>
            <input
              type="text"
              id="closingTime"
              required
              placeholder="Closing Time"
              className="w-full p-2 border border-gray-600 rounded-sm outline-none"
              value={restaurant.closingTime}
              onChange={(e) => {
                setRestaurant({ ...restaurant, closingTime: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="restaurantStatus"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Restuarent Status
          </label>
          <select
            id="restaurantStatus"
            required
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            value={restaurant.restaurantStatus}
            onChange={(e) => {
              setRestaurant({
                ...restaurant,
                restaurantStatus: e.target.value,
              });
            }}
          >
            <option value="">Select</option>
            <option value="Closed">Closed</option>
            <option value="Open">Open</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="restaurantImg"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Restuarent Image
          </label>
          <input
            type="file"
            id="restaurantImg"
            onChange={(e) => {
              setRestaurant({
                ...restaurant,
                restaurantImg: e.target.files[0],
              });
            }}
          />
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="w-24 p-2 rounded-md bg-green-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditRestaurantMenu;