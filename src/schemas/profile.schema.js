const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2);
const profilePic = Joi.string().uri();
const about = Joi.string();
const blog = Joi.string().uri();
const github = Joi.string().uri();
const linkedIn = Joi.string().uri();
const twitter = Joi.string().uri();
const resume = Joi.string().uri();

const createProfileSchema = Joi.object({
  name: name.required(),
  profilePic,
  about,
  blog,
  github,
  linkedIn,
  twitter,
  resume,
});

const updateProfileSchema = Joi.object({
  name,
  profilePic,
  about,
  blog,
  github,
  linkedIn,
  twitter,
  resume,
});

const getProfileSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProfileSchema, updateProfileSchema, getProfileSchema };
