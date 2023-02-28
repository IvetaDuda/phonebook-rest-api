const { RequestError } = require('../../helpers');
const { User } = require('../../models');

const deleteAvatar = async (req, res) => {
  const { _id } = req.user;
  const { avatarURL } = req.user;
  // const avatarDir = path.join(__dirname, '../../', 'public', avatarURL);
  // const deleteResult = User.findOneAndRemove(avatarURL);
  const avatarUrl = await User.findById(_id, { avatarURL });
  // console.log(avatarUrl);
  const result = await User.deleteOne(
    { avatarURL: avatarUrl.avatarURL },
    {
      $set: { avatarURL: { $in: [avatarURL._id] } },
    }
  );

  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.status(200).json({ message: 'File is deleted.' });
};

module.exports = deleteAvatar;
