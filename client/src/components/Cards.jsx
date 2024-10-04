import React from "react";
import style from "./Cards.module.css";
import { Link } from "react-router-dom";

const Card = ({ name, flagUrl, countryCode, path }) => {
  const fallbackImage =
    "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg";

  return (
    <Link
      to={{
        pathname: `/detail/${countryCode}`,
      }}
      state={{ name, flagUrl, countryCode }}
    >
      <div
        className={
          path === "detail" ? style.detailContainerDiv : style.containerCard
        }
      >
        <img
          src={flagUrl !== "error" ? flagUrl : fallbackImage}
          alt={`Flag of ${name}`}
          className={path === "detail" ? style.flagDetail : style.flag}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <h1>{name}</h1>
      </div>
    </Link>
  );
};

export default Card;
