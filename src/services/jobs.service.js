const { randomUUID } = require('crypto');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class JobsService {

  async create(userId, data) {
    const newJob = await models.Job.create({
      id: randomUUID(),
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

  async findOne(jobId, user) {
    const job = await models.Job.findByPk(jobId);
    if (!job) {
      throw boom.notFound('Job not found');
    }
    if (job.userId !== user.sub) {
      throw boom.unauthorized();
    }
    return job;
  }

  async update(jobId, changes, user) {
    const job = await this.findOne(jobId, user);
    await job.update(changes);
    return job;
  }

  async delete(jobId, user) {
    const job = await this.findOne(jobId, user);
    await job.destroy();
  }
}

module.exports = JobsService;
