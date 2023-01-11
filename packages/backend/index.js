require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
});

app.get("/", (request, response) => {
  response.json({ info: "Hello World!" });
});
