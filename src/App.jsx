import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./slices/store";
import LoaderContext from "./components/common/LoaderContext";
import CountContext from "./components/common/CountContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabView from "./components/common/TabView";
import RestuarentPage from "./components/common/RestuarentPage";
import FoodMenu from "./components/restaurant/FoodMenu";
import EditRestaurantMenu from "./components/restaurant/EditRestaurantMenu";
import UserHomePage from "./components/user/UserHomePage";
import EditFoodMenu from "./components/restaurant/EditFoodMenu";
import UserRestuarent from "./components/user/UserRestuarent";
import Cart from "./components/user/Cart";
import RestaurantOrder from "./components/restaurant/RestaurantOrder";
import UserOrder from "./components/user/UserOrder";
import RestuarentHomePage from "./components/restaurant/RestuarentHomePage";

// import Loader from "./components/common/Loader";
// const UseHomePage = React.lazy(() => import("./components/user/UserHomePage"));
// const UserRestuarent = React.lazy(() =>
//   import("./components/user/UserRestuarent")
// );
// const Cart = React.lazy(() => import("./components/user/Cart"));
// const FoodMenu = React.lazy(() => import("./components/restaurant/FoodMenu"));
// const EditFoodMenu = React.lazy(() =>
//   import("./components/restaurant/EditFoodMenu")
// );
// const RestuarentPage = React.lazy(() =>
//   import("./components/restaurant/RestuarentHomePage")
// );
// const UserOrder = React.lazy(() => import("./components/user/UserOrder"));
// const RestaurantOrder = React.lazy(() =>
//   import("./components/restaurant/RestaurantOrder")
// );
// const EditRestaurantMenu = React.lazy(() =>
//   import("./components/restaurant/EditRestaurantMenu")
// );
// const TabView = React.lazy(() => import("./components/common/TabView"));
// import incerceptor from './components/common/interceptor';

function App() {
  return (
    <Provider store={store}>
      <LoaderContext>
        <CountContext>
          <Router>
            {/* <Suspense fallback={<div><Loader/></div>}> */}
            <Routes>
              <Route path="/" element={<TabView />} />
              <Route path="/restaurant" element={<RestuarentPage />} />
              <Route path="/add" element={<FoodMenu />} />
              <Route path="/editRestaurant" element={<EditRestaurantMenu />} />
              <Route path="/editFood/:id" element={<EditFoodMenu />} />
              <Route path="/user" element={<UserHomePage />} />
              <Route path="/restuarent/:id" element={<UserRestuarent />} />
              <Route path="/restuarentHome" element={<RestuarentHomePage/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/userOrder" element={<UserOrder />} />
              <Route path="/restaurantOrder" element={<RestaurantOrder />} />
            </Routes>
            {/* </Suspense> */}
            <ToastContainer />
          </Router>
        </CountContext>
      </LoaderContext>
    </Provider>
  );
}

export default App;