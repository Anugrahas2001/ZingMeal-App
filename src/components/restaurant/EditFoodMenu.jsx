import React from "react";

const EditFoodMenu = () => {
  const handleSubmitMenu = (e) => {
    e.preventDefault();
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
            Restuarent Name
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            type="text"
            required
            id="foodName"
            placeholder="Add restuarent name"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="foodCategory"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Restuarent main Category
          </label>
          <input
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
            type="text"
            required
            id="foodCategory"
            placeholder="Add restuarent category"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="itemType"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Restuarent Type
          </label>
          <select
            id="itemType"
            required
            className="w-full p-2 border border-gray-600 rounded-sm outline-none"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Veg">Select</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="description"
            className="bg-gray-300 p-2 w-full flex justify-center items-center"
          >
            Restuarent Description
          </label>
          <textarea
            className="w-full p-2 h-40 border border-gray-600 rounded-sm outline-none"
            id="description"
            required
            placeholder="Add restuarent description"
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
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditFoodMenu;
