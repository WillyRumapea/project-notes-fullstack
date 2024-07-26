const express = require("express");
const app = express();
const port = 3000;
const db = require("./conn");
const response = require("./response");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/notes", (req, res) => {
  const sql = `SELECT * FROM notes_table`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    if (result > 0) {
      response(200, result, "sukses mengambil data", res);
    } else {
      response(404, result, "tidak ada data ditemukan", res);
    }
  });
});

app.get("/notes/id", (req, res) => {
  const id = req.query.id;
  const sql = `SELECT * FROM notes_table WHERE id = ?`;
  db.query(sql, [id], (error, result) => {
    if (error) throw error;
    if (result.affectedRows) {
      response(200, result, "sukses mendapatkan data berdasarkan id", res);
    } else {
      response(404, result, "tidak ada data sesuai", res);
    }
  });
});

app.post("/notes", (req, res) => {
  const { title, subject, notes, tags } = req.body;

  const sql = `INSERT INTO notes_table (title, subject, notes, tags) VALUES ('${title}','${subject}','${notes}','${tags}')`;

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
  console.log(`Example app listening on port ${port}`);
});
