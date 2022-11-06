var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'rockit',
    user: 'root',
    password: '123proyecto!WEB'
});

conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log('CONEXION A MYSQL EXITOSA');
    }
});

module.exports = conexion;
