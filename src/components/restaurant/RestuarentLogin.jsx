import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../../slices/restaurantSlice";
import { LoadingContext } from "../common/LoaderContext";

const RestuarentLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    restaurantName: "",
    restaurantAddress: "",
    openingTime: "",
    closingTime: "",
    dayNight1: "AM",
    dayNight2: "PM",
    password: "",
    restaurantImg: null,
    restaurantStatus: "closed",
  });

  const [title, setTitle] = useState("Sign In");
  const [description, setDescription] = useState("New to ZingMeal");
  const [changeSection, setChangeSection] = useState("Create an account");
  const { loading, setLoading } = useContext(LoadingContext);

  const notifyFail = () => {
    toast.error("Mandatory feilds are required", {
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

  const notifyDuplicateName = () => {
    toast.error("Restaurant with this name already exist", {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!credentials.restaurantName || !credentials.password) {
      setLoading(false);
      notifyFail();
      return;
    }

    try {
      let response;
      if (title === "Sign Up") {
        const formData = new FormData();

        formData.set("restaurantName", credentials.restaurantName);
        formData.set("restaurantAddress", credentials.restaurantAddress);
        formData.set("openingTime", credentials.openingTime);
        formData.set("closingTime", credentials.closingTime);
        formData.set("dayNight1", credentials.dayNight1);
        formData.set("dayNight2", credentials.dayNight2);
        formData.set("restaurantPassword", credentials.password);
        formData.append("restaurantImg", credentials.restaurantImg);
        formData.set("restaurantStatus", credentials.restaurantStatus);

        response = await axios.post("/restaurant/signUp", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response from Signup API:", response);

        dispatch(
          addRestaurant({
            id: response.data.Data.id,
            refreshToken: response.data.RefreshToken,
            accessToken: response.data.AccessToken,
          })
        );

        setCredentials({
          restaurantName: "",
          restaurantAddress: "",
          restaurantImg: null,
          password: "",
          dayNight1: "",
          dayNight2: "",
          openingTime: "",
          closingTime: "",
        });
      } else {
        console.log(
          credentials.restaurantName,
          credentials.password,
          "data for restaurant sign in"
        );
        response = await axios.post("/restaurant/login", {
          restaurantName: credentials.restaurantName,
          restaurantPassword: credentials.password,
        });
        console.log(response, "responsee");

        if (response.data && response.data.accessToken) {
          console.log(addRestaurant());
          dispatch(
            addRestaurant({
              id: response.data.Data.id,
              refreshToken: response.data.refreshToken,
              accessToken: response.data.accessToken,
            })
          );
          navigate("/restaurant");
        } else {
          notifyInvalid();
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);

      if (error.response && error.response.data.message) {
        if (
          error.response.data.message &&
          error.response.data.message === "Restaurant already exist"
        ) {
          notifyDuplicateName();
          setCredentials({
            restaurantName: "",
            restaurantAddress: "",
            restaurantImg: null,
            password: "",
            dayNight1: "",
            dayNight2: "",
            openingTime: "",
            closingTime: "",
          });
        } else {
          notifyError();
        }
      } else {
        notifyError();
      }
    } finally {
      setLoading(false);
    }
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
      {/* {loading && <Loader />} */}
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
                value={credentials.restaurantName}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    restaurantName: e.target.value,
                  });
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
            <div className="flex justify-center items-center flex-col">
              <div>
                <label htmlFor="restaurantAddress">Restaurant Address</label>
                <div className="w-80 h-12 flex items-center p-1 rounded-sm border border-gray-300 mb-4">
                  <input
                    type="text"
                    id="restaurantAddress"
                    className="outline-none p-1 w-2/3 ml-2"
                    placeholder="Enter Restaurant name"
                    value={credentials.restaurantAddress}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        restaurantAddress: e.target.value,
                      });
                    }}
                  />
                </div>

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

                <div className="w-80 h-12 mt-5 flex justify-between items-center rounded-sm border border-gray-300 mb-4 p-1">
                  <div className="flex items-center">
                    <label htmlFor="restaurantStatus" className="mr-2">
                      Resturant Status:
                    </label>

                    <select
                      id="restaurantStatus"
                      value={credentials.restaurantStatus}
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          restaurantStatus: e.target.value,
                        });
                      }}
                      className="outline-none ml-7"
                    >
                      <option value="Closed">Closed</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                </div>

                <div className="w-80 h-auto flex flex-col mb-4">
                  <label htmlFor="restaurantImg" className="mb-2">
                    Upload Restaurant Image
                  </label>
                  <input
                    type="file"
                    id="restaurantImg"
                    className="outline-none"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        restaurantImg: e.target.files[0],
                      });
                    }}
                  />
                </div>
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
      {/* <ToastContainer /> */}
    </div>
  );
};

export default RestuarentLogin;
