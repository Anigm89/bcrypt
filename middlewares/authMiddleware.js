const jwt = require('jsonwebtoken');
const {secreto} = require('../crypto/config.js');

function generarToken(user){
    return jwt.sign({user: user.id}, secreto,{expiresIn:'1h'})
}


function verificarToken(req, res, next){
    const token = req.session.token;
    if(!token){
        return res.status(401).json({mensaje: 'token no generado'})
    }
    jwt.verify(token, secreto,(err, decoded) => {
        if(err){
            return res.status(401).json({mensaje: 'token no válido'})
        }
        req.user = decoded.user;
        next();
    })
    

}

module.exports = {generarToken, verificarToken };