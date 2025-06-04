import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("./pages/LoginScreen.jsx"));
const Home = lazy(() => import("./pages/HomeScreen.jsx"));

function App() {
  const isLoggedIn = localStorage.getItem("userId");

  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;