const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeController.store);

/*routes.post('/posts', (req, res) => { //middleware (interceptador de chamadas de requisições): função que recebe um request e um response e retorna algo
    return res.send(`Olá ${req.query.name}`) //enviar/devolver uma resposta para o front
})*/ // req.query: acessar a url de requisição e pegar os parametros caso houver

module.exports = routes;