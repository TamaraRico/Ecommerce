const express = require('express');
const router = express.Router();
var database = require('../db/mysqlConnection');
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json()


router.get("/sign_up_user", function(request, response, next){
	// response.send('List all Data');
  response.sendFile(__dirname + '/signup.html');
});

/*
router.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});*/

router.post("/sign_up_user", 
    body('name').notEmpty(), 
    body('email').isEmail(), 
    body('password').isLength({min:8}), 
    jsonParser, async function(request, response, next){
	
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        /*  response.send("<p>Need numerical values.</p>"); */
        /*  response.send(`password: incorrect password`);  */
        /*  response.send("<script>alert(\"your alert message\"); window.location.href = \"../singup.html\"; </script>");*/
        /*  response.render("signup", { title: 'Error', message: 'hola' }); */      
        /*  request.flash('message', errors[0]);
		        response.redirect('/sign_up_user'); */
        console.log('erros:', errors);
        /*  console.log(response.sendStatus(400)) */       
        /*  return response.status(400).json({ errors: errors.array() });   */
    }else{
        console.log('Got body:', request.body);

        var name = request.body.name;
        var email = request.body.email;
        var password = request.body.password;

        if (username && password) {
          //pool.query('SELECT players.*, count(history.userId) AS gamesPlayed FROM players LEFT JOIN history ON history.userId=players.id WHERE email_address = ?',[email], async function (error, results, fields) {      

          pool.query('SELECT * FROM usuarios WHERE nombre = ? AND password = ?', [name, password], async function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              const comparison = await bcrypt.compare(password, results[0].password)          
              if(comparison){
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
              }
            } else {
              response.send('Incorrect Username and/or Password!');
            }			
            response.end();
        })} else{
          const encryptedPassword = await bcrypt.hash(password, saltRounds)

          var query = `
          INSERT INTO usuarios 
          (nombre, correo, password) 
          VALUES ("${name}", "${email}", "${encryptedPassword}")
          `;

          database.query(query, function(error, data){
            if(error){
                throw error;
            }else{
                console.log(response.sendStatus(200)) 
            }
    	});
    }
}});

module.exports = router;