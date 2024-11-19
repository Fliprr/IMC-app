const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./imc.db");

// Criar tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS imc_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      weight REAL NOT NULL,
      height REAL NOT NULL,
      imc REAL NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
