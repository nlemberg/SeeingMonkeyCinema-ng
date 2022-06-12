const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { populateMoviesDB, populateMembersDB } = require("./utils/populateDBs");

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
populateMembersDB();

app.use("/movies", require("./routes/movieController"));
app.use("/members", require("./routes/memberController"));
app.use("/subscriptions", require("./routes/subscriptionController"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
