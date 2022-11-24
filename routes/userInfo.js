const express = require('express');
const router = express.Router();
var database = require('../db/mysqlConnection');
var bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json()

router.post("/userInformation", function(request, response, next){
    var query = `SELECT * FROM usuarios WHERE sesion = true LIMIT 1`;
    database.query(query, function(error, data){
		if(error){
			response.send({"status":"ERROR"}); 
		}else{
            var user=data[0];
            var requestResponse={"status":"OK","nombre":(user.nombre), "email": (user.correo), "password": (user.password)}
            console.log(requestResponse);
			response.send(requestResponse);
		}
	});
});

router.post("/cerrarSesion", jsonParser, async function(request, response, next){
    var query = `UPDATE usuarios SET sesion = false WHERE sesion = true LIMIT 1`;
    database.query(query, function(error, data){
		if(error){
			response.send({"status":"ERROR"}); 
		}else{
			//response.send({"status":"OK"});
            response.writeHead(301, {'Location' : `http://localhost:4000/index.html`}).end(); //Con esta linea se redirecciona
		}
	});
});

router.post("/updateUserInformation", 
    jsonParser, async function(request, response, next){
	
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log('errs:', request);
        response.send({"status":"ERROR", "req":(body), "err":(errors)});
    }else{
        console.log('Got body:', request.body);

        var name = request.body.nombre;
        var email = request.body.correo;
        var password = request.body.password;

        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        var query = `UPDATE usuarios 
        SET nombre = "${name}", password = "${encryptedPassword}" WHERE correo = "${email}"`;

        database.query(query, function(error, data){
            if(error){
                console.log('errors:', error);
                response.send({"status":"ERROR"});
            }else{
                response.send({"status":"OK"});
            }
    	});
    }
});

module.exports = router;