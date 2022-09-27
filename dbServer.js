import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();

export async function getFuncionarios() {
  const [rows] = await pool.query("SELECT * from funcionarios");
  return rows;
}

export async function getFuncionario(email, senha) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM funcionarios
  WHERE email = ? 
  AND senha = ?
  AND ativo = 1
  `,
    [email, senha]
  );
  return rows[0];
}

const funcionario = await getFuncionario("nara@cravoecanela.com", "12345");
console.log(funcionario);

// const funcionarios = await getFuncionarios();
// console.log(funcionarios);
