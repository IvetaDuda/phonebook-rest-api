const getCurrent = async (req, res, next) => {
  const {
    email,
    name,
    avatarURL,
    subscription,
    verify,
    userPhone,
    userBirthday,
  } = req.user;
  res.json({
    email,
    name,
    avatarURL,
    subscription,
    verify,
    userPhone,
    userBirthday,
  });
};
module.exports = getCurrent;
