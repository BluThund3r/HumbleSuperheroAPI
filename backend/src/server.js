import express from "express";
import heroesRouter from "./routers/heroesRouter.js";
const app = express();
const PORT = 8080;

// Register middlewares
app.use(express.json());

// Register the router to the server
app.use("/superheroes", heroesRouter);

// Set the port that the server listens to
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
