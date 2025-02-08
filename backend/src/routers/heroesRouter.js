import express from "express";
const heroesRouter = express.Router();

const heroes = [];

function initGenerator() {
  let id = 0;

  return () => {
    return ++id;
  };
}

const generateID = initGenerator();

heroesRouter.get("/", async (req, res, next) => {
  // Sort the superheroes by their humility score
  heroes.sort((a, b) => b.humility - a.humility);

  res.send(JSON.stringify(heroes));
});

heroesRouter.post("/", (req, res, next) => {
  const hero = req.body;

  // Checks for the request body fields
  if (
    !hero.hasOwnProperty("name") ||
    !hero.hasOwnProperty("superpower") ||
    !hero.hasOwnProperty("humility")
  )
    res
      .status(400)
      .send(
        "Request body misses properties (name, superpower and humility needed)."
      );

  if (typeof hero.humility !== "number")
    res.status(400).send("Wrong type for humility (must be a number).");

  if (typeof hero.name !== "string")
    res.status(400).send("Wrong type for name (must be string).");

  if (typeof hero.superpower !== "string")
    res.status(400).send("Wrong type for superpower (must be string).");

  if (hero.humility < 1 || hero.humility > 10)
    res.status(400).send("Invalid humility score (must be from 1 to 10).");

  if (hero.name.length < 1 || hero.name.length > 50)
    res.status(400).send("Name length must be between 1 and 50.");

  if (hero.superpower.length < 1 || hero.superpower.length > 50)
    res.status(400).send("Superpower length must be between 1 and 50.");

  // Generate an ID and select only the fields that matter from the request
  let heroToAdd = {
    id: generateID(),
    name: hero.name,
    superpower: hero.superpower,
    humility: hero.humility,
  };

  heroes.push(heroToAdd);
  res.status(200).send(`Added hero: ${JSON.stringify(heroToAdd)}`);
});

export default heroesRouter;
