import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMenu } from "../slices/menuSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodMenu = () => {
  const dispatch = useDispatch();
  const [foodMenu, setFoodMenu] = useState({
    foodName: "",
    foodCategory: "",
    isVeg: false,
    isNonVeg: false,
    price: "",
    description: "",
    imageFile: null,
  });

  const notify = () => {
    toast.success("New item added successfully!", {
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

  const handleSubmitMenu = (e) => {
    e.preventDefault();
    notify();
    dispatch(addMenu(foodMenu));
  };

  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleSubmitMenu}
        className="bg-white p-7 rounded-md shadow-md w-full max-w-2xl"
      >
        <div className="flex flex-col mt-4">
          <label
            htmlFor="foodName"
            className="bg-gray-300 p-2  flex justify-center items-center"
          >
            Item Name
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            type="text"
            required
            id="foodName"
            placeholder="Add item name"
            value={foodMenu.foodName}
            onChange={(e) =>
              setFoodMenu({ ...foodMenu, foodName: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="foodCategory"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Item Category
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            type="text"
            required
            id="foodCategory"
            placeholder="Add item category"
            value={foodMenu.foodCategory}
            onChange={(e) =>
              setFoodMenu({ ...foodMenu, foodCategory: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="itemType"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Item Type
          </label>
          <select
            id="itemType"
            required
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            value={foodMenu.isVeg ? "Veg" : "Non-Veg"}
            onChange={(e) =>
              setFoodMenu({ ...foodMenu, isVeg: e.target.value === "Veg" })
            }
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Veg">Select</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="price"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Price
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            placeholder="Add item price"
            type="text"
            required
            id="price"
            value={foodMenu.price}
            onChange={(e) =>
              setFoodMenu({ ...foodMenu, price: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="description"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Description
          </label>
          <textarea
            className="w-full p-2 h-40 border border-gray-600 rounded-sm outline-none"
            id="description"
            required
            placeholder="Add item description"
            value={foodMenu.description}
            onChange={(e) =>
              setFoodMenu({ ...foodMenu, description: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="imageFile"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Upload File
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            type="file"
            id="imageFile"
            onChange={(e) =>
              setFoodMenu({ ...foodMenu, imageFile: e.target.files[0] })
            }
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

export default FoodMenu;
