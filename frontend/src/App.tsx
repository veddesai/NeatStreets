
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Home from './Pages/Home'


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      
    </Router>
    </>
  )
}

export default App
