import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import places from "./routes/places.mjs";
// import sermons from "./routes/sermons.mjs";
// import tags from "./routes/tags.mjs";
// import users from "./routes/users.mjs";

const port = process.env.PORT || 4200
const app = express();

app.use(cors());
app.use(express.json());

app.use('/places', places);

// Index page.
app.get('/', (req, res) => res.send('Hello world!'))

// Error handler.
app.use((err, _req, res, next) => {
  console.log(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(port, () => 
  console.log(`Server is listening on port ${port}.`)
)

// module.exports = app;
