const express = require(`express`);

const router = express.Router();

const tasksDB = require('../pools/tasksPool.js')

router.get('/:id', (req, res) => {
    return tasksDB.getTask(req, res);
})

router.post('/new', (req, res) => {
    tasksDB.createTask(req, res);
});

router.put('/:id', (req, res) => {
    tasksDB.updateTask(req, res);
})

router.delete('/:id', (req, res) => {
    tasksDB.deleteTask(req, res);
})

module.exports = router;
