
import UseHomePage from './components/UserHomePage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRestuarent from './components/UserRestuarent'
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import store from './slices/store'
import Order from './components/Order'
import FoodRecepies from './components/FoodRecepies'
import RestuarentHomePage from './components/RestuarentHomePage'



function App() {
  return (
   
    <Provider store={store}>
      <Router>
      <Routes>
        <Route path='/' element={<UseHomePage/>} />
        <Route path="/restuarent/:id" element={<UserRestuarent/>} />
        <Route path="/food/:id" element={<FoodRecepies/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order" element={<Order/>} />
        {/* <Route path='/' element={<RestuarentHomePage/>}/> */}
      </Routes>
    </Router>
    </Provider>
   
  )
}

export default App
