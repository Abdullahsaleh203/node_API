const Joi = require('joi');




// Register VALIDATION
const registerValidation = data => {
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
    return schema.validate(data);
    
}
// Login VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        email : Joi.string()
        .min(6).required()
        .email(),
        password : Joi.string()
        .min(8).
        required()
    })
    return schema.validate(data);
    
}

module.exports = {registerValidation , loginValidation};
// model.exports.loginValidation = loginValidation;
