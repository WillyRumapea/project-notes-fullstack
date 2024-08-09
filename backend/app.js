const express = require("express");
const app = express();
const port = 3000;
const db = require("./conn");
const cors = require("cors");
const response = require("./response");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/notes", (req, res) => {
  const sql = `SELECT * FROM notes`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      response(200, result, "sukses mengambil data", res);
    } else {
      response(404, result, "tidak ada data ditemukan", res);
    }
  });
});

app.get("/notes/id", (req, res) => {
  const id = req.query.id;
  const sql = `SELECT * FROM notes WHERE id = ?`;
  db.query(sql, [id], (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      response(200, result, "data ditemukan berdasarkan id", res);
    } else {
      response(404, result, "tidak ada data sesuai", res);
    }
  });
});

app.post("/notes", (req, res) => {
  const { title, subject, note, tags } = req.body;

  const sql = `INSERT INTO notes (title, subject, note, tags) VALUES ('${title}','${subject}','${note}','${tags}')`;

  db.query(sql, (error, result) => {
    if (error) throw error;
    if (result.affectedRows) {
      const data = {
        affectedRows: result.affectedRows,
        insertId: result.insertId,
      };
      response(200, data, "sukses menginput data", res);
    } else {
      response(404, result, "gagal menginput data", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Berjalan di port:${port}`);
});
