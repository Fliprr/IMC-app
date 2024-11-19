const express = require("express");
const db = require("../database");
const router = express.Router();

// Rota para calcular o IMC e salvar no banco
router.post("/calculate", (req, res) => {
  const { name, weight, height } = req.body;
  if (!name || !weight || !height) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const imc = (weight / (height * height)).toFixed(2);

  db.run(
    "INSERT INTO imc_records (name, weight, height, imc) VALUES (?, ?, ?, ?)",
    [name, weight, height, imc],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, weight, height, imc });
    }
  );
});

// Rota para obter histórico
router.get("/history", (req, res) => {
  db.all("SELECT * FROM imc_records ORDER BY date DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
