// Calling all the dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./SRC/DB/connectDB.js";
import salesRoutes from "./SRC/Routes/salesRoutes.js";
import authRoute from "./SRC/Routes/authRoute.js";
import userRoute from "./SRC/Routes/userRoute.js"
import generateToken from "./SRC/utils/generateTokenandsetCookies.js";

// import globalErr from "./SRC/controller/errorController.js"

// initializing the dotenv method
dotenv.config();

// Assigning the express method to a variable
const app = express();

// Using the express functions
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

// Global Error Handler
// app.use(globalErr)
// Creating the start server method
const startServer = async () => {
  // Calling the port from the env file
  const PORT = process.env.PORT || 2345;
  connectDB();
  try {
    app.listen(PORT, () => {
      console.log(`FROG-APP IS RUNNING ON PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});
