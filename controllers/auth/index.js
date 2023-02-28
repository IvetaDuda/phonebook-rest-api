const register = require('./register');
const verify = require('./verify');
const resendVerify = require('./resendVerify');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const upDateSubscription = require('./upDateSubscription');
const upDateAvatar = require('./upDateAvatar');
const upDateCurrent = require('./upDateCurrent');
const deleteAvatar = require('./deleteAvatar');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  upDateSubscription,
  upDateAvatar,
  verify,
  resendVerify,
  upDateCurrent,
  deleteAvatar,
};
