const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2);
const profilePic = Joi.string().uri().allow(null, '');
const about = Joi.string().allow(null, '');
const blog = Joi.string().uri().allow(null, '');
const github = Joi.string().uri().allow(null, '');
const linkedIn = Joi.string().uri().allow(null, '');
const twitter = Joi.string().uri().allow(null, '');
const resume = Joi.string().uri().allow(null, '');

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
