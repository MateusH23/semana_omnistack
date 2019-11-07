const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); //cria um servidor para ser acessado pelo navegador

const server = require('http').Server(app); // http
const io = require('socket.io')(server); // websocket: permite a comunicação em tempo real

mongoose.connect('mongodb+srv://semana:semana@cluster0-eqkdx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(cors()); // faz com que o backend seja acessado por qualquer aplicação, mesmo em dominios diferentes

// rota para acessar os arquivos estáticos da aplicação, nesse caso, as imagens que estiverem salvas.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes')); // faz com que a aplicação reconheça as rotas

server.listen(3333); //determinar uma porta para o navegador ficar ouvindo e acessar a aplicação
