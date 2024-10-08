# DevopsTest

# Country Info App

This is a full-stack application that provides country-related information such as flags, bordering countries, and population data. The backend is built using Node.js and Express, while the frontend is developed with React.

## Features

- List of countries with their flags.
- Fetch bordering countries for a selected country.
- Display population data for countries over time with a graphical representation.
- Fully functional pagination.

## Setup

### 1. Clone the repository

## bash
git clone https://github.com/marcosgalliano/DevopsTest.git

npm i for both cient and server folders

## 3. Environment Variables
Create a .env file in the server directory with the following variables:

PORT=
DATE_NAGER=
COUNTRIES_NOW=

## To start the backend:

cd server
npm start

## To start the frontend:

cd client
npm start

## API Endpoints
## GET `/api/countries/all: Fetches a list of all countries with flags.`
## GET `/api/countries/borders/ Fetches the bordering countries by country code.`
## GET `/api/countries/population/ Fetches population data over time for a given country.`
## GET `/api/countries/flag/ Fetches the flag for a given country by its name.`
