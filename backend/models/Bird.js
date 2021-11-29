const mongoose = require('mongoose');
const { ObjectId} = mongoose.Schema;

const birdSchema = new mongoose.Schema(
    {
        nameCR: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32
        },
        nameUSA: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32
        },
        nameC: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32
        },
        observation: {
            type: String,
            trim: true,
            require: true,
            maxlength: 40
        },
        description: {
            type: String,
            trim: true,
            require: true,
            maxlength: 2000
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Bird", birdSchema);