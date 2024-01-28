const joi = require('joi')
const Project = joi.object({
    id : joi.number().required(),
    name : joi.string().required(),
    description : joi.string().required(),
    tags : joi.string().required(),
    github: joi.string().required(),
    image: joi.string().required()
})
module.exports = Project