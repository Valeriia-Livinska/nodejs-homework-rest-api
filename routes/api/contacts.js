const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsList,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const foundContact = await getContactById(contactId);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: foundContact,
    },
  });
});

router.post("/", async (req, res, next) => {
  // const { name, email, phone } = req.body;
  const addedContact = await addContact (req.body);
  res.json({
    status: "created",
    code: 201,
    data: {
      result: addedContact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updatedContact,
    },
  });
});

module.exports = router;
