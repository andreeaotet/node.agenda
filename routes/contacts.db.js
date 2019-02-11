var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "phone_book"
});


/* GET users listing. */
router.get('/', function (req, res, next) {
  pool.getConnection(function (err, connection) { //cer conexiune
    if (err) throw err;
    connection.query('SELECT * FROM contacts', function (err, results) {
      if (err) throw err;
      console.log(results);
      res.json(results);
    })
  })
});


// /contacts/delete?phone=1234
router.get('/delete', function (req, res, next) {
  var id = req.query.id;

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    const sql = `DELETE FROM contacts where id=${id}`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      console.log(results);
      //res.json({success: true});
      res.redirect('/agenda.html');
    })
  })
});


// /contacts/create
router.post('/create', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;

    let sql = `INSERT INTO contacts (firstName, lastName, phone) VALUES ('${firstName}', '${lastName}', '${phone}')`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      console.log(results);
      res.json(results);
      res.json({ success: true });
    });
  });
});


// /contacts/update
router.post('/update', function (req, res, next) {
  var id = req.query.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  pool.getConnection(function (err, connection) {
    if (err) throw err;

    const sql = `UPDATE contacts SET firstName='${firstName}', lastName='${lastName}', phone='${phone}' WHERE id=${id}`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      console.log(results);
      res.json({ success: true });
    })
  })
});


module.exports = router;