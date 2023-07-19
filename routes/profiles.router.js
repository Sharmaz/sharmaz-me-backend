const express = require('express');
const ProfilesService = require('../services/profiles.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateProfileSchema, getProfileSchema } = require('../schemas/profile.schema');

const router = express.Router();
const profilesService = new ProfilesService();

router.get('/:id',
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await profilesService.findOne(id);
      res.json(profile);
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProfileSchema, 'params'),
  validatorHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedProfile = await profilesService.update(id, body);
      res.json(updatedProfile);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await profilesService.delete(id);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
