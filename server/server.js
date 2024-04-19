require('express-async-errors')
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};

app.set('views', path.join(__dirname, 'src', 'api', 'v1', 'template'));
app.set("view engine", "ejs");

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const info = req.method + " " + res.statusCode + " " + req.url;
  console.log("API HIT -------------->", info, "\n|\nv\n|\nv\n");
  if (!req.header("lang") || req.header("lang") == "") req.lang = "en";
  else req.lang = req.header("lang");
  next();
});

const { router } = require("./src/api/v1/routes");
const { errorMiddleware } = require("./src/api/v1/middlewares/errorMiddleware");
const { connectToDB } = require("./src/api/v1/utils/connectToDB");
const { APIError } = require("./src/api/v1/utils/apiError");
const { PORT } = require("./config");

app.use("/api/v1", router);

// For invalid routes
app.all("*", (req, res) => {
  throw new APIError(404, `Requested URL ${req.path} not found`);
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
