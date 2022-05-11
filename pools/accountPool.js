const auth = require('../pools/authentication.js')

const Pool = require('pg').Pool
const usersAccount = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'accountDB',
  password: 'password',
  port: 5432,
})

const ErrEmailDuplicate = "duplicate key value violates unique constraint \"accounts_email_key\""

const createAccount = (req, res) => {
  const { email, password } = req.body
  usersAccount.query('INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING ID', [email, password], (error, result) => {
    if (error) {
      if (error.message == ErrEmailDuplicate) {
        res.status(200).send(`Email already in use`)
        return
      }

      throw error
    }

    res.status(200).send(`User added with ID: ${result.ID}`)
  })
}

const loginAccount = (req, res) => {
  const email = parseInt(req.params.email)

  usersAccount.query('SELECT * FROM accounts WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }

    if (results.password != req.params.password) {
      res.status(400).json({ msg: `Passwords to not match` })
    }

    const token = auth.generateAccessToken({ id: req.body.id });
    res.json(token);
  })
}

const getAccountByID = (req, res) => {
  const id = parseInt(req.params.id)

  usersAccount.query('SELECT * FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).json(results.rows)
  })
}

const getAccountByEmail = (req, res) => {
  const id = parseInt(req.params.id)

  usersAccount.query('SELECT * FROM accounts WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).json(results.rows)
  })
}

module.exports = {
  createAccount,
  loginAccount,
  getAccountByID,
  getAccountByEmail,
}
