const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/send-email', upload.single('file'), (req, res) => {
    const { name, email, message } = req.body;
    const file = req.file;

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro serviço de e-mail que você usa
        auth: {
            user: 'seu-email@gmail.com',
            pass: 'sua-senha'
        }
    });

    const mailOptions = {
        from: email,
        to: 'seu-email@gmail.com',
        subject: 'Novo contato do site',
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
        attachments: [
            {
                filename: file.originalname,
                path: path.join(__dirname, file.path)
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar e-mail');
        }
        console.log('E-mail enviado: ' + info.response);

        // Exclui o arquivo após enviar o e-mail
        fs.unlink(path.join(__dirname, file.path), (err) => {
            if (err) console.log(err);
        });

        res.send('E-mail enviado com sucesso!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
