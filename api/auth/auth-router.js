const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(user)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

router.post('./login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({username})
    .then(user => {
        if (user && bcrypt.compareSync(password, user[0].password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'Welcome!', token})
        } else {
            res.status(401).json({ message: 'You shall not pass!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    })
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: "Failed to logout"});
            } else {
                res.status(200).json({ message: "See you later" });
            }
        });
    };
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1hr"
    }
    const secret = secrets.jwtSecret
    return jwt.sign(payload, options, secret);
}

module.exports = router;