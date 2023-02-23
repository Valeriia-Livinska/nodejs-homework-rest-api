const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { authenticate, validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.contactAddJoiSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  authenticate,
  validation(schemas.contactUpdateJoiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(schemas.updateFavoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeById));

module.exports = router;
