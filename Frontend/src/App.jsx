import React from "react";
import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from "./pages/Home";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";

const App = () => {
  return (
    <Routes>
      {/* Start */}
      <Route path="/" element={<Start />} />

      {/* Captain */}
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-logout" element={<CaptainLogout />} />

      {/* User */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/logout" element={<UserLogout />} />

      {/* Home */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
