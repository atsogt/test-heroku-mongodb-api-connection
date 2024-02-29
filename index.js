import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const database = client.db("game-store");
const games = database.collection("games");

const port = process.env.PORT;

client
  .connect()
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((error) => console.log("Not Connected to mongoDB", error));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const allGames = await games.find().toArray();
  res.json(allGames);
});

app.post("/", async (req, res) => {
  await games.insertOne({ name: "World of warcraft", favorite: true });
  res.json("Item was added");
});

app.listen(port, () => {
  console.log("Api Running");
});
