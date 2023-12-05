//Configuración de los módulos
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

//Configuración de variables

const app = express();
const PORT = 3000;

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Esta línea especifica cual es la carpeta public
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Definición de las rutas
app.get("/tasks", taskController.getAllTasks);
app.post("/tasks", taskController.addTask);
app.get("/tasks/:id", taskController.getTask);
app.put("/tasks/:id", taskController.editTask);
app.put("/tasks/complete/:id", taskController.completeTask);
app.put("/tasks/uncomplete/:id", taskController.uncompleteTask);
app.delete("/tasks/:id", taskController.deleteTask);

app.use(errorController.error404);

app.listen(PORT, () => {
    console.log(`La API está funcionando en http://localhost:${PORT}/tasks`);
})