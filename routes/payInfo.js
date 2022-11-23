const express = require('express');
const router = express.Router();
var database = require('../db/mysqlConnection');
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const path = require('path');
const err = require('./errores')

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json()

router.get("/payment", function(request, response, next){
    response.sendFile(__dirname + '/login.html');
});

router.post("/payment", 
    body('cardholderName').notEmpty().withMessage("El nombre no puede estar vacio"), 
    body('cardNumber').isLength({min:16}).withMessage("El numero de tarjeta es invalido"), 
    body('expirationMM').isLength({min:2}),
    body('expirationYYYY').isLength({min:4}), 
    body('cvv').isLength({min:3}),
    jsonParser, async function(request, response, next){
	
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log('errs:', errors);
        return response.send(err({errors}))
    }else{
        console.log('Got body:', request.body);

        var cardholderName = request.body.cardholderName;
        var cardNumber = request.body.cardNumber;
        var expirationMM = request.body.expirationMM;
        var expirationYYYY = request.body.expirationYYYY;
        var cvv = request.body.cvv;

        var query = `
        INSERT INTO informaciondepago 
        (cardholderName, creditCardNumber, monthOfExpiration, yearOfExpiration, creditCardCvv) 
        VALUES ("${cardholderName}", "${cardNumber}", "${expirationMM}", "${expirationYYYY}", "${cvv}")
        `;

        database.query(query, function(error, data){
            if(error){
                console.log('erros:', error);
                throw error;
            }else{
                response.writeHead(301, {'Location' : `http://localhost:4000/index.html`}).end(); //Con esta linea se redirecciona 
            }
    	});
    }
});

module.exports = router;