import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestuarentLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    openingTime: "",
    closingTime: "",
    dayNight1: "AM",
    dayNight2: "PM",
    password: "",
    restaurantImage: null,
  });

  const [title, setTitle] = useState("Sign In");
  const [description, setDescription] = useState("New to ZingMeal");
  const [changeSection, setChangeSection] = useState("Create an account");
  console.log(title, "title");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/restaurant");
  };

  const changePage = () => {
    setTitle((prevState) => {
      return prevState === "Sign In" ? "Sign Up" : "Sign In";
    });
    setDescription((prevState) => {
      return prevState === "New to ZingMeal"
        ? "Already have an account"
        : "New to ZingMeal";
    });
    setChangeSection((prevState) => {
      return prevState === "Create an account"
        ? "Sign In"
        : "Create an account";
    });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="flex flex-col w-96  h-auto justify-center items-center border border-gray-400 p-5">
        <div className="text-gray-500 font-semibold text-3xl mb-5">
          <p>{title}</p>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div>
            <label htmlFor="restaurantName">Restaurant Name</label>
            <div className="w-80 h-12 flex items-center p-1 rounded-sm border border-gray-300 mb-4">
              <input
                type="text"
                id="restaurantName"
                className="outline-none p-1 w-2/3 ml-2"
                placeholder="Enter Restaurant name"
                value={credentials.name}
                onChange={(e) => {
                  setCredentials({ ...credentials, name: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="w-80 h-14 flex flex-col mb-4">
            <label htmlFor="password" className="mb-1">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
              className="outline-none p-1 border h- border-gray-300 rounded-sm"
              placeholder="Enter Password"
            />
          </div>

          {title === "Sign Up" && (
            <div>
              <div className="w-80 h-12 mt-5 flex justify-between items-center rounded-sm border border-gray-300 mb-4 p-1">
                <div className="flex items-center">
                  <label htmlFor="openingTime" className="mr-2">
                    Opening Time:
                  </label>
                  <input
                    type="text"
                    id="openingTime"
                    className="outline-none p-1 w-20 shadow mr-2"
                    value={credentials.openingTime}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        openingTime: e.target.value,
                      });
                    }}
                  />
                  <select
                    value={credentials.dayNight1}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        dayNight1: e.target.value,
                      });
                    }}
                    className="outline-none"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div className="w-80 h-12 flex justify-between items-center rounded-sm border border-gray-300 mb-4 p-1">
                <div className="flex items-center">
                  <label htmlFor="closingTime" className="mr-2">
                    Closing Time:
                  </label>
                  <input
                    type="text"
                    id="closingTime"
                    value={credentials.closingTime}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        closingTime: e.target.value,
                      });
                    }}
                    className="outline-none p-1 w-20 shadow mr-2"
                  />
                  <select
                    value={credentials.dayNight2}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        dayNight2: e.target.value,
                      });
                    }}
                    className="outline-none"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div className="w-80 h-auto flex flex-col mb-4">
                <label htmlFor="restaurantImage" className="mb-2">
                  Upload Restaurant Image
                </label>
                <input
                  type="file"
                  id="restaurantImage"
                  className="outline-none"
                  value={credentials.restaurantImage}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      restaurantImage: e.target.files[0],
                    });
                  }}
                />
              </div>
            </div>
          )}

          <div className="w-80 flex justify-center items-center">
              <button
                onClick={submitHandler}
                className="bg-blue-700 w-80 h-10 text-center text-white rounded-sm"
              >
                Submit
              </button>
          </div>

          <div className="flex mt-2 cursor-pointer" onClick={changePage}>
            <p>{description}</p>
            <p className="ml-1 text-red-500">{changeSection}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestuarentLogin;
