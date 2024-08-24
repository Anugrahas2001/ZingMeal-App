import React from "react";
import { Link } from "react-router-dom";
import { removeUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ children, cartLink, orderLink }) => {
  const dispatch = useDispatch();

  const notifySuccess = () => {
    toast.success("Successfully Logged Out", {
      position: "top-right",
      autoClose: 4000,
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
    notifySuccess();
    dispatch(removeUser());
   
  };

  return (
    <div className="flex items-center justify-between w-full h-[60px] m-4 ">
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
      <div className="flex m-2 w-40">
        <div className="w-40 flex justify-between">
          {cartLink}
          <Link to={orderLink}>
            <p className="font-bold">Orders</p>
          </Link>
          <p className="font-bold ml-5 cursor-pointer" onClick={LogOutHandler}>
            LogOut
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
