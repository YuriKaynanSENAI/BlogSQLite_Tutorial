const express = require("express");

const PORT = 8000; // Porta TCP do servidor HTTP da aplicação

const app = express();

/*Método express.get necessita de dois parâmetros, na ARROW FUNCTION, o primeiro  são os dados de servidor (REQUISITION - 'red')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res')*/

app,
  get("/", (req, res) => {
    res.send("Helo word!");
  });

app.get("/sobre", (req, res) => {
  res.send("Página sobre");
});

pp.get("//info", (req, res) => {
  res.send("Página informação");
});

//app.listen() deve ser o último comando da aplicação(app.js)
app.listen(8080, () => {
  console.log(`servidor sendo executado na ${PORT}!`);
});
