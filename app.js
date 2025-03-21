const express = require("express"); // Importa lib do Express
const sqlite3 = require("sqlite3"); // Importa lib do sqlite3

const PORT = 8000; // Porta TCP do servidor HTTP da aplicação

const app = express(); // Instância para uso do Express

const db = new sqlite3.Database("user.db"); // Instância para uso do Sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  // Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
});

app.use("/statc", express.static(__dirname + "/statc"));
// Cria conexão com o banco de dados

const index =
  "<a href='/home'> Home</a><a href='/sobre'> Sobre</a><a href='/login'> Login</a><a href='/cadastro'> Cadastro</a><a href='/info'> Info</a>";
const home = 'Vc está na página "Home"<br><a href="/">Voltar</a>';
const sobre = 'Vc está na página "Sobre"<br><a href="/">Voltar</a>';
const login = 'Vc está na página "Login"<br><a href="/">Voltar</a>';
const cadastro = 'Vc está na página "Cadastro"<br><a href="/">Voltar</a>';
const info = 'Vc está na página "Info"<br><a href="/">Voltar</a>';

/* Método express.get necessita de dois parâmetros
// Na ARROW FUNCTION: o primeiro são os daods do servidor (REQUISITION - 'res'):
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res') */
app.get("/", (req, res) => {
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000
  res.send(index);
});

app.get("/home", (req, res) => {
  res.send(home);
});

// Programação de rotas do método GET do HTTP 'app.get()'
app.get("/sobre", (req, res) => {
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/sobre
  res.send(sobre);
});

app.get("/login", (req, res) => {
  res.send(login);
});

app.get("/cadastro", (req, res) => {
  res.send(cadastro);
});

app.get("/info", (req, res) => {
  res.send(info);
});

// app.get("/info", (req, res) => {
//   // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/info
//   res.send(info);
// });

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});

//dia 21/03/2025 atualizei os códigos usando as anotações do Ribeiro
