const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(require("./routes"));

const DB =
  "mongodb+srv://Siddhant:Siddhant@cluster0.s36geb7.mongodb.net/SimpleSocialMedia?retryWrites=true&w=majority";

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

mongoose
  .connect(DB)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));
