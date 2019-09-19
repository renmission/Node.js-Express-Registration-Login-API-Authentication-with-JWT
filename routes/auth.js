const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/register', async (req, res) => {
    // Validate
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if user exist already
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exist');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });

    try {
        const saveUser = await user.save();
        res.send('User successfully created');
    } catch (error) {
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    // Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if email doesn't exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('email is not found');

    // If password is correct
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send('Invalid Password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.header('auth-token', token).send(token);
});

module.exports = router;