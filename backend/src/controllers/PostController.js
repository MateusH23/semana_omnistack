const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        //console.log(req.body);
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.png`;

        await sharp(req.file.path)
            .resize(400)
            .png({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            );

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post); // todos os usuários conectados irão receber uma mensagem com a nova informação

        return res.json(post);
    }
}