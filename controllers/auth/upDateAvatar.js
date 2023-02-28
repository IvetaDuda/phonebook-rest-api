const fs = require('fs/promises');

const path = require('path');

const { User } = require('../../models');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const upDateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const extention = originalname.split('.').pop();
    const filenameAvatar = `${_id}.${extention}`;

    const resultUpload = path.join(avatarDir, filenameAvatar);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filenameAvatar);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = upDateAvatar;
