import express from "express";
import {resolve} from "path";

const app = express();

app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    // res.end("<h1>Hola mundo desde Express.js con el método send</h1>")
    res.send("<h1>Hola mundo desde Express.js con el método send</h1>")
})

app.get("/json", (req, res) => {
    res.json({
        name: "Ronki",
        age: 21,
        instagram: "ronki.js"
    })
});

app.get("/archivo", (req, res) => {
    res.sendFile(resolve("index.html"));
});

app.get("/plantilla", (req, res) => {
    //Esta ruta no funciona porque hay que especificar el motor de plantillas a express
    res.render("plantilla");
});

app.get("/jonmircha", (req, res) => {
    // res.send("<h1>Bienvenidos a jonmircha.com</h1>");
    res.redirect(301,"https://jonmircha.com/cursos")
});

app.get("/4", (req, res) => {
    
});

app.listen(3000, () => 
    console.log("Iniciando Express desde http://localhost:3000")
);