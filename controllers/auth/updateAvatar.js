const { User } = require("../../models/user");

const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const { Unauthorized, BadRequest } = require("http-errors");

const newPath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw new BadRequest("No file was added");
  }

  const { path: oldPath, originalname } = req.file;
  const { _id: userId } = req.user;

  try {
    // -- if you need an extension
    // const [extension] = originalname.split(".").reverse();
    const newAvatarName = `${userId}_${originalname}`;

    const newAvatarPath = path.join(newPath, newAvatarName);
    await fs.rename(oldPath, newAvatarPath);

    const avatarImg = await jimp.read(newAvatarPath);
    await avatarImg
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .write(newAvatarPath);

    const newAvatarUrl = path.join("avatars", newAvatarName);

    await User.findByIdAndUpdate(userId, { avatarURL: newAvatarUrl });

    res.status(200).json({
      avatarURL: newAvatarUrl,
    });
  } catch (error) {
    await fs.unlink(oldPath);
    throw new Unauthorized("Not authorized");
  }
};

module.exports = updateAvatar;
