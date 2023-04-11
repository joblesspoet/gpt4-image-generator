const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const openAPIRoutes = require("./routes/openApiRoutes");
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/openapi", openAPIRoutes);
app.listen(port, () => console.log(`server started on port ${port}`));
