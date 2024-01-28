const express = require('express');
const app = express();

//const {crearSesion, secreto} = require('./crypto/config.js')
const router = require('./routes/users.js')


//crearSesion()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', router)

const {generarToken, verificarToken } = require('./middlewares/authMiddleware.js');

app.use('/login', generarToken, router);
app.use('/dashboard',verificarToken, router);
app.use('/logout', router)


app.listen(3000, () =>{
    console.log('Express está escuchando en el puerto http://localhost:3000');
})