import { api } from './api';

export const jobsService = {
  getAll: () => api.get('/jobs'),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.patch(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
};
