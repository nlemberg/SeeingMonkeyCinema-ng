const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { populateMoviesDB } = require("./utils/populateDBs");

const app = express();
const port = process.env.PORT || 8000;

const db = process.env.MONGO_URI || require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

populateMoviesDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/movies", require("./routes/movieController"));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
