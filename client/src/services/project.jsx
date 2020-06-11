import axios from 'axios';

const baseProjectService = axios.create({
  baseURL: '/api/project',
});

const getAllprojects = () => {
  return baseProjectService
    .get('/list')
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
    .get(`/${id}`)
    .then((result) => {
      const project = result.data.project;
      return Promise.resolve(project);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const deleteProjectById = (id) => {
  return baseProjectService
    .get(`/${id}/delete`)
    .then((result) => {
      //const project = result.data.project;
      return Promise.resolve('Cause was Deleted');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const updateProject = (body) => {
  console.log(body);
  const form = new FormData();
  form.append('title', body.title);
  form.append('shortDescription', body.shortDescription);
  form.append('location', body.location);
  form.append('category', body.category);
  form.append('money', body.money);
  form.append('resources', JSON.stringify(body.resources));
  form.append('volunteer', JSON.stringify(body.volunteer));
  if (body.coverPictureUrl !== null) form.append('coverPictureUrl', body.coverPictureUrl);

  return baseProjectService
    .post(`/${body.id}/edit`, form)
    .then((result) => {
      const project = result.data.project;
      return Promise.resolve(project);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getProjectByCategory = (category) => {
  return baseProjectService
    .get(`/category/${category}`)
    .then((result) => {
      const projects = result.data.projects;
      return Promise.resolve(projects);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const createProject = (data) => {
  console.log(data);
  const form = new FormData();
  form.append('title', data.title);
  form.append('description', data.description);
  form.append('category', data.category);
  form.append('money', data.money);
  form.append('resources', JSON.stringify(data.resources));
  form.append('volunteer', JSON.stringify(data.volunteer));
  form.append('location', data.location);
  form.append('coverPictureUrl', data.coverPictureUrl);

  console.log('create client', data);
  return baseProjectService
    .post('/create', form)
    .then((result) => {})
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { createProject, getAllprojects, getProjectByCategory, getProjectById, updateProject, deleteProjectById };
