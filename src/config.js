//coneccion a db

const { name } = require("ejs");
const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://santa:mongo123@cluster0.lcn8fk5.mongodb.net/"
);

//verificacion de coneccion
connect
  .then(() => {
    console.log("conectado a dase de datos");
  })
  .catch(() => {
    console.log("error de conexion");
  });

// crear un schema

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("usuarios", loginSchema);
module.exports = collection;
