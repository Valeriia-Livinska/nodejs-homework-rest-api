const express = require("express");

const { auth: ctrl } = require("../../controllers");

const {
  authenticate,
  validation,
  ctrlWrapper,
  upload,
} = require("../../middlewares");
const {
  userJoiSchema,
  updateSubscriptionJoiSchema,
} = require("../../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  validation(userJoiSchema),
  ctrlWrapper(ctrl.registration)
);

router.post("/users/login", validation(userJoiSchema), ctrlWrapper(ctrl.login));

router.post("/users/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/users/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/users",
  authenticate,
  validation(updateSubscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;