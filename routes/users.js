const express = require('express')
const router = express.Router();



const users = require('../data/users.js')
const {crearSesion, secreto} = require('../crypto/config.js')
const {generarToken, verificarToken} = require('../middlewares/authMiddleware.js');

crearSesion(router);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req, res) =>{

  if(req.session.user){
   
    res.send(` 
    <h1> Ya has iniciado sesion ${ req.session.user.name} </h1>
    <a href="/dashboard">dashboard</a>
    <form action ="/logout" method = "post">
      <button type="submit">Cerrar sesión</button>
    </form>
    `)
  }
  else{
    const loginForm = `
    <form action="/login" method="post">
      <label for="username">Usuario :</label>
      <input type="text" id="username" name="username" required><br>

      <label for="password">Contraseña :</label>
      <input type="password" id="password" name="password" required><br>

      <button type="submit">Iniciar sesión</button>
    </form>
    <a href="/dashboard">dashboard</a>
  `;
    res.send(loginForm);
  }
})

router.post('/login', (req, res) => {
    const {username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
   

    if(user){
        const token = generarToken(user);  
        req.session.token  = token;
        req.session.user = user;       
        res.redirect('/dashboard');
    }
    else{
        res.status(401).json({mensaje: 'credenciales incorrectas'})
    }
})

router.get('/dashboard', verificarToken, (req, res) =>{
    const userId = req.user;
    const user = users.find(user => user.id === userId);

    if(user){
        res.send(`
        <h1>Bienvenido al panel de usuario,  ${user.name} </h1>
        <p>id: ${user.id}</p>
        <p>Username: ${user.username}</p>
        <a href="/">Home</a>
        <form action ="/logout" method = "post">
          <button type="submit">Cerrar sesión</button>
        </form>
        `)
    }
    else{
        res.status(401).json({mensaje: 'Usuario no encontrado'})
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;