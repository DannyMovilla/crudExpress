//Impors
const express = require("express");
const mongoose = require("mongoose");
const InscripcionSchema = require("./models/Inscripcion.js");

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conexion
mongoose.connect(
  "mongodb+srv://sssDanny:d4n13lM0v1@clusterproweb.ebwphim.mongodb.net/InscripcionEstudiante?retryWrites=true&w=majority"
);

//Operaciones Crud
app.get("/", (req, res) => {
  res.send("En Inicio de la Api");
});

//Petición GET para obtener todas las inscripciones
router.get("/inscripcion", (req, res) => {
  InscripcionSchema.find(function (err, datos) {
    if(err) return res.status(500).send({message: `Error al realizar peticion ${error}`});
    if(!datos) return res.status(404).send({message: 'No existen inscripciones'});

    res.send(200, {datos});
  });
});

router.get('/inscripcion/:inscripcionId', (req, res) => {
    let inscripcionId = req.params.inscripcionId;
  
    InscripcionSchema.findById(inscripcionId, (error, data) => {
      if (error) return res.status(500).send({message: `Error al realizar petición ${error}`});
      if(!data) return res.status(404).send({message: 'La Inscripción no existe!'});
  
      res.status(200).send({data});
    });
  });

//Petición POST para guardar registro
router.post("/inscripcion", (req, res) => {
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
    tipoColegio: req.body.tipoColegio,
  });

  nuevaInscripcion.save(function (err, datos) {
    if (err)res.status(500).send({message: `Error al guardar la inscripcón en la base de datos:  ${err}`});

    res.status(200).send({inscripcion: datos});
  });
});

//Petición PUT para actualizar la inscripción
router.put('/inscripcion/:inscripcionId', async (req, res) => {
  try {
    await InscripcionSchema.findByIdAndUpdate(req.params.inscripcionId, {
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
      tipoColegio: req.body.tipoColegio,
    });
    // Send response in here
    res.send('Incripción actualizada correctamente!');

  } catch(err) {
      console.error(err.message);
      res.send(400).send('Server Error');
  }
});

//Petición DELETE para actualizar la inscripción
router.delete("/inscripcion/:inscripcionId", (req, res) => {
  let inscripcionId = req.params.inscripcionId;

  InscripcionSchema.findById(inscripcionId, (err, inscripcion) => {
    if (err)
      res
        .status(500)
        .send({ message: `Error al borrar la inscripcion ${err}` });

    inscripcion.remove((err) => {
      if (err)
        res
          .status(500)
          .send({ message: `Error al borrar el inscripcion ${err}` });
      res.status(200).send({ message: "El inscripcion ha sido eliminada" });
    });
  });
});

//Iniciación de servicio
app.use(router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
