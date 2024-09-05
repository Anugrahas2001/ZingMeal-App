import React, { useState } from "react";
import UserLogin from "../user/UserLogin";
import RestaurantLogin from "../restaurant/RestuarentLogin";

const TabView = () => {
  const [activeTab, setActiveTab] = useState("user");
  return (
    <div className="w-full">
      <div className="w-full bg-gray-400 h-16">
        <div className="flex">
          <button
            className={`w-1/2 h-16 bg-gray-200 text-xl font-semibold lg:text-xl md:text-lg sm:text-sm xs:text-sm ${
              activeTab === "user" ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("user");
            }}
          >
            Sign in as User
          </button>
          <button
            className={`w-1/2 h-16 bg-gray-200 text-xl font-semibold lg:text-xl md:text-lg sm:text-sm xs:text-sm ${
              activeTab === "restaurant"
                ? "bg-red-400 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("restaurant");
            }}
          >
            Sign in as Restaurant
          </button>
        </div>
        {activeTab === "user" && <UserLogin />}
        {activeTab === "restaurant" && <RestaurantLogin />}
      </div>
    </div>
  );
};

export default TabView;