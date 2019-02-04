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
  var phone = req.query.phone;

  var content = fs.readFileSync('public/data/contacts.json');
  var contacts = JSON.parse(content);

  var remainingContacts = contacts.filter(function (contact) {
    return contact.phone != phone;
  });

  content = JSON.stringify(remainingContacts, null, 2);
  fs.writeFileSync('public/data/contacts.json', content);

  // res.send('removing contact: ' + contacts[0].firstName);
  // res.json(remainingContacts);
  // res.json({succes: true});

  res.redirect('/agenda.html')

  // TO DO please redirect to agenda.html

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
  var oldPhone = req.query.phone;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  var content = fs.readFileSync('public/data/contacts.json');
  var contacts = JSON.parse(content);

  // update...
  var contact = contacts.find(function (contact) {
    return contact.phone == oldPhone;
  });

  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.phone = phone;

  content = JSON.stringify(contacts, null, 2);
  fs.writeFileSync('public/data/contacts.json', content);

  res.json({ success: true });
});


module.exports = router;