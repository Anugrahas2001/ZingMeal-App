import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { toast, Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../slices/userSlice.js";
import { createCart } from "../../slices/cartSlice.js";
import { LoadingContext } from "../common/LoaderContext.jsx";

const UserLogin = () => {
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
  const { loading, setLoading } = useContext(LoadingContext);

  const notifyFail = () => {
    toast.error("Mandatory fields required", {
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
    toast.error("Email already exists", {
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

  const addUserData = (userId, accessToken, refreshToken) => {
    dispatch(
      addUser({
        id: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, confirmPassword } = credentials;

    if (!email || !password || (title === "Sign Up" && !confirmPassword)) {
      setLoading(false);
      notifyFail();
      return;
    }

    if (title === "Sign Up" && password !== confirmPassword) {
      setLoading(false);
      notifyPassword();
      return;
    }

    try {
      let response;
      if (title === "Sign Up") {
        try {
          response = await axios.post("/user/signUp", {
            email,
            password,
            confirmPassword,
          });
          const userId = response.data.user.id;
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;

          addUserData(userId, accessToken, refreshToken);

          axios
            .post(`/user/createCart/${userId}`)
            .then((response) => {
              console.log(response, "response after creating the cart");
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          if (
            error.response &&
            error.response.data.message ===
              "User with this email is already present"
          ) {
            notifyInValidEmail();
          }
          console.log(error);
        }
      } else {
        response = await axios.post("/user/login", {
          email,
          password,
        });
        console.log(email, password, "sign in options");

        if (response.data && response.data.accessToken) {
          const userId = response.data.Data.id;
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
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
          addUserData(userId, accessToken, refreshToken);
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
      console.log(error, "error");
      if (error.response && error.response.data.message) {
        if (
          error.response.data.message ===
          "User with this email is already present"
        ) {
          notifyInValidEmail();
        } else {
          notifyFail();
        }
      } else {
        notifyFail();
      }
    } finally {
      setLoading(false);
    }
  };

  const testHandler = () => {
    dispatch(removeUser());
    navigate("/user");
  };

  const changePage = () => {
    setTitle((prevState) => (prevState === "Sign Up" ? "Sign In" : "Sign Up"));

    setDescription((prevState) =>
      prevState === "New to ZingMeal?"
        ? "Already have an account?"
        : "New to ZingMeal?"
    );

    setChangeText((prevState) =>
      prevState === "Create an account" ? "Sign In" : "Create an account"
    );
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex justify-center items-center mt-24 flex-col w-full xs:w-full h-full">
        <div className="flex flex-col border p-3 w-full lg:w-1/3 md:w-1/3 xs:w-4/5 xs:p-2">
          <div className="font-semibold text-3xl">
            <p className="flex justify-center text-xl">{title}</p>
          </div>
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col items-center justify-center "
          >
            <div className="w-full lg:w-3/4 sm:h-3/5 xs:w-full">
              <div className="h-12 flex justify-center items-center rounded-sm mt-5 border border-gray-300 p-1 xs:h-9 xs:64">
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  className="outline-none p-1 w-72 lg:w-72 sm:64 xs:w-64 xs:text-sm"
                  value={credentials.email}
                  s
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </div>
              <div className="h-12 flex justify-center items-center rounded-sm mt-5 border border-gray-300 p-1 xs:h-9">
                <input
                  type="password"
                  required
                  placeholder="Enter Password"
                  className="outline-none p-1 w-72 lg:w-72 xs:w-64 xs:text-sm"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
              {title === "Sign Up" && (
                <div className="h-12 flex justify-center items-center rounded-sm mt-5 border border-gray-400 p-1 xs:h-9">
                  <input
                    type="password"
                    required
                    placeholder="Enter Confirm Password"
                    className="outline-none p-1 w-72 lg:w-72 xs:w-64 xs:text-sm"
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
              <div className="h-12 flex justify-center items-center rounded-sm mt-5 border border-gray-400 p-1 xs:h-9 bg-blue-700">
                <button
                  type="submit"
                  className="bg-blue-700 h-10 text-center text-white cursor-pointer outline-none p-1 w-72 lg:w-72 xs:w-64 xs:h-8"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <div
              className="flex justify-center w-80 lg:justify-center lg:items-center md:justify-center mt-5 cursor-pointer xs:text-sm xs:w-60 xs:justify-start xs:mr-1"
              onClick={changePage}
            >
              <p className="text-lg mt-1 xs:text-sm">{description}</p>
              <p className="text-lg text-red-500 ml-2 mt-1 xs:text-sm xs:ml-1">
                {changeText}
              </p>
            </div>
          </div>
        </div>
        <div className="text-lg mt-1 xs:text-sm">
          Try as a{" "}
          <span
            className="text-red-500 text-bold text-lg mt-1 xs:text-sm cursor-pointer xs:text-bold"
            onClick={testHandler}
          >
            Demo User
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
