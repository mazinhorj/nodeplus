const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.get('/add', TaskController.createTask)
router.get('/', TaskController.homeTask)
router.get('/all', TaskController.showTask)

module.exports = router