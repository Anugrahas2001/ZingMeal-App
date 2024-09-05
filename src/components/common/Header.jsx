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
    <div className="w-full overflow-x-hidden">
    <div className="flex items-center justify-between h-[60px] m-4 ml-16 mr-16 lg:m-4 lg:ml-12 lg:mr-12 md:m-3 md:ml-10 md:mr-10 sm:m-2 sm:ml-8 sm:mr-8 xs:ml-1">
      <Link to="/">
        <div className="w-36 lg:w-28 md:w-24 sm:w-20">
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-lg font-bold text-black italic">ZingMeal</h1>
        </div>
      </Link>
      {children}
      <div className="flex">
        <div className="flex mt-2 lg:mt-1 md:mt-1 sm:mt-0 xs:mr-2">
          {cartLink}
          <Link to={orderLink}>
            <p className="font-bold lg:text-lg md:text-base sm:text-sm xs:text-sm">Orders</p>
          </Link>
          <p
            className="font-bold ml-5 lg:ml-4 md:ml-3 sm:ml-2 cursor-pointer lg:text-lg md:text-base sm:text-sm xs:text-sm xs:mr-1"
            onClick={LogOutHandler}
          >
            LogOut
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
