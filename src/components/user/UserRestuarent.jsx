import React from "react";
import Search from "./Search";
import RestuarentPage from "../common/RestuarentPage";

const UserRestuarent = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Search />
      <RestuarentPage />
    </div>
  );
};

export default UserRestuarent;
