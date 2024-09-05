import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { removeRestaurant } from "../../slices/restaurantSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";
import Cookies from "js-cookie";

const Header = ({ children, cartLink, orderLink, isRestaurantPage }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.id);
  const restaurantId = useSelector((store) => store.restaurant.id);
  const [show, setShow] = useState(false);
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
          dispatch(removeUser());
        })
        .catch((error) => {
          logOutFail();
        });
      navigate("/");
    } else if (isRestaurantPage && restaurantId) {
      axios
        .delete(`/restaurant/logOut/${restaurantId}`)
        .then((response) => {
          dispatch(removeRestaurant());
        })
        .catch((error) => {
          logOutFail();
        });
      navigate("/");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between h-[60px] m-4 ml-16 mr-16 lg:m-4 lg:ml-12 lg:mr-12 md:m-3 md:ml-10 md:mr-10 md:mt-1 sm:m-2 xs:m-1">
        <Link to="/">
          <div className="w-36 lg:w-28 md:w-24 sm:w-20 xs:w-16">
            <h1 className="text-3xl lg:text-3xl md:text-xl sm:text-lg xs:text-base font-bold text-black italic">
              ZingMeal
            </h1>
          </div>
        </Link>
        {children}

        <div className="hidden md:flex">
          <div className="flex items-center">
            {cartLink}
            <Link to={orderLink} className="ml-4">
              <p className="font-bold text-lg lg:text-lg md:text-base">
                Orders
              </p>
            </Link>
            <p
              className="font-bold ml-5 lg:ml-4 md:ml-3 cursor-pointer text-lg lg:text-lg md:text-base"
              onClick={LogOutHandler}
            >
              LogOut
            </p>
          </div>
        </div>

        <div className="flex md:hidden items-center">
          {cartLink}
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setShow(!show)}
            className="cursor-pointer text-black text-xl mt-1 mr-3"
          />
        </div>
      </div>

      {show && (
        <div className="block md:hidden text-center bg-gray-100 w-16 absolute right-0">
          <Link to={orderLink}>
            <p className="font-bold text-lg sm:text-base xs:text-xs cursor-pointer py-1">
              Orders
            </p>
          </Link>
          <p
            className="font-bold cursor-pointer text-lg sm:text-base xs:text-xs py-1"
            onClick={LogOutHandler}
          >
            LogOut
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
