const  { v4 } = require('uuid');
const boom = require('@hapi/boom');

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
    if(!jobs || jobs.length < 1) {
      throw boom.notFound('Jobs not found');
    }
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
    return { jobId, changes };
  }

  async delete(jobId, user) {
    const job = await this.findOne(jobId, user);
    await job.destroy();
  }
}

module.exports = JobsService;
