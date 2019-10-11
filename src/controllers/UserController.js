const moongose = require('mongoose');
const User = moongose.model('Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req,res){
        const users = await User.findById(req.userId);
        return res.json(users);
    },
    //criar usuario.
    async create(req,res){
        let usercheck = await User.findOne().where('email').equals(req.body.email)
        if(!usercheck){
            userNew = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                role: 0,
            });
            User.create(userNew).then(() => {
                return res.json("Registred");
            });
           
        }
        return res.status(400).json({error: "usuario ou senha invalido"});
    },
    //logar usuario.
    async login(req,res){
        let usercheck = await User.findOne().where('username').equals(req.body.username);
        const match = await bcrypt.compareSync(req.body.password,usercheck.password);
        if(match == true){
            const token = jwt.sign({ id: usercheck._id }, "jwtSecret", {
                expiresIn: "7 days" //validade do token
                //no lugar do jwtSecret é recomendavel criar uma variavel de ambiente
                //pra ficar mais facil a manutenção depois
            }, { algorithm: 'RS256'});
            return res.json({token: token});
        }
        return res.json({error: "usuario ou senha invalido"})
    },

    async renewtoken(req,res){
        const token = jwt.sign({ id: req.userId }, "jwtSecret", {
            expiresIn: "7 days"
        }, { algorithm: 'RS256'});
        return res.json({token: token});
    }
};