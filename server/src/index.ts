import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import places from "./routes/places";
import "express-async-errors";

const port = process.env.PORT || 4200
const app: Express = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/places', places);

// Index page.
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
})


// Error handler.
app.use((err, _req, res, next) => {
  console.log(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(port, () => 
  console.log(`Server is listening on port ${port}.`)
)

// module.exports = app;
