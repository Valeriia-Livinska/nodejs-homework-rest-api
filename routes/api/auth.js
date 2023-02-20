const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const { userJoiSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  validation(userJoiSchema),
  ctrlWrapper(ctrl.registration)
);

router.post("/users/login", validation(userJoiSchema), ctrlWrapper(ctrl.login));

module.exports = router;
