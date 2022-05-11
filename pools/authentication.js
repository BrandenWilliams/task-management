const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();

function generateAccessToken(ID) {
    return jwt.sign(ID, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.email = email
    })
}

module.exports = {
    authenticateToken,
    generateAccessToken
}
