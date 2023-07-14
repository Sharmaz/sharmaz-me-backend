const  { v4 } = require('uuid');

const { models } = require('../libs/sequelize');

class JobsService {

  async create(userId, data) {
    const newJob = await models.Job.create({
      id: v4(),
      userId,
      ...data
    });
    return newJob;
  }

  async find(userId) {
    const jobs = await models.Job.findAll({
      where: { userId }
    });
    return jobs;
  }

  async findOne(jobId) {
    const job = await models.Job.findByPk(jobId);
    return job;
  }

  async update(jobId, changes) {
    const job = await models.Job.findByPk(jobId);
    await job.update(changes);

    return { jobId, changes };
  }

  async delete(jobId) {
    const job = await models.Job.findByPk(jobId);
    await job.destroy();
    return { jobId };
  }
}

module.exports = JobsService;
