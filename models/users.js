const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { hendleSaveError } = require('../helpers');

const validPhone = /^\+380\d{9}$/;
const birthdayRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 4,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      default: '',
      // required: true,
    },
    userPhone: {
      type: String,
      default: '',
      match: validPhone,
    },
    userBirthday: {
      type: String,
      default: '',
      match: birthdayRegExp,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save,', hendleSaveError);

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(4).max(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string,
  userPhone: Joi.string().pattern(validPhone),
  userBirthday: Joi.string().pattern(birthdayRegExp),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(4).max(8).required(),
  email: Joi.string().email().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});
const updateUserCurrent = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  subscription: Joi.string,
  userPhone: Joi.string().pattern(validPhone),
  userBirthday: Joi.string().pattern(birthdayRegExp),
});

const schemas = {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
  updateUserCurrent,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
