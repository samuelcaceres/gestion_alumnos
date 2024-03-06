const Alumno = require("../models/AlumnoModel.js");

exports.getAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getAlumnoById = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        res.json(alumno);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.saveAlumno = async (req, res) => {
    const alumno = new Alumno(req.body);
    try {
        const insertedAlumno = await alumno.save();
        res.status(201).json(insertedAlumno);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updateAlumno = async (req, res) => {
    try {
        const updatedAlumno = await Alumno.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedAlumno);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.deleteAlumno = async (req, res) => {
    try {
        const deletedAlumno = await Alumno.deleteOne({_id:req.params.id});
        res.status(200).json(deletedAlumno);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


