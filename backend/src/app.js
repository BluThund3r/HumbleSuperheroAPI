import express from "express";
import heroesRouter from "./routers/heroesRouter.js";
import cors from "cors";
const app = express();

// Use CORS for browser calls
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your React app
  })
);

// Register middlewares
app.use(express.json());

// Register the router to the server
app.use("/superheroes", heroesRouter);

export default app;
