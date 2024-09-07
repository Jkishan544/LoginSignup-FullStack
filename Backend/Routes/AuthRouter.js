const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();   //It provides a robust set of features to handle routing, middleware, and HTTP requests,


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;