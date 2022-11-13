
const fs = require('fs')

const getError = (errors, prop) => {
    try {
      return errors.mapped()[prop].msg
    } catch (error) {
      return ''
    }
  }
   
  module.exports = ({errors}) => {        
    console.log(fs.readFileSync('carrito.html', 'utf8'));
    return fs.readFileSync('carrito.html', 'utf8');
  }