import axios from 'axios';

const baseContributionService = axios.create({
  baseURL: '/api/contributionPayment'
});

const createContribution = (data) => {
  console.log(data);
  return baseContributionService
    .post('/', data)
    .then((response) => {
      // ...
      const responseBody = response.data;
      console.log(responseBody);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { createContribution };
