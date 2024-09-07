import React from "react";
import TabOptions from "./TabOptions";
import Footer from "../common/Footer";
import Hotels from "./Dashboard";
import Search from "./Search";

const UseHomePage = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <Search />
      <TabOptions />
      <Hotels />
      <Footer />
    </div>
  );
};

export default UseHomePage;
