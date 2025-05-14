// Importa o módulo Express para criar o servidor
const express = require("express");

// Importa o módulo sqlite3 para manipular um banco de dados SQLite
const sqlite3 = require("sqlite3");

// Importa o body-parser para interpretar os dados enviados via formulário
const bodyParser = require("body-parser");

// Importa o módulo de sessão para armazenar dados da sessão do usuário
const session = require("express-session");

// Define a porta em que o servidor irá rodar
const PORT = 8000;

// Objeto de configuração usado para renderizar as páginas
let config = { Pagina: "", footer: "" };

// Inicializa a aplicação Express
const app = express();

// Cria/abre o banco de dados SQLite chamado "user.db"
const db = new sqlite3.Database("user.db");

// Cria a tabela "users" no banco de dados, se ainda não existir
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT)"
  );
});

// Configura o middleware de sessão
app.use(
  session({
    secret: "qualquersenha", // Chave secreta usada para assinar a sessão
    resave: true, // Salva a sessão mesmo que nada tenha mudado
    saveUninitialized: true, // Salva sessões não inicializadas
  })
);

// Define a pasta "static" como pública para servir arquivos estáticos (CSS, imagens, JS, etc.)
app.use("/static", express.static(__dirname + "/static"));

// Configura o body-parser para interpretar dados de formulário (urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Define a engine de templates como EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Rota principal (index)
app.get("/", (req, res) => {
  console.log("GET /index");

  // Define título e rodapé da página
  config = {
    Pagina: "Blog da turma I2HNA - SESI Nova Odessa",
    footer: "",
  };

  // Renderiza a página index (EJS), passando config e a requisição
  res.render("pages/index", { ...config, req: req });
});

// Rota para visualizar usuários cadastrados (ainda incompleta - renderização sem dados)
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    // Renderiza uma partial da tabela de usuários (mas não passa os dados)
    res.render("partials/usertable");
  });
});

// Rota GET do formulário de cadastro
app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  config = { Pagina: "Página de Cadastro", footer: "" };
  res.render("pages/cadastro", { ...config, req: req });
});

// Rota POST para processar dados de cadastro
app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");

  // Verifica se os dados foram enviados corretamente
  !req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`ok: ${JSON.stringify(req.body)}`);

  // Extrai os dados do formulário
  const { username, password, email, celular, cpf, rg } = req.body;

  // Verifica se o usuário já existe com base em email, CPF, RG ou username
  const query =
    "SELECT * FROM users WHERE email=? OR cpf=? OR rg=? OR username=?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;
    console.log(`${JSON.stringify(row)}`);

    if (row) {
      // Usuário já existe
      res.send("Usuário já cadastrado, refaça o cadastro");
    } else {
      // Insere novo usuário no banco
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

// Rota para a página "Sobre"
app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  config = { Pagina: "Sobre nosso Site", footer: "" };
  res.render("pages/sobre", { ...config, req: req });
});

// Rota GET da página de login
app.get("/login", (req, res) => {
  console.log("GET /login");
  config = { Pagina: "Página de Login", footer: "" };
  res.render("pages/login", { ...config, req: req });
});

// Rota POST para processar o login do usuário
app.post("/login", (req, res) => {
  console.log("POST /login");

  // Captura os dados do formulário
  const { username, password } = req.body;
  console.log(username, password);

  // Verifica se existe usuário com o username e senha informados
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(query, [username, password], (err, row) => {
    if (err) throw err;

    if (row) {
      // Usuário autenticado, cria sessão
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect("/dashboard");
    } else {
      // Dados inválidos
      res.send("Usuário Inválido");
    }
  });
});

// Rota do painel do usuário (Dashboard)
app.get("/dashboard", (req, res) => {
  console.log("GET /dashboard");
  config = { Pagina: "Dashboard", footer: "" };
  res.render("pages/dashboard", { ...config, req: req });
});

// Rota para logout do usuário
app.get("/logout", (req, res) => {
  // Destroi a sessão e redireciona para a página inicial
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Inicia o servidor na porta definida
// Essa deve ser a última linha do arquivo app.js
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
