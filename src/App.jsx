import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Error from "./pages/Error";
import ShareLayout from "./pages/ShareLayout";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import ShareProductLayout from "./pages/ShareProductLayout";

function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShareLayout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<ShareProductLayout />}>
            <Route index element={<Products />} />
            <Route path=":productId" element={<SingleProduct />} />
          </Route>
          <Route path="login" element={<Login setUser={setUser}></Login>} />
          <Route path="dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard user={user}></Dashboard>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
