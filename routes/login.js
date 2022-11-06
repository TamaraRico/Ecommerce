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


router.get("/", function(request, response, next){
	response.send('List all Data');
});

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
        request.flash('unsuccessfull', 'Sample Data Updated');
		response.redirect('/sign_up_user');
/*         console.log(response.sendStatus(400)) 
 */       //return response.status(400).json({ errors: errors.array() });
    }else{
        console.log('Got body:', request.body);

        var name = request.body.name;
        var email = request.body.email;
        var password = request.body.password;

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
                response.send("<script>alert(\"Usuario Registrado en Rockit!!\"); window.location.href = \"../singup.html\"; </script>");
                console.log(response.sendStatus(200)) 
            }
    	});
    }
});

/* router.get("/add", function(request, response, next){
    response.render("sign_up_user", {title: 'Insert Data into MySQL', action: 'sign_up_user'});
}); */

/* const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});
 */
module.exports = router;