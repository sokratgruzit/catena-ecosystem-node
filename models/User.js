const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Roles'
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", User);