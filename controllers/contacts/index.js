const getAll = require("../../controllers/contacts/getAll");
const getById = require("../../controllers/contacts/getById");
const add = require("../../controllers/contacts/add");
const updateById = require("../../controllers/contacts/updateById");
const removeById = require("../../controllers/contacts/removeById");

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};
