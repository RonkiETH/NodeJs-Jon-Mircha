let tasks = [
    {
        id: 1,
        title: "Tarea 1",
        completed: false
    },
    {
        id: 2,
        title: "Tarea 2",
        completed: true
    },
]

const getAllTasks = (req, res) => {
    res.render("index", {
        title: "Lista de Tareas",
        tasks,
    })
}

const getAddTaskForm = (req, res) => {}

const addTask = (req, res) => {}

const getEditTaskForm = (req, res) => {}

const editTask = (req, res) => {}

const completeTask = (req, res) => {}

const uncompleteTask = (req, res) => {}

const deleteTask = (req, res) => {}

export default {
    getAllTasks,
    getAddTaskForm,
    addTask,
    getEditTaskForm,
    editTask,
    completeTask,
    uncompleteTask,
    deleteTask,
}