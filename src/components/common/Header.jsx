import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../../slices/cartSlice";

const Header = ({ children }) => {
  const count = useSelector(selectTotalQuantity);

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
          <Link to="/cart">
            <div className="flex">
              <FontAwesomeIcon
                className="margin-left w-9 mt-1"
                icon={faShoppingCart}
              />
              <div className="flex relative bottom-3 right-4">
                <p className="text-sm w-6 h-6 pl-2 rounded-full bg-red-500 text-white top-5 mb-4 flex items-center">
                  {count}
                </p>
              </div>
            </div>
          </Link>
          <Link to="/order">
            <p className="font-bold">Orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
