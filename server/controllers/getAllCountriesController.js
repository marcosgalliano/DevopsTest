const axios = require("axios");
require('dotenv').config();
const DATE_NAGER_URL = process.env.DATE_NAGER;
const COUNTRIES_NOW_URL = process.env.COUNTRIES_NOW;


const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get(`${DATE_NAGER_URL}/AvailableCountries`);
    const countries = response.data;

    const countriesWithFlags = await Promise.all(
      countries.map(async (country) => {
        try {
          const flagResponse = await axios.post(
            `${COUNTRIES_NOW_URL}/countries/flag/images`,
            {
              iso2: country.countryCode,
            }
          );

          return {
            name: country.name,
            countryCode: country.countryCode,
            flagUrl: flagResponse.data.data.flag || "error",
          };
        } catch (error) {
          return {
            name: country.name,
            countryCode: country.countryCode,
            flagUrl: "error",
          };
        }
      })
    );

    res.status(200).json({
      countries: countriesWithFlags,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

const getCountryBorders = async (req, res) => {
  const { countryCode } = req.params;
  try {
    const response = await axios.get(
      `${DATE_NAGER_URL}/CountryInfo/${countryCode}`
    );
    const countryInfo = response.data;
    const borderCountries = countryInfo.borders;

    const bordersWithFlags = await Promise.all(
      borderCountries.map(async (borderCountry) => {
        try {
          const flagResponse = await axios.post(
            `${COUNTRIES_NOW_URL}/countries/flag/images`,
            {
              iso2: borderCountry.countryCode,
            }
          );
          return {
            commonName: borderCountry.commonName,
            officialName: borderCountry.officialName,
            countryCode: borderCountry.countryCode,
            region: borderCountry.region,
            flagUrl: flagResponse.data.data.flag || "error",
          };
        } catch (error) {
          console.error(
            `Error fetching flag for ${borderCountry.commonName}:`,
            error
          );
          return {
            commonName: borderCountry.commonName,
            officialName: borderCountry.officialName,
            countryCode: borderCountry.countryCode,
            region: borderCountry.region,
            flagUrl: "error",
          };
        }
      })
    );

    res.status(200).json({
      country: countryInfo.commonName,
      borders: bordersWithFlags,
    });
  } catch (error) {
    console.error(`Error fetching border countries for ${countryCode}:`, error);
    res.status(500).json({ message: "Failed to fetch border countries" });
  }
};

const getCountryPopulation = async (req, res) => {
  const { countryName } = req.params;
  try {
    const response = await axios.post(
      `${COUNTRIES_NOW_URL}/countries/population`,
      {
        country: countryName,
      }
    );
    if (
      response.data &&
      response.data.data &&
      response.data.data.populationCounts
    ) {
      const populationData = response.data.data.populationCounts;

      res.status(200).json({
        country: countryName,
        population: populationData,
      });
    } else {
      res.status(404).json({ message: "Population data not found" });
    }
  } catch (error) {
    console.error(`Error fetching population data for ${countryName}:`, error);
    res.status(500).json({ message: "Failed to fetch population data" });
  }
};

const getCountryFlag = async (req, res) => {
  const { countryName } = req.params;
  try {
    const response = await axios.post(
      `${COUNTRIES_NOW_URL}/countries/flag/images`,
      {
        iso2: countryName,
      }
    );

    if (response.data && response.data.data && response.data.data.flag) {
      const flagUrl = response.data.data.flag;

      res.status(200).json({
        country: countryName,
        flagUrl: flagUrl,
      });
    } else {
      res.status(200).json({
        country: countryName,
        flagUrl: "error",
      });
    }
  } catch (error) {
    console.error(`Error fetching flag for ${countryName}:`, error);

    res.status(200).json({
      country: countryName,
      flagUrl: "error",
    });
  }
};

module.exports = {
  getAllCountries,
  getCountryBorders,
  getCountryPopulation,
  getCountryFlag,
};
