import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../common/LoaderContext";
import Loader from "../common/Loader";
import axios from "../../axios/axios";

const EditFoodMenu = () => {
  const { id } = useParams();
  const restaurantId = useSelector((store) => store.restaurant.id);
  console.log(restaurantId, "idddd");
  const { loading, setLoading } = useContext(LoadingContext);
  const [foodMenu, setFoodMenu] = useState({
    foodName: "",
    foodCategory: "",
    foodDescription: "",
    actualPrice: "",
    discount: "",
    preparingTime: "",
    foodType: "",
    imageFile: null,
    imagePreview: "",
  });
  console.log("helooo");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/restaurant/food/${id}`)
      .then((response) => {
        console.log(response, "response of get");
        const data = response.data.food;
        setFoodMenu({
          foodName: data.foodName,
          foodCategory: data.foodCategory,
          foodDescription: data.foodDescription,
          actualPrice: data.actualPrice,
          discount: data.discount,
          preparingTime: data.preparingTime,
          foodType: data.foodType,
          imageFile: data.imageFile,
          imagePreview: data.imageFile || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const notify = () => {
    toast.success("Food item updated successfully!", {
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

  const handleSubmitImage = (e) => {
    const file = e.target.files[0];
    console.log(file, "image file");
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFoodMenu({ ...foodMenu, imageFile: file, imagePreview: imageUrl });
    }
  };

  const handleSubmitMenu = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.set("foodName", foodMenu.foodName);
    formData.set("foodCategory", foodMenu.foodCategory);
    formData.set("foodType", foodMenu.foodType);
    formData.set("actualPrice", foodMenu.actualPrice);
    formData.set("discount", foodMenu.discount);
    formData.set("preparingTime", foodMenu.preparingTime);
    formData.set("foodDescription", foodMenu.foodDescription);
    formData.append("imageFile", foodMenu.imageFile);

    const response = await axios.put(
      `/restaurant/updateFood/${restaurantId}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setLoading(false);
    notify();

    setFoodMenu({
      foodName: "",
      foodCategory: "",
      foodDescription: "",
      actualPrice: "",
      discount: "",
      preparingTime: "",
      foodType: "",
      imageFile: null,
    });
  };

  return (
    <div className="flex justify-center items-center ">
      {loading ? (
        <Loader />
      ) : (
        <>
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

            <div className="flex justify-around">
              <div className="flex flex-col mt-4 w-80">
                <label
                  htmlFor="foodType"
                  className="bg-gray-300 p-2 w-full flex justify-center items-center"
                >
                  Item Type
                </label>
                <select
                  id="foodType"
                  required
                  className="w-full p-2 border border-gray-600 rounded-sm outline-none"
                  value={foodMenu.foodType}
                  onChange={(e) =>
                    setFoodMenu({ ...foodMenu, foodType: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>

              <div className="flex flex-col mt-4 w-80 ml-2">
                <label
                  htmlFor="discount"
                  className="bg-gray-300 p-2 w-full flex justify-center items-center"
                >
                  Item Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  required
                  className="w-full p-2 border border-gray-600 rounded-sm outline-none"
                  value={foodMenu.discount}
                  onChange={(e) =>
                    setFoodMenu({ ...foodMenu, discount: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label
                htmlFor="actualPrice"
                className="bg-gray-300 p-2 w-full flex justify-center items-center"
              >
                Price
              </label>
              <input
                className="w-full p-2 border border-gray-600 rounded-sm outline-none"
                placeholder="Add item price"
                type="text"
                required
                id="actualPrice"
                value={foodMenu.actualPrice}
                onChange={(e) =>
                  setFoodMenu({ ...foodMenu, actualPrice: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col mt-4">
              <label
                htmlFor="preparingTime"
                className="bg-gray-300 p-2 w-full flex justify-center items-center"
              >
                Preparation Time
              </label>
              <input
                className="w-full p-2 border border-gray-600 rounded-sm outline-none"
                placeholder="Add item preparation time"
                type="text"
                required
                id="preparingTime"
                value={foodMenu.preparingTime}
                onChange={(e) =>
                  setFoodMenu({ ...foodMenu, preparingTime: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col mt-4">
              <label
                htmlFor="foodDescription"
                className="bg-gray-300 p-2 w-full flex justify-center items-center"
              >
                Description
              </label>
              <textarea
                className="w-full p-2 h-40 border border-gray-600 rounded-sm outline-none"
                id="foodDescription"
                required
                placeholder="Add item description"
                value={foodMenu.foodDescription}
                onChange={(e) =>
                  setFoodMenu({ ...foodMenu, foodDescription: e.target.value })
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
              <div className="flex border-gray-600">
                {foodMenu.imagePreview && (
                  <img
                    className="w-20 h-14 object-cover p-1 rounded-lg"
                    src={foodMenu.imagePreview}
                  />
                )}
                <input
                  className="mt-3"
                  type="file"
                  id="imageFile"
                  onChange={handleSubmitImage}
                />
              </div>
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
        </>
      )}
    </div>
  );
};

export default EditFoodMenu;
