import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

// Use the port specified by the user if present, otherwise 8080
const PORT = process.env.PORT || 8080;

// Set the port that the server listens to
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
