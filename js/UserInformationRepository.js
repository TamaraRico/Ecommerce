class UserInformationRepository{
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

    Save(nombre, email, password){
        conexion.query('INSERT INTO usuarios (user, email, password) VALUES ("'+nombre+'", "'+email+'", "'+password+'"'+')', function(error, results){
            if(error) throw error;
            console.log('Registro Agregado', results);
        });
    }

    Delete(idUser){
        conexion.query('DELETE FROM usuarios WHERE idUsuarios='+idUser, function(error, results){
            if(error) throw error;
            console.log('Registro Eliminado', results);
        });
    }

    Update(iduser){
        conexion.query('UPDATE usuarios SET nombre = "'+nombre+'", correo = "'+correo+'", password = "'+password+'" WHERE idUsuarios='+iduser, function(error, results){
            if(error) throw error;
            console.log('Registro Actualizado', results);
        });
    }

    List(){
        var list = [];
        conexion.query('SELECT * from usuarios', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchEmail(email){
        var list = [];
        conexion.query('SELECT * from usuarios WHERE correo = "'+email+'"', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchUserName(user){
        var list = [];
        conexion.query('SELECT * from usuarios WHERE nombre = "'+user+'"', function(error, results, fields){
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