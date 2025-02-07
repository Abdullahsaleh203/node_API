import express from 'express';
import User, { findOne } from '../model/User';

const router = express.Router();
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../validation';

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the database
    const emailExist = await findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);
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


// Login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Check if the email exists
    const user = await findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');
    // Password is correct
    const validPass = await compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password')
    const token = sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '0.5h' });
    res.header('auth-token', token).send(token);
});

export default router;

