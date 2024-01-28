const session = require('express-session');
const crypto = require('crypto');
const bcrypt = require('bcrypt')

//const secreto = 'soy_Batman';

const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);
const secreto = hashedSecret;

function crearSesion(app){

    app.use( 
        session({
        secret: secreto,
        resave: false,
        saveUninitialized: true,
        cookie:{secure:false}
        })
)
}

module.exports = {crearSesion, secreto};