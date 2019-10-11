const express = require('express');
const app = express();
const mongoose = require('mongoose');
var port = process.env.PORT || 8080; //porta que o serviço vai rodar
const uri = ""; //url do seu banco de dados mongo

//models
require('./src/models/UserModel');

mongoose.connect(uri, {useNewUrlParser: true ,useUnifiedTopology: true} );

app.use(express.json());

app.use('/api',require('./src/routes'));

//rodando na porta
app.listen(port , function(){
    console.log(`Rodando na porta ${port}`)
})