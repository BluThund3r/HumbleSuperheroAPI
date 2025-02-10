# Humble Heroes API (Backend)

This is the backend side of the Humble Heroes app and it was built using `express.js`.

## About

This back-end app includes two endpoints:

- **POST /superheroes:** create a new hero entry (name, superpower and humility score from 1 through 10)
- **GET /superheroes:** return the list of heroes, sorted decreasing by humility score

## How to run the app

### Before you run it

The BE application runs on port 8080 by default. If you want to change the port, in the directory `backend` create a file called `.env` and just paste this `PORT=<desired port>`.

### Run the app

After cloning the repository, open a terminal and change the directory to `backend`. Run the command `npm install` to install all the dependencies and after that just run `npm run start` to start the app.

## Test the app

This application includes a suite of tests meant to validate the `POST /superheroes` endpoint. You can execute the tests by running the command `npm run test` in your terminal (first you have to be in the `backend` directory)
