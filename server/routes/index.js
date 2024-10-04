const { Router } = require("express");
const router = Router();
const {
  getAllCountries,
  getCountryBorders,
  getCountryPopulation,
  getCountryFlag,
} = require("../controllers/getAllCountriesController");

router.get("/all", getAllCountries);

router.get("/borders/:countryCode", getCountryBorders);

router.get("/population/:countryName", getCountryPopulation);

router.get("/flag/:countryName", getCountryFlag);

module.exports = router;
