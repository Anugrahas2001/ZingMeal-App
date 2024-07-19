
import HomePage from './components/HomePage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import RestuarentPage from './components/RestuarentPage'
import Cart from './components/Cart'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/restuarent/:id" element={<RestuarentPage/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
