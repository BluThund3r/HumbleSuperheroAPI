/* This file contains useful functions that abstract away the API calls and return some processed responses */
import { baseURL } from "../utils/backendDetails";

export async function getHeroes() {
  const response = await fetch(`${baseURL}/superheroes`);
  const responseBody = await response.json();
  console.log("HEROES GET", response.status, responseBody);
  return responseBody;
}

export async function createHero(heroName, superpower, humility) {
  const heroToCreate = {
    name: heroName,
    superpower: superpower,
    humility: humility,
  };

  const response = await fetch(`${baseURL}/superheroes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(heroToCreate),
  });

  const responseBody =
    response.status === 201 ? response.json() : response.text();

  return {
    status: response.status,
    content: responseBody,
  };
}
