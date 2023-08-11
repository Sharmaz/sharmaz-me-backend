const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const dateStarted = Joi.date();
const dateEnded = Joi.date();
const description = Joi.string();
const role = Joi.string();
const details = Joi.object({
  list: Joi.array().items(Joi.string()),
});

const createJobSchema = Joi.object({
  name: name.required(),
  dateStarted,
  dateEnded,
  description,
  role,
  details,
});

const updateJobSchema = Joi.object({
  name,
  dateStarted,
  dateEnded,
  description,
  role,
  details,
});

const getJobSchema = Joi.object({
  id: id.required(),
});

module.exports = { createJobSchema, updateJobSchema, getJobSchema };
