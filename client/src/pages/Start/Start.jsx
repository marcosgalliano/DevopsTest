import React from "react";
import style from "./Start.module.css";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div className={style.divHome}>
      <h1>Welcome to Countries app !</h1>
      <img
        src="https://static.vecteezy.com/system/resources/previews/013/836/237/non_2x/world-map-complete-with-all-countries-free-png.png"
        alt="Logo"
      />
      <Link to="/home">
        <button>Get started</button>
      </Link>
    </div>
  );
}

export default Start;
