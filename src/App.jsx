import UseHomePage from "./components/user/UserHomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRestuarent from "./components/user/UserRestuarent";
import Cart from "./components/user/Cart";
import { Provider } from "react-redux";
import store from "./slices/store";
import FoodRecepies from "./components/user/FoodRecepies";
import FoodMenu from "./components/restaurant/FoodMenu";
import EditFoodMenu from "./components/restaurant/EditFoodMenu";
import RestuarentPage from "./components/restaurant/RestuarentHomePage";
import UserOrder from "./components/user/UserOrder";
import RestaurantOrder from "./components/restaurant/RestaurantOrder";
import TabView from "./components/common/TabView";
import EditRestaurantMenu from "./components/restaurant/EditRestaurantMenu";
import LoaderContext from "./components/common/LoaderContext";
// import RestuarentHomePage from "./components/restaurant/RestuarentHomePage";
// import incerceptor from './components/common/interceptor'

function App() {
  return (
    <Provider store={store}>
      <LoaderContext>
        <Router>
          <Routes>
            <Route path="/" element={<TabView />} />
            <Route path="/restaurant" element={<RestuarentPage />} />
            <Route path="/add" element={<FoodMenu />} />
            <Route path="/editRestaurant" element={<EditRestaurantMenu />} />
            <Route path="/editFood/:id" element={<EditFoodMenu />} />
            <Route path="/user" element={<UseHomePage />} />
            <Route path="/restuarent/:id" element={<UserRestuarent />} />
            <Route path="/food/:id" element={<FoodRecepies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/userOrder" element={<UserOrder />} />
            <Route path="/restaurantOrder" element={<RestaurantOrder />} />
          </Routes>
        </Router>
      </LoaderContext>
    </Provider>
  );
}

export default App;
