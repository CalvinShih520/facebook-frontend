import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
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
  const [user, setUser] = useState(null);
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
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<ShareLayout currentUser={currentUser} logOut={logOut} />} 
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<ShareProductLayout />}>
            <Route index element={<Products />} />
            <Route path=":productId" element={<SingleProduct />} />
          </Route>
          <Route path="postprivate" element={<PostPrivate />} />
          <Route path="login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
