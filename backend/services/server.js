const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { populateMoviesDB } = require("./utils/populateDBs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = process.env.MONGO_URI || require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

populateMoviesDB();

app.use("/movies", require("./routes/movieController"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
