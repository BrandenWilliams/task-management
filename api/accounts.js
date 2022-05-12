const express = require(`express`);

const router = express.Router();

const accountDB = require('../pools/accountPool.js')

router.get('/:id', (req, res) => {
    accountDB.getAccountByID(req, res);
    return
})

router.post('/new', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.repeatPassword) {
        return res.status(400).json({ msg: `Must include email, password, and repeat password` })
    }

    if (req.body.password != req.body.repeatPassword) {
        return res.status(400).json({ msg: `Passwords to not match` })
    }

    accountDB.createAccount(req, res)
});

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: `Must include email and password` })
    }

    accountDB.loginAccount(req, res)
});

module.exports = router;
