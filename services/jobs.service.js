const  { v4 } = require('uuid');

class JobsService {
  constructor() {
    this.jobs = [];
  }

  create(userId, data) {
    const newJob = {
      id: v4(),
      userId,
      ...data
    }
    this.jobs.push(newJob);
    return newJob;
  }

  find(userId) {
    return this.jobs.map((job) => job.userId === userId? job: null);
  }

  findOne(userId, jobId) {
    const jobs = this.jobs.map((job) => job.userId === userId? job: null);
    return jobs.find((job) => job.id === jobId);
  }

  update(jobId, changes) {
    const jobIndex = this.jobs.findIndex((job) => job.id === jobId);
    
    if (jobIndex === -1) {
      throw new Error('Job not found');
    }
    const job = this.jobs[jobIndex];
    this.jobs[jobIndex] = {
      ...job,
      ...changes
    };

    return this.jobs[jobIndex];
  }

  delete(jobId) {
    const jobIndex = this.jobs.findIndex((job) => job.id === jobId);
  
    if (jobIndex === -1) {
      throw new Error('Job not found');
    }

    this.jobs.splice(jobIndex, 1);
    return { jobId };
  }
}

module.exports = JobsService;
