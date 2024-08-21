import React, { useState } from "react";
import Search from "./Search";
import RestuarentPage from "../common/RestuarentPage";

const UserRestuarent = () => {

  const [cartItemCount,setCartItemCount]=useState(0);

  const handleUpdateCount=(count)=>{
    setCartItemCount(count);
  }
  console.log(cartItemCount,"count from user")

  return (
    <div className="w-full overflow-x-hidden">
      <Search cartItemCount={cartItemCount}/>
      <RestuarentPage onUpdateCount={handleUpdateCount}/>
    </div>
  );
};

export default UserRestuarent;
