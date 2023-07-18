const express = require('express');
const ProfilesService = require('../services/profiles.service');

const router = express.Router();
const profilesService = new ProfilesService();

router.get('/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const profile = await profilesService.findOne(profileId);
  res.json(profile);
});

router.patch('/:profileId', async (req, res) => {
  const { body } = req;
  const { profileId } = req.params;
  const updatedProfile = await profilesService.update(profileId, body);
  res.json(updatedProfile);
});

router.delete('/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const deletedProfile = await profilesService.delete(profileId);
  res.json(deletedProfile);
});

module.exports = router;