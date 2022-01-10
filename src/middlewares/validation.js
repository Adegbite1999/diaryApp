const Joi = require('joi');

const register = (firstname, lastname, email, password) =>{
 const Schema = Joi.object({
     firstname: Joi.string().min(5).max(15).required(),
     lastname: Joi.string().min(5).max(15).required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(5).max(15)
 })
 return Schema.validate({firstname, lastname, email, password})
}

const login = (email, password) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(15)
    })
    return Schema.validate({email, password})
}


module.exports = {register, login}