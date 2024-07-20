
import HomePage from './components/HomePage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import RestuarentPage from './components/RestuarentPage'
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import store from './slices/store'



function App() {
  return (
   
    <Provider store={store}>
      <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/restuarent/:id" element={<RestuarentPage/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
    </Provider>
   
  )
}

export default App
