import express from "express";
import path from "path";
import fs from "fs/promises";
import MarkdownIt from "markdown-it";
import fm from "front-matter";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("pages", path.join(__dirname, "pages"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//Rutas dinámicas desde archivos en la carpeta "pages"
const pagesDir = path.join(__dirname, "pages");
const files = await fs.readdir(pagesDir);

//Lógica para archivos html y md

//Ruta de la página principal
app.get("/", (req,res) => {

});
//Ruta del error 404
app.use((req,res) => {

});

app.listen(PORT, () => console.log(`Sitio web corriendo en http://localhost:${PORT}`));