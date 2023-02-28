const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { RequestError } = require('../../helpers');

const { SEKRET_KEY } = process.env;

const login = async (req, res) => {
  const {
    password,
    email,
    subscription,
    name,
    avatarURL,
    userPhone,
    userBirthday,
  } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw RequestError(401, 'Email or password is wrong');
  }
  if (!user.verify) {
    throw RequestError(401, 'Email not verify');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      name,
      avatarURL,
      subscription,
      userPhone,
      userBirthday,
    },
  });
};

module.exports = login;
