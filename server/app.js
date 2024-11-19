const express = require("express");
const bodyParser = require("body-parser");
const imcRoutes = require("./routes/imc");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Rotas
app.use("/api", imcRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
