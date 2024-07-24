import React from "react";
// import Header from "./common/Header";
import TabOptions from "./TabOptions";
import Footer from "./common/Footer";
import Hotels from "./Dashboard";
import Search from "./Search";

const UseHomePage = () => {
  return (
    <div>
      <Search/>
      <TabOptions />
      <Hotels />
      <Footer />
    </div>
  );
};

export default UseHomePage;
