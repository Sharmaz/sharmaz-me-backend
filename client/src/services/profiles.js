import { api } from './api';

export const profilesService = {
  getAll: () => api.get('/profiles'),
  create: (data) => api.post('/profiles', data),
  update: (id, data) => api.patch(`/profiles/${id}`, data),
  delete: (id) => api.delete(`/profiles/${id}`),
};
