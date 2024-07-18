//modulos necesarios

const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");

const { name } = require("ejs");
const collection = require("./config");

//aplicacion express
const app = express();

//usar archivos estaticos
app.use(express.static("public"));

//pasar datos a json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//motor de vista
app.set("view engine", "ejs");

//rutas

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//registro

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    res.send("ya existe el registro");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.render("este usuario no existe");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("home");
    } else {
      req.send("contraseña incorrecta");
    }
  } catch {
    res.send("verifique sus datos");
  }
});
//puerto
const port = 3000;
app.listen(port, () => {
  console.log("corriendo por puerto: 3000");
});
