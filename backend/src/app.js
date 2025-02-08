import express from "express";
import heroesRouter from "./routers/heroesRouter.js";
const app = express();

// Register middlewares
app.use(express.json());

// Register the router to the server
app.use("/superheroes", heroesRouter);

export default app;
