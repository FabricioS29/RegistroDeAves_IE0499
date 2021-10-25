const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); // Extraer imagenes desde el sistema operativo


const Bird = require('../models/Bird');
const { errorHandler } = require('../helpers/dberrorHandler');



exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "No se pudo cargar la imagen"
            })
        }

        const { nameCR, nameUSA, nameC, descrption} = fields;
        let bird = new Bird(fields);

        if (files.photo) {
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: "La imagen debe tener un tamaño inferior a 5 MB"
                })
            }
            bird.photo.data = fs.readFileSync(files.photo.path);
            bird.photo.contentType = files.photo.type;
        }

        bird.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);

        }) 

    })

}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'nameCR';   // Orden de la lista

    Bird.find()
        .select("-photo")
        .sort([[sortBy, order]])
        .exec((err, birds) => {
            if (err) {
                return res.status(400).json({
                    error: "Aves no encontradas"
                })
            }
            res.json(birds);
        })
}

exports.read = (req, res) => {
    req.bird.photo = undefined;
    return res.json(req.bird);
}


exports.remove = (req, res) => {
    let bird = req.bird
    bird.remove((err, deletedBird) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Especie eliminada correctamente"
        })
    })
}


exports.birdById = (req, res, next, id) => {
    Bird.findById(id)
    .exec((err, bird) => {
        if (err || !bird) {
            return res.json({
                error: "La especie no se encontró o no existe"
            });
        }
        req.bird = bird;
        next();
    })
}


exports.photo = (req, res, next) => {
    if (req.bird.photo.data) {
        res.set('Content-Type', req.bird.photo.contentType);
        return res.send(req.bird.photo.data);
    }
    next();
}