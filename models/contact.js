const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const contactAddJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .length(14)
    .regex(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/),
  favorite: Joi.boolean().default(false),
});

// validation with not required fields
const contactUpdateJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .length(14)
    .regex(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/),
  favorite: Joi.boolean().default(false),
});

// validation only for favorite
const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactAddJoiSchema,
  contactUpdateJoiSchema,
  updateFavoriteJoiSchema,
};

// if we want to throw a valid error code
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
