const nodemailer = require('nodemailer');

module.exports = {
    async index(req,res){
        const transporter = nodemailer.createTransport({
            host: "SERVIDOR DO SEU EMAIL",
            port: 465, //porta do smpt
            secure: true, // true for 465, false for other ports
            auth: {
                user: "SEU EMAIL",
                pass: "SUA SENHA"
            },
            tls: { rejectUnauthorized: false }
        });
        
        const mailOptions = {
            from: 'SEU EMAIL',
            to: req.body.email, //recepiente
            subject: 'ASSUNTO',
            text: 'TEXTO'
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.json(error);
            } else {
              res.json('Email enviado: ' + info.response);
            }
        });
    },
   
}
