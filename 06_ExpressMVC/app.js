//Configuración de los módulos
import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

//Configuración de variables
const __dirname = fileURLToPath(new URL(".", import.meta.url))

const app = express();
const PORT = 3000;

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Esta línea especifica cual es la carpeta de las vistas
app.set("views", path.join(__dirname, "views"));
//Esta línea especifica cual es el template engine
app.set("view engine", "pug");

//Esta línea especifica cual es la carpeta public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Definición de las rutas
app.get("/", taskController.getAllTasks);
app.get("/add", taskController.getAddTaskForm);
app.post("/add", taskController.addTask);
app.get("/edit/:id", taskController.getEditTaskForm);
app.post("/edit/:id", taskController.editTask);
app.get("/complete/:id", taskController.completeTask);
app.get("/uncomplete/:id", taskController.uncompleteTask);
app.get("/delete/:id", taskController.deleteTask);

app.use(errorController.error404);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})