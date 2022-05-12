const auth = require('../pools/authentication.js')

const Pool = require('pg').Pool
const tasksPool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'tasksDB',
  password: 'password',
  port: 5432,
})

const createTask = (req, res) => {
  const name = req.name

  auth.authenticateToken(req, res)

  tasksPool.query('INSERT INTO tasks (account_ID, content) VALUES ($1, $2)', [account_ID, content], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Task added with ID: ${result.insertId}`)
  })
}

const getTask = (req, res) => {
  const id = parseInt(req.params.id)

  tasksPool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const updateTask = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  tasksPool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Task modified with ID: ${id}`)
    }
  )
}

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id)

  tasksPool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Task deleted with ID: ${id}`)
  })
}

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
}
