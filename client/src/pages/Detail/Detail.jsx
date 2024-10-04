import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./Detail.module.css";
import Card from "../../components/Cards";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SpinnerDotted } from "spinners-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Detail = () => {
  const location = useLocation();
  const { name, flagUrl, countryCode } = location.state || {};

  const [borderCountries, setBorderCountries] = useState([]);
  const [loadingBorders, setLoadingBorders] = useState(true);
  const [loadingPopulation, setLoadingPopulation] = useState(true);
  const [populationData, setPopulationData] = useState(null);

  const fetchBorderCountries = async (countryCode) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/countries/borders/${countryCode}`
      );
      setBorderCountries(response.data.borders);
      setLoadingBorders(false);
    } catch (error) {
      console.error("Error fetching border countries:", error);
      setLoadingBorders(false);
    }
  };

  const fetchPopulationData = async (countryName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/countries/population/${countryName}`
      );
      setPopulationData(response.data.population);
      setLoadingPopulation(false);
    } catch (error) {
      console.error("Error fetching population data:", error);
      setLoadingPopulation(false);
    }
  };

  useEffect(() => {
    if (countryCode) {
      setLoadingBorders(true);
      setLoadingPopulation(true);
      setBorderCountries([]);
      setPopulationData(null);

      fetchBorderCountries(countryCode);
      fetchPopulationData(name);
    }
  }, [countryCode, name]);

  const populationChartData = populationData
    ? {
        labels: populationData.map((entry) => entry.year),
        datasets: [
          {
            label: `Population of ${name}`,
            data: populationData.map((entry) => entry.value),
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      }
    : null;

  return (
    <div className={style.divDetail}>
      <img src={flagUrl} alt={`Flag of ${name}`} className={style.flagDetail} />
      <div className={style.divInfo}>
        <h2>
          {name} ({countryCode})
        </h2>

        <div className={style.moreInfoDiv}>
          <div className={style.populationDiv}>
            <h4>Population Chart</h4>
            {loadingPopulation ? (
              <SpinnerDotted color="#3458CD" />
            ) : (
              <Line
                data={populationChartData}
                options={{ responsive: true }}
                height={400}
                width={500}
              />
            )}
          </div>
          <div className={style.borderCountriesDiv}>
            <h4>Bordering Countries</h4>
            {loadingBorders ? (
              <SpinnerDotted color="#3458CD" />
            ) : (
              <div className={style.borderCards}>
                {borderCountries.length > 0 ? (
                  borderCountries.map((borderCountry) => (
                    <Card
                      key={borderCountry.countryCode}
                      name={borderCountry.commonName}
                      flagUrl={borderCountry.flagUrl}
                      countryCode={borderCountry.countryCode}
                      path="detail"
                    />
                  ))
                ) : (
                  <p>No bordering countries found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
