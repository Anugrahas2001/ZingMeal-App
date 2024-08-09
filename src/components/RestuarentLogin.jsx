import React from "react";

const RestuarentLogin = () => {
  return (
    <div>
      <form action="">
        <div className="bg-red-500 w-1/3 h-12 mt-5 flex justify-center items-center p-1 rounded-sm border border-gray-300">
          <input
            type="text"
            className="outline-none p-1 w-96"
            placeholder="Enter Restuarent name"
          />
        </div>
        <div className="bg-red-500 w-1/3 h-12 mt-5 flex justify-center items-center p-1 rounded-sm border border-gray-300">
        <label htmlFor="">Opening Time:</label>
          <div className="w-20 flex ml-2">
          <input
            type="text"
            className="outline-none p-1 w-10"
          />
          <select name="time" id="" className="outline-none">
          <option value="AM"></option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          </div>

          <label htmlFor="">Opening Time:</label>
          <div className="w-20 flex ml-2">
          <input
            type="text"
            className="outline-none p-1 w-10"
          />
          <select name="time" id="" className="outline-none">
          <option value="AM"></option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          </div>
        </div>
        <input type="text" placeholder="Closing time" />
        <input type="text" placeholder="Enter Restuarent image" />
      </form>
    </div>
  );
};

export default RestuarentLogin;
