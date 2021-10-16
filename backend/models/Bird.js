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
        description: {
            type: String,
            trim: true,
            require: true,
            maxlength: 2000
        },
        category: {
            type: ObjectId,
            ref: "Category",
            require: "true"
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Bird", birdSchema);