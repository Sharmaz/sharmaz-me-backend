const express = require('express');
const passport = require('passport');
const ProfilesService = require('../services/profiles.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateProfileSchema, getProfileSchema, createProfileSchema } = require('../schemas/profile.schema');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const profilesService = new ProfilesService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const profiles = await profilesService.find(id);
      res.json(profiles);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(createProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const id = req.user.sub;
      const newProfile = await profilesService.create(body, id);
      res.status(201).json(newProfile);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const profile = await profilesService.findOne(id, user);
      res.json(profile);
    } catch(error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getProfileSchema, 'params'),
  validatorHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body, user } = req;
      const { id } = req.params;
      const updatedProfile = await profilesService.update(id, body, user);
      res.json(updatedProfile);
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = req.params;
      await profilesService.delete(id, user);
      res.status(204).json();
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
