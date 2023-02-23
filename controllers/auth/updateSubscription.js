const createError = require("http-errors");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  // check if req.body is not empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw createError(400, "Please add field data to update");
  }

  const { _id: userId } = req.user;
  const { subscription } = req.body;

  const updatedStatusUser = await User.findByIdAndUpdate(
    userId,
    { subscription },
    {
      new: true,
      select: "_id email subscription",
    }
  );

  if (!updatedStatusUser) {
    throw createError(404, `User with id ${userId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: updatedStatusUser,
    },
  });
};

module.exports = updateSubscription;
