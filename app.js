/*const express = require('express');
const app = express();



app.get('/', (req, res)=>{
    res.send('HOLA MUNDO');
})

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})*/

var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'rockit',
    user: 'root',
    password: '123proyecto!WEB'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
});


//SELECT
conexion.query('SELECT * from productos', function(error, results, fields){
    if(error)
    throw error;

    results.forEach(result => {
        console.log(result);
    });
});

//INSERT
/*conexion.query('INSERT INTO productos (album, artista, descripcion, genero, cantidad, precio) VALUES ("Proof", "BTS", "Este album es una antologia que encarnara la historio de BTS", "K-pop", 10, 1860)', function(error, results){
    if(error) throw error;
    console.log('Registro Agregado', results);
});*/

//UPDATE
conexion.query('UPDATE productos SET album = "K.O.", artista = "Danna Paola", descripcion = "K.O. contiene un total de 11 tracks tanto en español como en ingles", genero = "Pop", cantidad = 7, precio = 150 WHERE idproductos=1', function(error, results){
    if(error) throw error;
    console.log('Registro Actualizado', results);
});

//ELIMINAR
/*
conexion.query('DELETE FROM productos WHERE idproductos=2', function(error, results){
    if(error) throw error;
    console.log('Registro Eliminado', results);
});*/

conexion.end();