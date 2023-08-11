const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const description = Joi.string();
const githubLink = Joi.string().uri();
const demoLink = Joi.string().uri();
const tags = Joi.object({
  list: Joi.array().items(Joi.string()),
});

const createProjectSchema = Joi.object({
  name: name.required(),
  description,
  githubLink,
  demoLink,
  tags,
});

const updateProjectSchema = Joi.object({
  name,
  description,
  githubLink,
  demoLink,
  tags,
});

const getProjectSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProjectSchema, updateProjectSchema, getProjectSchema };
