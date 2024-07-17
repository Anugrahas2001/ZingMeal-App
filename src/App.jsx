
import HomePage from './components/HomePage'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import RestuarentPage from './components/RestuarentPage'


function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/restuarent" element={<RestuarentPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
