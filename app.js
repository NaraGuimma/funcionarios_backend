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

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const funcionario = await getFuncionario(email, senha);
  res.send(funcionario);
  //   res.send(`${email} ${password}`);
  //   const result = await getFuncionario(email, password);
  //   if (result.length == 0) {
  //     console.log("--------> Usuário nao existe");
  //     res.sendStatus(404);
  //   } else {
  //     console.log("---------> Login feito com sucesso");
  //     res.send(`${result[0].nome} is logged in!`);
  //   }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
