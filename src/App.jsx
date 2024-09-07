import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./slices/store";
import LoaderContext from "./components/common/LoaderContext";
import CountContext from "./components/common/CountContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UseHomePage = React.lazy(() => import("./components/user/UserHomePage"));
const UserRestuarent = React.lazy(() =>
  import("./components/user/UserRestuarent")
);
const Cart = React.lazy(() => import("./components/user/Cart"));
const FoodRecepies = React.lazy(() => import("./components/user/FoodRecepies"));
const FoodMenu = React.lazy(() => import("./components/restaurant/FoodMenu"));
const EditFoodMenu = React.lazy(() =>
  import("./components/restaurant/EditFoodMenu")
);
const RestuarentPage = React.lazy(() =>
  import("./components/restaurant/RestuarentHomePage")
);
const UserOrder = React.lazy(() => import("./components/user/UserOrder"));
const RestaurantOrder = React.lazy(() =>
  import("./components/restaurant/RestaurantOrder")
);
const EditRestaurantMenu = React.lazy(() =>
  import("./components/restaurant/EditRestaurantMenu")
);
const TabView = React.lazy(() => import("./components/common/TabView"));
// import incerceptor from './components/common/interceptor';

function App() {
  return (
    <Provider store={store}>
      <LoaderContext>
        <CountContext>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<TabView />} />
                <Route path="/restaurant" element={<RestuarentPage />} />
                <Route path="/add" element={<FoodMenu />} />
                <Route
                  path="/editRestaurant"
                  element={<EditRestaurantMenu />}
                />
                <Route path="/editFood/:id" element={<EditFoodMenu />} />
                <Route path="/user" element={<UseHomePage />} />
                <Route path="/restuarent/:id" element={<UserRestuarent />} />
                <Route path="/food/:id" element={<FoodRecepies />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/userOrder" element={<UserOrder />} />
                <Route path="/restaurantOrder" element={<RestaurantOrder />} />
              </Routes>
            </Suspense>
            <ToastContainer />
          </Router>
        </CountContext>
      </LoaderContext>
    </Provider>
  );
}

export default App;
