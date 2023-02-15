// const Joi = require("joi");

// const contactAddSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   phone: Joi.string()
//     .length(14)
//     .regex(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/)
//     .required(),
// });

// // validation with not required fields
// const contactUpdateSchema = Joi.object({
//   name: Joi.string().min(3).max(30),
//   email: Joi.string().email({ minDomainSegments: 2 }),
//   phone: Joi.string()
//     .length(14)
//     .regex(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/),
// });

// module.exports = {
//   contactAddSchema,
//   contactUpdateSchema,
// };
