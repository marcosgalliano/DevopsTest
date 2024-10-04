import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Start from "./pages/Start/Start";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import NavBar from "./components/Navbar";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/detail/:code" element={<Detail />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
