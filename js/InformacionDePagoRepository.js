class InformacionDePagoRepository{
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

    Save(creditCardNumber, creditCardCvv, monthOfExpiration, yearOfExpiration){
        conexion.query('INSERT INTO informaciondepago (creditCardNumber, credirCardCvv, monthOfExpiration, yearOfExpiration) VALUES ("'+creditCardNumber+'", "'+creditCardCvv+'","'+monthOfExpiration+'", "'+yearOfExpiration+'"'+')', function(error, results){
            if(error) throw error;
            console.log('Registro Agregado', results);
        });
    }

    Delete(idInformacionDePago){
        conexion.query('DELETE FROM informaciondepago WHERE idInformacionDePago='+idInformacionDePago, function(error, results){
            if(error) throw error;
            console.log('Registro Eliminado', results);
        });
    }

    Update(idInformacionDePago){
        conexion.query('UPDATE informaciondepago SET creditCardNumber = "'+creditCardNumber+'", creditCardCvv = "'+creditCardCvv+'", monthOfExpiration = "'+monthOfExpiration+'", yearOfExpiration = "'+yearOfExpiration+'" WHERE idInformacionDePago='+idInformacionDePago, function(error, results){
            if(error) throw error;
            console.log('Registro Actualizado', results);
        });
    }

    List(){
        var list = [];
        conexion.query('SELECT * from informaciondepago', function(error, results, fields){
            if(error)
            throw error;
    
            results.forEach(result => {
                list.push(result);
                console.log(result);
            });
        });
        return list;
    }

    SearchCardNumber(creditCardNumber){
        var list = [];
        conexion.query('SELECT * from informaciondepago WHERE creditCardNumber = "'+creditCardNumber+'"', function(error, results, fields){
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