import { object, string } from 'joi';

// Register VALIDATION
const registerValidation = data => {
    const schema = object({
        name : string()
        .min(6)
        .required(),
        email : string()
        .min(6).required()
        .email(),
        password : string()
        .min(8).
        required()
    })
    return schema.validate(data);
    
}
// Login VALIDATION
const loginValidation = (data) => {
    const schema = object({
        email : string()
        .min(6).required()
        .email(),
        password : string()
        .min(8).
        required()
    })
    return schema.validate(data);
    
}

export default {registerValidation , loginValidation};
