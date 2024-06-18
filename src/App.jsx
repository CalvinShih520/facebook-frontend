import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UpdateAbout from "./pages/UpdateAbout";
import Products from "./pages/Products";
import Error from "./pages/Error";
import ShareLayout from "./pages/ShareLayout";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import ShareProductLayout from "./pages/ShareProductLayout";
import AuthService from "./services/auth.service";
import PostPrivate from "./pages/PostPrivate";

function App() {
  
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null); // Clear the currentUser after logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShareLayout currentUser={currentUser} logOut={logOut} />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-about"
            element={
              <ProtectedRoute>
                <UpdateAbout />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <ShareProductLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Products />} />
            <Route path=":productId" element={<SingleProduct />} />
          </Route>
          <Route
            path="postprivate"
            element={
              <ProtectedRoute>
                <PostPrivate />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
