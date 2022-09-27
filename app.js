import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { getFuncionarios, getFuncionario } from "./dbServer.js";

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/funcionarios", async (req, res) => {
  const funcionarios = await getFuncionarios();
  res.send(funcionarios);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
