import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../slices/userSlice.js";
import { createCart } from "../../slices/cartSlice.js";

const UserLogin = () => {
  // const userData = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [title, setTitle] = useState("Sign In");
  const [description, setDescription] = useState("New to ZingMeal?");
  const [changeText, setChangeText] = useState("Create an account");

  const notifySuccess = () => {
    toast.success(`User ${title} successfully`, {
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

  const notifyFail = () => {
    toast.error("Mandatory feilds required", {
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

  const notifyInValidEmail = () => {
    toast.error("Email already exist", {
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

  const notifyInvalid = () => {
    toast.error("Invalid Credentials", {
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

  const notifyError = () => {
    toast.error("An error occurred. Please try again.", {
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

  const notifyPassword = () => {
    toast.error("Passwords do not match", {
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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      notifyFail();
      return;
    }

    if (
      title === "Sign Up" &&
      credentials.password !== credentials.confirmPassword
    ) {
      notifyPassword();
      return;
    }

    try {
      let response;

      if (title === "Sign Up") {
        console.log("Going to call Sign Up API");
        response = await axios.post("/user/signUp", {
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
        });
      } else {
        console.log("Going to call Login API");
        response = await axios.post("/user/login", {
          email: credentials.email,
          password: credentials.password,
        });
        console.log(response, "response of user");

        if (response.data && response.data.accessToken) {
          const userId = response.data.Data.id;
          const config = {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
            },
          };
          const createCartResponse = await axios.get(
            `/user/getcart/${userId}`,
            config
          );

          const cartId = createCartResponse.data.Data.id;

          dispatch(createCart({ id: cartId }));

          dispatch(
            addUser({
              id: userId,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
          notifySuccess();
        }
        setTimeout(() => {
          navigate("/user");
        }, 4000);
      }

      setCredentials({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (
          error.response.data.message ===
          "User with this email is already present"
        ) {
          notifyInValidEmail();
          setCredentials({
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          notifyError();
        }
      } else {
        notifyError();
        console.log("API call failed", error);
      }
    }
  };

  const changePage = () => {
    setTitle((prevState) => {
      return prevState === "Sign Up" ? "Sign In" : "Sign Up";
    });

    setDescription((prevState) => {
      return prevState === "New to ZingMeal?"
        ? "Already have an account?"
        : "New to ZingMeal?";
    });

    setChangeText((prevState) => {
      return prevState === "Create an account"
        ? "Sign In"
        : "Create an account";
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
            type="email"
            required
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
            type="password"
            required
            placeholder="Enter Password"
            className="outline-none p-1 w-80"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {title === "Sign Up" && (
          <div className="w-80 h-12 mt-5 flex justify-center items-center p-1 rounded-sm border border-gray-300">
            <input
              type="password"
              placeholder="Enter Confirm Password"
              required
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
            Submit
          </button>
        </div>

        <div className="flex justify-center w-80 mt-5" onClick={changePage}>
          <p className="text-md">{description}</p>
          <p className="text-lg text-red-500 cursor-pointer">{changeText}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
