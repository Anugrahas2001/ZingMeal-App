import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../../slices/restaurantSlice";
import { LoadingContext } from "../common/LoaderContext";
import Loader from "../common/Loader";

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

  const notify = () => {
    toast.success("Restaurant created Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className:
        "w-80 lg:w-80 md:w-72 md:text-sm sm:w-64 sm:text-xs xs:w-64 xs:text-xs xs:h-3",
    });
  };

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
    // setLoading(true);

    if (!credentials.restaurantName || !credentials.password) {
      setLoading(false);
      notifyFail();
      return;
    }

    try {
      let response;
      setLoading(true);
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

        setLoading(false);
        notify();
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
        console.log(response, "loged in");
        setLoading(true);
        if (response.data && response.data.accessToken) {
          dispatch(
            addRestaurant({
              id: response.data.Data.id,
              refreshToken: response.data.refreshToken,
              accessToken: response.data.accessToken,
            })
          );
          setLoading(false);
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
      return prevState === "New to ZingMeal?"
        ? "Already have an account"
        : "New to ZingMeal?";
    });
    setChangeSection((prevState) => {
      return prevState === "Create an account"
        ? "Sign In"
        : "Create an account";
    });
  };

  return (
    <div className="flex justify-center items-center mt-20">
       {loading ? (
        <Loader/>
       ):(
      <div className="flex flex-col w-full lg:w-2/5 md:w-2/5 sm:w-2/3 xs:w-4/5 h-auto justify-center items-center border border-gray-300 p-5 md:p-1">
        <div className="text-gray-500 font-semibold text-3xl mb-5">
          <p className="text-2xl">{title}</p>
        </div>

        <div className="flex justify-center items-center flex-col w-full lg:w-4/5 md:w-80 md:h-3/5 xs:w-full">
          <div className="flex flex-col w-80 lg:w-80 md:w-64 sm:w-60 xs:w-56 xs:mb-2">
            <label
              htmlFor="restaurantName"
              className="text-base lg:text-base md:text-sm xs:text-sm"
            >
              Restaurant Name
            </label>
            <div className="h-12 lg:h-12 md:h-10 sm:h-8 xs:h-8 flex justify-center items-center rounded-sm mt-2 border border-gray-300 p-1 md:text-sm">
              <input
                type="text"
                id="restaurantName"
                className="outline-none p-1 lg:w-72 md:w-64 sm:64 xs:w-56 xs:text-sm"
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

          <div className="flex flex-col mb-4 w-80 lg:w-80 md:w-64 sm:w-60 xs:w-56">
            <label
              htmlFor="password"
              className="mt-1 lg:text-base md:text-sm xs:text-sm"
            >
              Password
            </label>
            <div className="h-12 lg:h-12 md:h-10 sm:h-8 xs:h-8 flex justify-center items-center rounded-sm mt-1 border border-gray-300 p-1 md:text-sm sm:text-sm xs:text-sm">
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
                className="outline-none p-1 w-72 lg:text-base lg:w-72 md:w-64 sm:64 xs:w-64 xs:text-sm"
                placeholder="Enter Password"
              />
            </div>
          </div>

          {title === "Sign Up" && (
            <div className="flex justify-center items-center flex-col">
              <div className="w-80 lg:w-80 md:w-64 sm:w-60 xs:w-56">
                <label
                  htmlFor="restaurantAddress"
                  className="text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                >
                  Restaurant Address
                </label>
                <div className="h-12 lg:h-12 md:h-10 sm:h-8 xs:h-8 flex items-center p-1 rounded-sm border border-gray-300 mb-4 md:mb-1">
                  <input
                    type="text"
                    id="restaurantAddress"
                    className="outline-none p-1 ml-2 w-72 lg:w-72 md:w-64 md:ml-0 sm:ml-0 sm:text-sm xs:text-sm"
                    placeholder="Enter Restaurant address"
                    value={credentials.restaurantAddress}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        restaurantAddress: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-80 h-12 lg:h-12 md:h-10 sm:h-10 xs:h-10 mt-5 flex justify-between items-center rounded-sm border border-gray-300 mb-4 p-1 lg:w-80 md:w-64 sm:w-60 xs:w-56">
                  <div className="flex items-center">
                    <label
                      htmlFor="openingTime"
                      className="mr-2 text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                    >
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
                      className="outline-none text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className="w-80 h-12 lg:h-12 md:h-10 sm:h-10 xs:h-10 flex justify-between items-center rounded-sm border border-gray-300 mb-4 p-1lg:w-80 md:w-64 sm:w-60 xs:w-56">
                  <div className="flex items-center">
                    <label
                      htmlFor="closingTime"
                      className="mr-2 text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                    >
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
                      className="outline-none text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className="w-80 h-12 lg:h-12 md:h-10 sm:h-10 xs:h-10 mt-5 flex justify-between items-center rounded-sm border border-gray-300 mb-4 p-1 lg:w-80 md:w-64 sm:w-60 xs:w-56">
                  <div className="flex items-center">
                    <label
                      htmlFor="restaurantStatus"
                      className="mr-2 text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                    >
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
                      className="outline-none ml-7 text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                    >
                      <option value="Closed">Closed</option>
                      <option value="Open">Open</option>
                    </select>
                  </div>
                </div>

                <div className="w-80 h-auto flex flex-col mb-4">
                  <label
                    htmlFor="restaurantImg"
                    className="mb-2 md:mb-0 text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
                  >
                    Upload Restaurant Image
                  </label>
                  <div className="w-80 lg:w-80 md:w-64 sm:w-60 xs:w-56 border border-gray-300 p-1 md:h-12 md:p-2">
                    <input
                      type="file"
                      id="restaurantImg"
                      className="outline-none text-base lg:text-base md:text-sm sm:text-sm xs:text-sm"
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
            </div>
          )}

          <div className="w-80 h-12 lg:h-12 sm:h-10 xs:h-10 flex justify-between items-center rounded-sm border border-blue-700 bg-blue-700 mt-4 lg:w-80 md:w-64 md:h-10 md:mt-2 sm:w-60 xs:w-56 xs:mt-0">
            <button
              onClick={submitHandler}
              className="bg-blue-700 w-80 h-10 text-center text-white rounded-sm"
            >
              Submit
            </button>
          </div>

          <div
            className="flex mt-2 cursor-pointer text-base lg:text-base md:text-sm sm:text-sm xs:text-xs"
            onClick={changePage}
          >
            <p>{description}</p>
            <p className="ml-1 text-red-500">{changeSection}</p>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default RestuarentLogin;
