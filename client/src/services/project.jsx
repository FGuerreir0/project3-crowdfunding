import axios from 'axios';

const baseProjectService = axios.create({
  baseURL: '/api/project',
});

const getAllprojects = () => {
  return baseProjectService
    .get('/all')
    .then((result) => {
      const projects = result.data.projects;
      return Promise.resolve(projects);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getProjectById = (id) => {
  return baseProjectService
    .get(`${id}`)
    .then((result) => {
      const project = result.data.project;
      return Promise.resolve(project);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
