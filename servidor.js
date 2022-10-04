//Impors 
const express = require('express');
const mongoose = require('mongoose');
const InscripcionSchema = require('./models/Inscripcion.js')

const app = express();
const router = express.Router();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Conexion
mongoose.connect("mongodb+srv://sssDanny:d4n13lM0v1@clusterproweb.ebwphim.mongodb.net/InscripcionEstudiante?retryWrites=true&w=majority")

//Operaciones Crud
app.get('/', (req, res) => {
    res.send("En Inicio de la Api")
})

//Petición GET para obtener todas las inscripciones
router.get('/inscripcion', (req, res) => {
    InscripcionSchema.find(function(err, datos){
        if(err){
            console.log("Error leyendo las inscripciones");
        }else{
            res.send(datos)
        }
    })
})

//Petición POST para guardar registro 
router.post('/inscripcion', (req, res) => {
    let nuevaInscripcion = new InscripcionSchema({
        //idInscripcion: req.body.idInscripcion,
        tipoDocumento: req.body.tipoDocumento,
        numeroDocumento: req.body.numeroDocumento,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        celular: req.body.celular,
        comprobante: req.body.comprobante,
        codigoIcfes: req.body.codigoIcfes,
        familiarUniversidad: req.body.familiarUniversidad,
        estrato: req.body.estrato,
        tipoColegio: req.body.tipoColegio
    });

    nuevaInscripcion.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("La Inscripción fue realizada correctamente")
    });
})

//Iniciación de servicio
app.use(router);
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
})
