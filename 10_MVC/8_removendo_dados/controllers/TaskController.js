const Task = require('../models/Task')

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }
    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }
        await Task.create(task)
        res.redirect('/tasks/all')
    }
    static async removeTask(req, res) {
        const id = req.body.id

        await Task.destroy({where: {id: id}})
        res.redirect('/tasks/all')
    }
    static async showTask(req, res) {
        const tasks = await Task.findAll({raw: true})
        console.log(tasks)
        res.render('tasks/all', {tasks})
    }
    static homeTask(req, res) {
        res.render('tasks/home')
    }
}