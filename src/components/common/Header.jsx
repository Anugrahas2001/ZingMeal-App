import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { removeRestaurant } from "../../slices/restaurantSlice";
import axios from "../../axios/axios";
import Cookies from "js-cookie";

const Header = ({ children, cartLink, orderLink, isRestaurantPage }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.id);
  const restaurantId = useSelector((store) => store.restaurant.id);
  const navigate = useNavigate();

  const logOutFail = () => {
    toast.error("Failed to logOut", {
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

  const LogOutHandler = () => {
    console.log("log out action");
    const accessToken = Cookies.get("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (userId) {
      axios
        .delete(`/user/logout/${userId}`, config)
        .then((response) => {
          console.log(response);
          dispatch(removeUser());
        })
        .catch((error) => {
          console.log(error);
          logOutFail();
        });
      navigate("/");
    } else {
      if (isRestaurantPage && restaurantId) {
        console.log(isRestaurantPage, restaurantId, "detailsss");
        axios
          .delete(`/restaurant/logOut/${restaurantId}`)
          .then((response) => {
            console.log(response);
            dispatch(removeRestaurant());
          })
          .catch((error) => {
            console.log(error);
            logOutFail();
          });

        navigate("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-between h-[60px] m-4 ml-16 mr-16">
      <Link to="/">
        <div className="w-36">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="app-logo"
            className="w-36 object-cover"
          />
        </div>
      </Link>
      {children}
      <div className="flex">
        <div className="flex mt-2 right-28">
          {cartLink}
          <Link to={orderLink}>
            <p className="font-bold">Orders</p>
          </Link>
          <p className="font-bold ml-5 cursor-pointer" onClick={LogOutHandler}>
            LogOut
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
