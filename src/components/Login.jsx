import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [title, setTitle] = useState("Login");
  const [description, setDescription] = useState("New to ZingMeal?");
  const [changeText, setChangeText] = useState("Create an account");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changePage = () => {
    setTitle((prevState) => {
      return prevState == "Login" ? "Signin" : "Login";
    });

    setDescription((prevState) => {
      return prevState == "New to ZingMeal?"
        ? "Already have an account?"
        : "New to ZingMeal?";
    });

    setChangeText((prevState) => {
      return prevState == "Create an account" ? "Login" : "Create an account";
    });
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="flex flex-col w-96  h-96 justify-center items-center border border-gray-400">
        <div className="text-gray-500 font-semibold text-3xl">
          <p>{title}</p>
        </div>
        <div className="w-80 h-12 flex justify-center items-center p-1 rounded-sm border border-gray-300 mt-5">
          <input
            type="text"
            placeholder="Enter Email"
            className="outline-none p-1 w-80"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div className="w-80 h-12 mt-5 flex justify-center items-center p-1 rounded-sm border border-gray-300">
          <input
            type="text"
            placeholder="Enter Password"
            className="outline-none p-1 w-80"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {title === "Login" && (
          <div className="w-80 h-12 mt-5 flex justify-center items-center p-1 rounded-sm border border-gray-300">
            <input
              type="text"
              placeholder="Enter Confirm Password"
              className="outline-none p-1 w-80"
              value={credentials.confirmPassword}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
        )}
        <div className="w-80 cursor-pointer flex justify-center items-center mt-5 rounded-sm">
          <button
            className="bg-blue-700 w-80 h-10 text-center text-white"
            onClick={submitHandler}
          >
            Log In
          </button>
        </div>
        <div className="flex justify-center w-80 mt-5" onClick={changePage}>
          <p className="text-md">{description}</p>
          <p className="text-lg text-red-500 cursor-pointer">{changeText}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
