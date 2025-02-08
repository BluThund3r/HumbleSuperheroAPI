import app from "./app.js";
const PORT = 8080;

// Set the port that the server listens to
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
