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
                error: "Image could not be uploaded"
            })
        }

        const { nameCR, nameUSA, nameC, descrption, category} = fields;
        let bird = new Bird(fields);

        if (files.photo) {
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: "Image should be less than 5MB in size"
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
        .populate("category")
        .sort([[sortBy, order]])
        .exec((err, birds) => {
            if (err) {
                return res.status(400).json({
                    error: "Birds not found"
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
            message: "Bird was successfully deleted"
        })
    })
}


exports.birdById = (req, res, next, id) => {
    Bird.findById(id)
    .populate("category")
    .exec((err, bird) => {
        if (err || !bird) {
            return res.json({
                error: "Bird was not found or does not exist"
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