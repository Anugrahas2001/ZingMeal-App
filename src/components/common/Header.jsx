import React from "react";
import { Link } from "react-router-dom";

const Header = ({ children, cartLink,orderLink}) => {
  
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
        <div className="w-16 flex justify-between">
          {cartLink}
          <Link to={orderLink}>
            <p className="font-bold">Orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
