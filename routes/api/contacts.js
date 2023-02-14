const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validation(schemas.contactAddJoiSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  validation(schemas.contactUpdateJoiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.updateFavoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
