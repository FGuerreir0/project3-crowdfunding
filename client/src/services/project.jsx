import axios from 'axios';

const baseProjectService = axios.create({
  baseURL: '/api/project',
});

const getAllprojects = () => {
  return baseProjectService
    .get('/')
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

const updateProject = (body) => {
  return baseProjectService
    .post(`${body.id}/edit`, body)
    .then((result) => {
      const project = result.data.project;
      console.log(project);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getProjectByCategory = (category) => {
  return baseProjectService
    .get(`category/${category}`)
    .then((result) => {
      const projects = result.data.projects;
      return Promise.resolve(projects);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const createProject = (data) => {
  return baseProjectService
    .post('/create', data)
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
