const express = require('express');
const ProfilesService = require('../services/profiles.service');

const router = express.Router();
const profilesService = new ProfilesService();

router.get('/:profileId', async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const profile = await profilesService.findOne(profileId);
    res.json(profile);
  } catch(error) {
    next(error);
  }
});

router.patch('/:profileId', async (req, res, next) => {
  try {
    const { body } = req;
    const { profileId } = req.params;
    const updatedProfile = await profilesService.update(profileId, body);
    res.json(updatedProfile);
  } catch(error) {
    next(error);
  }
});

router.delete('/:profileId', async (req, res, next) => {
  try {
    const { profileId } = req.params;
    await profilesService.delete(profileId);
    res.status(204).json();
  } catch(error) {
    next(error);
  }
});

module.exports = router;
