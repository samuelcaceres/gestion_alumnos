const express = require("express");
const {
    getAlumnos,
    getAlumnoById,
    saveAlumno,
    updateAlumno,
    deleteAlumno
} = require("../controllers/AlumnoController.js");

const router = express.Router();

router.get('/alumnos', getAlumnos);
router.get('/alumnos/:id', getAlumnoById);
router.post('/alumnos', saveAlumno);
router.patch('/alumnos/:id', updateAlumno);
router.delete('/alumnos/:id', deleteAlumno);

module.exports = router;
