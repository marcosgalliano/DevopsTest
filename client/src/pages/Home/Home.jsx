import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import Card from "../../components/Cards";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5);

  const fetchCountries = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3001/api/countries/all"
      );

      const countriesData = response.data.countries;
      setCountries(countriesData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries(); 
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(countries.length / countriesPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={style.homeContainer}>
      {loading ? (
        <SpinnerDotted
          height={500}
          width={500}
          radius={5}
          color="#3458CD"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <>
          <div className={style.pagination}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Back
            </button>
            <span>
              Page {currentPage} /{" "}
              {Math.ceil(countries.length / countriesPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(countries.length / countriesPerPage)
              }
            >
              Next
            </button>
          </div>

          <div className={style.cardsContainer}>
            {currentCountries.map((country, index) => (
              <Card
                key={index}
                name={country.name}
                flagUrl={country.flagUrl}
                countryCode={country.countryCode}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
