require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const bookingRoutes = require("./src/routes/bookings.route");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});

app.use("/bookings", bookingRoutes);
