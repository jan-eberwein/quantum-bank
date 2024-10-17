const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

// Datenbankverbindung
const db = new sqlite3.Database('./db/database.sqlite');

// Beispiel-Route, um alle Benutzer anzuzeigen
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});