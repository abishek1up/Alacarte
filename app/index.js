require("dotenv").config();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const app = express();

const customerRoutes = require("./routes/customer.route");
const userRoutes = require("./routes/user.route");
const orderRoutes = require("./routes/order.route");
const restaurantRoutes = require("./routes/restaurant.route");

const { errorHandler } = require("./middleware/errorHandler.middleware");
const reviewRoutes = require("./routes/review.route");

// Swagger definition
const swaggerDefinition = {
  info: {
    title: "Customer Management Services",
    version: "1.0.0",
    description: "Customer Management Services"
  },
  host: "localhost:" + process.env.PORT,
  basePath: "/"
};

const options = {
  swaggerDefinition,
  apis: ["./swagger-docs/**/*.yaml"]
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

app.use("/api/v1/users", jsonParser, userRoutes);
app.use("/api/v1/customers", jsonParser, customerRoutes);
app.use("/api/v1/orders", jsonParser, orderRoutes);
app.use("/api/v1/restaurants", jsonParser, restaurantRoutes);
app.use("/api/v1/reviews", jsonParser, reviewRoutes);

app.use(errorHandler);

app.get("/health", (req, res) => {
  res.send("OK");
});

module.exports = app;
