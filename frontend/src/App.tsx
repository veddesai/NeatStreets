import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Trashmap from "./Pages/Trashmap";
import Verification from "./Pages/Verification";
import Profile from "./Pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import MyPosts from "./Pages/MyPosts";
import Posts from "./Pages/Posts";
import { LocationProvider } from "./context/LocationContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <LocationProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/trashmap" element={<Trashmap />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<MyPosts />} />
            </Routes>
          </LocationProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
