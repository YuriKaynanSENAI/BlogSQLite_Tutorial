const express = require("express");

const PORT = 8000; // Porta TCP do servidor HTTP da aplicação

const app = express();

//app.listen() deve ser o último comando da aplicação(app.js)
app.listen(8080, () => {
  console.log(`servidor sendo executado na ${PORT}!`);
});
