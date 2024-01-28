const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post('/login', (req, res) => {
    if (req.body.password === process.env.password) {
        const password = {password : req.body.password}
        const token = jwt.sign(password, process.env.SECRET_KEY, {expiresIn: 3600})
        res.send(token);
    } else {
        res.status(401).json({error: 'Incorrect Password'})
    }
})
module.exports = router