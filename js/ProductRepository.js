class ProductRepository{
    constructor(){
        var mysql = require('mysql');

        var conexion = mysql.createConnection({
            host: 'localhost',
            database: 'rockit',
            user: 'root',
            password: 'rockit'
        });

        conexion.connect(function(error){
            if(error){
                throw error;
            }else{
                console.log('CONEXION EXITOSA');
            }
        });
    }

    Save(album, artista, descripcion, genero, cantidad, precio){
        conexion.query('INSERT INTO productos (album, artista, descripcion, genero, cantidad, precio) VALUES ("'+album+'", "'+artista+'", "'+descripcion+'", "'+genero+'", '+cantidad+', '+precio+')', function(error, results){
            if(error) throw error;
            console.log('Registro Agregado', results);
        });
    }

    Delete(idproducto){
        conexion.query('DELETE FROM productos WHERE idproductos='+idproducto, function(error, results){
            if(error) throw error;
            console.log('Registro Eliminado', results);
        });
    }

    Update(idproducto){
        conexion.query('UPDATE productos SET album = "'+album+'", artista = "'+artista+'", descripcion = "'+descripcion+'", genero = "'+genero+'", cantidad = '+cantidad+', precio = '+precio+' WHERE idproductos='+idproductos, function(error, results){
            if(error) throw error;
            console.log('Registro Actualizado', results);
        });
    }

    List(){
        var list = [];
        conexion.query('SELECT * from productos', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchAlbum(album){
        var list = [];
        conexion.query('SELECT * from productos WHERE album = "'+album+'"', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchArtist(artista){
        var list = [];
        conexion.query('SELECT * from productos WHERE artista = "'+artista+'"', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchGenre(genero){
        var list = [];
        conexion.query('SELECT * from productos WHERE genero = "'+genero+'"', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchAlbumAndArtist(album, artista){
        var list = [];
        conexion.query('SELECT * from productos WHERE album = "'+album+'" AND artista = "'+artista+'"', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }
}