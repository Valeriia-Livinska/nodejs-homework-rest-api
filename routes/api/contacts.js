const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schemas");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validation(contactsSchema.contactAddSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  validation(contactsSchema.contactUpdateSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
