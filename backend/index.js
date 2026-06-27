import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connetDB from "./utils/db.js";
dotenv.config({});
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.route.js"

const app = express();

// middleware
const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// user api
app.use("/api/v1/user", userRoute);

// company api
app.use("/api/v1/company", companyRoute);

// job api
app.use("/api/v1/job", jobRoute);

// application route
app.use("/api/v1/application", applicationRoutes);


app.listen(8000, () => {
  connetDB();
  console.log("server is running");
});
