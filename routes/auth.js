const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');

// VALIDATION
const Joi = require('joi');

const schema = Joi.object({
    name : Joi.string()
    .min(6)
    .required(),
    email : Joi.string()
    .min(6).required()
    .email(),
    password : Joi.string()
    .min(8).
    required()
})

router.post('/register',async (req, res) => {
    // Validate the data before we make a user
    // const validation = schema.validate(req.body, schema);
    // res.send(validation);
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (err) {
            res.status(400).send(err);
        }

});



router.post('/login', (req, res) => {
    res.send('Login');
});

module.exports = router;

