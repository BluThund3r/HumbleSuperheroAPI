import express from "express";
const heroesRouter = express.Router();

// The array that would store the superheroes in-memory
const heroes = [];

// Function that initiates a number sequence; useful for id generation
function initGenerator() {
  let id = 0;

  return () => {
    return ++id;
  };
}

// Creates the id generator
const generateID = initGenerator();

// Function that finds the right insertion index, so that array remains sorted, based on cmp
function findInsertPosition(array, obj, cmp) {
  let start = 0,
    end = array.length;

  while (start < end) {
    let mid = Math.floor(start + (end - start) / 2);
    let compare = cmp(obj, array[mid]);

    if (compare < 0) end = mid;
    else start = mid + 1;
  }

  return start;
}

// Function that inserts object in sorted array, based on cmp
function insertSorted(array, obj, cmp) {
  let index = 0;
  if (array.length > 0) index = findInsertPosition(array, obj, cmp);
  array.splice(index, 0, obj);
}

heroesRouter.get("/", async (req, res, next) => {
  // The superhero list is already sorted
  console.log("GET HEROES: ", heroes);
  res.send(JSON.stringify(heroes));
});

heroesRouter.post("/", (req, res, next) => {
  const hero = req.body;

  console.log("POST", hero);

  // Checks for the request body fields
  if (
    !hero.hasOwnProperty("name") ||
    !hero.hasOwnProperty("superpower") ||
    !hero.hasOwnProperty("humility")
  ) {
    res
      .status(400)
      .send(
        "Request body misses properties (name, superpower and humility needed)."
      );
    return;
  }

  // Checks the right data types
  if (typeof hero.humility !== "number") {
    res.status(400).send("Wrong type for humility (must be a number).");
    return;
  }

  if (typeof hero.name !== "string") {
    res.status(400).send("Wrong type for name (must be string).");
    return;
  }

  if (typeof hero.superpower !== "string") {
    res.status(400).send("Wrong type for superpower (must be string).");
    return;
  }

  // Data value validation
  if (hero.humility < 1 || hero.humility > 10) {
    res.status(400).send("Invalid humility score (must be from 1 to 10).");
    return;
  }

  if (hero.name.length < 1 || hero.name.length > 50) {
    res.status(400).send("Name length must be between 1 and 50.");
    return;
  }

  if (hero.superpower.length < 1 || hero.superpower.length > 50) {
    res.status(400).send("Superpower length must be between 1 and 50.");
    return;
  }

  // Generate an ID and select only the fields that matter from the request
  let heroToAdd = {
    id: generateID(),
    name: hero.name,
    superpower: hero.superpower,
    humility: hero.humility,
  };

  // Insert the hero at the right index, so the array remains sorted
  insertSorted(
    heroes,
    heroToAdd,
    (obj2, obj1) => obj1.humility - obj2.humility
  );

  console.log("HEROES: ", heroes);
  res.status(201).send(JSON.stringify(heroToAdd));
});

export default heroesRouter;
