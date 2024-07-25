
import UseHomePage from './components/UserHomePage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRestuarent from './components/UserRestuarent'
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import store from './slices/store'
import Order from './components/Order'
import FoodRecepies from './components/FoodRecepies'
import RestuarentHomePage from './components/RestuarentHomePage'
import FoodMenu from './components/FoodMenu'



function App() {
  return (
   
    <Provider store={store}>
      <Router>
      <Routes>
         <Route path='/' element={<RestuarentHomePage/>}/>
         <Route path='/add' element={<FoodMenu/>}/>
        <Route path='/user' element={<UseHomePage/>} />
        <Route path="/restuarent/:id" element={<UserRestuarent/>} />
        <Route path="/food/:id" element={<FoodRecepies/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order" element={<Order/>} />
       
      </Routes>
    </Router>
    </Provider>
   
  )
}

export default App
