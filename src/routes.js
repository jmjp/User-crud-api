const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('./controllers/UserController');
const Mail = require('./mail');

function verifyJWT(req, res, next){
    var token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}


routes.post("/user/register", UserController.create);
routes.post("/user/login", UserController.login);
//rota com autenticação
routes.get("/email",verifyJWT,Mail.index); // o verifyJWT verifica se o token está correto e libera

module.exports = routes;