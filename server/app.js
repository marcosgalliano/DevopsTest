const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const cors = require('cors');
require('dotenv').config();
const app = express();


app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use("/api/countries", router);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
