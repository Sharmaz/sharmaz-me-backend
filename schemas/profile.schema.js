const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const profilePic = Joi.string().uri();
const about = Joi.string();
const blog = Joi.string();
const github = Joi.string();
const linkedIn = Joi.string();
const twitter = Joi.string();

const createProfileSchema = Joi.object({
  name: name.required(),
  profilePic,
  about,
  blog,
  github,
  linkedIn,
  twitter,
});

const updateProfileSchema = Joi.object({
  name,
  profilePic,
  about,
  blog,
  github,
  linkedIn,
  twitter,
});

const getProfileSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProfileSchema, updateProfileSchema, getProfileSchema };
