const mongoose = require("mongoose");

const AlumnoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Alumnos', AlumnoSchema);
