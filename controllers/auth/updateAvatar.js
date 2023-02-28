const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const { path: oldPath, filename } = req.file;
  const { _id: userId } = req.user;
  const newPath = path.join(__dirname, "../../", "public", "avatars");
  try {
    const [extension] = filename.split(".").reverse();
    const newAvatarName = `${userId}.${extension}`;

    const avatarImg = await jimp.read(oldPath);
    avatarImg.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(oldPath);

    const newAvatarPath = path.join(newPath, newAvatarName);
    await fs.rename(oldPath, newAvatarPath);

    const newAvatarUrl = path.join("avatars", newAvatarName);

    res.status(200).json({
      avatarURL: newAvatarUrl,
    });
  } catch (error) {
    fs.unlink(oldPath);
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = updateAvatar;
