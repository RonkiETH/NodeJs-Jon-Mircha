import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function displayMenu() {
    console.log(chalk.redBright.bold("\n===== To Do App ====="));
    console.log(chalk.blueBright("Menú de opciones"));
    console.log("1. Agregar tarea");
    console.log("2. Listar tareas");
    console.log("3. Completar tarea");
    console.log("4. Salir");
    console.log("\n");
}

function loadTasks() {
    try {
        const data = readFileSync(DB_FILE, "utf-8");
        const lines = data.split("\n");
        tasks.length = 0;

        lines.forEach((line) => {
            if (line.trim() !== "") {
                const [task, completed] = line.split("|");
                tasks.push({ task, completed: completed === "true" });
            }   
            });
            console.log(chalk.green.bold("Las tareas se cargaron desde la DB"));
    } catch (error) {
        console.log(chalk.red.bold("No hay tareas por hacer"));
    }
}

function saveTask() {
    const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
    writeFileSync(DB_FILE, data, "utf-8");
    console.log(chalk.green.bold("Tarea agregada a la DB con éxito"));
}

function addTask() {
    rl.question(chalk.bgCyanBright("Escribe la tarea: "), (task) => {
        tasks.push({
            task,
            completed: false
        })
        console.log(chalk.green.bold("Tarea agregada con éxito"));
        console.log(tasks);
        saveTask();
        displayMenu();
        chooseOption();
    })
}

function listTasks() {
    console.log(chalk.yellow.bold("\nTareas: \n"));
    if(tasks.length === 0) {
        console.log(chalk.red.bold("No hay tareas"));
    } else {
        tasks.forEach((task, index) => {
            let status = task.completed 
            ? "BIEN" 
            : "MAL";
            if (task.completed) {
                console.log(chalk.greenBright(`${index + 1}. ${status} - ${task.task}`));
            } else {
                console.log(chalk.redBright(`${index + 1}. ${status} - ${task.task}`));
            }
            
        }) 
    }
    displayMenu();
    chooseOption();
}

function completeTask() {
    rl.question(chalk.magentaBright("Digita el número de la tarea a completar: "), (taskNumber) => {
        const index = parseInt(taskNumber) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = true;
            saveTask();
            console.log(chalk.green.bold("Tarea marcada con éxito\n\n"));
        } else {
            console.log(chalk.red.bold("Número de tarea inválido\n\n"));
        }
        displayMenu();
        chooseOption();
    })
}

function chooseOption() {
    rl.question("Escriba el número: ", (option) => {
        switch (option) {
            case "1":
                addTask();
                break;
            case "2":
                listTasks();
                break;
            case "3":
                completeTask();
                break;
            case "4":
                console.log(chalk.yellow("Saliste"));
                rl.close();
                break;
        
            default:
                console.log(chalk.red("Opción inválida, intenta nuevamente"));
                displayMenu();
                chooseOption();
                break;
        }
    })
}

loadTasks();
displayMenu();
chooseOption();