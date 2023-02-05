const express = require("express");

const router = express.Router();

const createError = require("http-errors");
// const { NotFound } = require("http-errors");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .length(14)
    .regex(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/)
    .required(),
});

// validation with not required fields
const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .length(14)
    .regex(/^[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/),
});

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contactsList,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const foundContact = await getContactById(contactId);
    if (!foundContact) {
      // var 1 with NotFound from http-errors
      // throw new NotFound(`Contact with id ${contactId} not found`);

      // var 2 with create error http-errors
      throw createError(404, `Contact with id ${contactId} not found`);

      // var 3 handwritten
      // const error = new Error(`Contact with id ${contactId} not found`);
      // error.status = 404;
      // throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: foundContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const addedContact = await addContact(req.body);
    res.json({
      status: "created",
      code: 201,
      data: {
        result: addedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    // check if req.body is not empty
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      throw createError(400, 'Missing fields. Please add fields to update');
    }

    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw createError(404, `Contact with id ${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (error) { 
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      throw createError(404, `Contact with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result: deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
