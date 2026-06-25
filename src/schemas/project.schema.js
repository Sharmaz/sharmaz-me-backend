const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string().allow(null, '');
const githubLink = Joi.string().uri().allow(null, '');
const demoLink = Joi.string().uri().allow(null, '');
const imageLink = Joi.string().uri().allow(null, '');
const tags = Joi.object({
  list: Joi.array().items(Joi.string()),
});

const createProjectSchema = Joi.object({
  name: name.required(),
  description,
  githubLink,
  demoLink,
  imageLink,
  tags,
});

const updateProjectSchema = Joi.object({
  name,
  description,
  githubLink,
  demoLink,
  imageLink,
  tags,
});

const getProjectSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProjectSchema, updateProjectSchema, getProjectSchema };
