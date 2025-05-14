const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const session = require("express-session");

const PORT = 8000;

let config = { Pagina: "", footer: "" };

const app = express();

const db = new sqlite3.Database("user.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT)"
  );
});

app.use(
  session({
    secret: "qualquersenha",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/static", express.static(__dirname + "/static"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("GET /index");

  config = {
    Pagina: "Blog da turma I2HNA - SESI Nova Odessa",
    footer: "",
  };

  res.render("pages/index", { ...config, req: req });
});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usarios ${JSON.stringify(row)}`);
    res.render("partials/usertable");
  });
});

app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  config = { Pagina: "Página de Cadastro", footer: "" };
  res.render("pages/cadastro", { ...config, req: req });
});

app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");

  !req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`ok: ${JSON.stringify(req.body)}`);

  const { username, password, email, celular, cpf, rg } = req.body;

  const query =
    "SELECT * FROM users WHERE email=? OR cpf=? OR rg=? OR username=?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;
    console.log(`${JSON.stringify(row)}`);
    if (row) {
      res.send("Usuário já cadastrado, refaça o cadastro");
    } else {
      const insertQuery =
        "INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(
        insertQuery,
        [username, password, email, celular, cpf, rg],
        (err) => {
          if (err) throw err;
          res.send("Usuário cadastrado, com sucesso");
        }
      );
    }
  });
});

app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  config = { Pagina: "Sobre nosso Site", footer: "" };
  res.render("pages/sobre", { ...config, req: req });
});

app.get("/login", (req, res) => {
  console.log("GET /login");
  config = { Pagina: "Página de Login", footer: "" };
  res.render("pages/login", { ...config, req: req });
});

app.post("/login", (req, res) => {
  console.log("POST /login");
  const { username, password } = req.body;

  console.log(username, password);

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(query, [username, password], (err, row) => {
    if (err) throw err;

    if (row) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect("/dashboard");
    } else {
      res.send("Usuário Inválido");
    }
  });
});

app.get("/dashboard", (req, res) => {
  console.log("GET /dashboard");
  config = { Pagina: "Dashboard", footer: "" };
  res.render("pages/dashboard", { ...config, req: req });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
