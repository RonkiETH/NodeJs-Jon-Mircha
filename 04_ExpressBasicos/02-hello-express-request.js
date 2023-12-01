import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.end("<h1>Hola mundo desde Express.js</h1>");
    console.log(req);
    console.log(res);
});

app.get("/user:id-:name-:age", (req, res) => {
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    res.end(`
        <h1>
            ${req.params.name}, bienvenido a Express.js. Tu id es ${req.params.id} y tienes ${req.params.age} años.
        </h1>
    `)
})

app.get("/search", (req, res) => {
    //http://localhost:3000/search?id=1&name=Juan&age=21
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    res.end(`
        <h1>
            ${req.query.name}, bienvenido a Express.js. Tu id es ${req.query.id} y tienes ${req.query.age} años.
        </h1>
    `)
});

app.listen(3000, () => 
    console.log("Iniciando Express desde http://localhost:3000")
);