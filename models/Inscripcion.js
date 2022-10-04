const mongoose = require('mongoose');

let InscripcionSchema = new mongoose.Schema({
    idInscripcion: Number,
    tipoDocumento: String,
    numeroDocumento: String,
    nombres: String,
    apellidos: String,
    direccion: String,
    correo: String,
    telefono: String,
    celular: String,
    comprobante: String,
    codigoIcfes: String,
    familiarUniversidad: String,
    estrato: String,
    tipoColegio: String
});

module.exports = mongoose.model('inscripcion', InscripcionSchema, 'inscripciones');