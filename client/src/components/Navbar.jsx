import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.divContenedorNavBar}>
      <Link to="/home">
        <img
          src="https://static.vecteezy.com/system/resources/previews/013/836/237/non_2x/world-map-complete-with-all-countries-free-png.png"
          alt="logo"
        />
        <h2>CountriesApp</h2>
      </Link>
    </div>
  );
};

export default NavBar;
