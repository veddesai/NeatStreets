
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Home from './Pages/Home'
import Trashmap from './Pages/Trashmap'


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/trashmap" element={<Trashmap/>} />
        </Routes>
      
    </Router>
    </>
  )
}

export default App
