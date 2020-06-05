import axios from 'axios';

const baseAuthenticationService = axios.create({
  baseURL: '/api/authentication',
});

const signIn = (body) => {
  return baseAuthenticationService
    .post('/sign-in', body)
    .then((result) => {
      const user = result.data.user;
      return Promise.resolve(user);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const signUp = (body) => {
  const form = new FormData();
  form.append('username', body.username);
  form.append('email', body.email);
  form.append('password', body.password);
  return baseAuthenticationService
    .post('/sign-up', form)
    .then((result) => {
      const user = result.data.user;
      return Promise.resolve(user);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const signOut = () => {
  return baseAuthenticationService
    .post('/sign-out')
    .then((response) => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const loadAuthenticatedUser = () => {
  return baseAuthenticationService
    .get('/me')
    .then((response) => {
      const user = response.data.user;
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { signUp, signIn, signOut, loadAuthenticatedUser };
