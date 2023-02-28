const { User } = require('../../models');

const { RequestError } = require('../../helpers');

const upDateCurrent = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate({ _id }, req.body, { new: true });

  if (!user) {
    throw RequestError(401, 'Not authorized');
  }
  res.status(200).json(user);
};

module.exports = upDateCurrent;
