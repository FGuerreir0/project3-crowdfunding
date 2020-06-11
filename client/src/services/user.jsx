import axios from 'axios';

const baseUserService = axios.create({
  baseURL: '/api/user',
});

const getUserById = (id) => {
  console.log(id);
  return baseUserService
    .get(`/${id}`, id)
    .then((result) => {
      const user = result.data.user;
      const projects = result.data.projects;
      const actions = result.data.actions;
      console.log('actions', actions);
      return Promise.resolve({ user, projects, actions });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const updateUser = (body) => {
  const form = new FormData();
  form.append('username', body.username);
  form.append('location', body.location);
  form.append('bio', body.bio);
  if (body.pictureUrl !== null) form.append('pictureUrl', body.pictureUrl);

  return baseUserService
    .post(`/${body._id}/edit`, form)
    .then((result) => {
      const user = result.data.user;
      return Promise.resolve(user);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getActionsByUserId = (userId) => {
  return baseUserService
    .get(`/${userId}/actions`)
    .then((result) => {
      const actions = result.data.actions;
      return Promise.resolve(actions);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getProjectsByUserId = (userId) => {
  return baseUserService
    .get(`/${userId}/projects`)
    .then((result) => {
      const projects = result.data.projects;
      return Promise.resolve(projects);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { getProjectsByUserId, getActionsByUserId, updateUser, getUserById };
