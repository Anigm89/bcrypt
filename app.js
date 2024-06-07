const express = require('express');
const app = express();
const session = require('express-session');

const secreto = require('./crypto/config.js')
const router = require('./routes/users.js')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( 
    session({
    secret: secreto,
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
    })
)


app.use('/', router)

app.listen(3000, () =>{
    console.log('Express está escuchando en el puerto http://localhost:3000');
})