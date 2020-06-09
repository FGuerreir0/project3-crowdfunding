const formatDate = (date) => {
  let feedDate = new Date(date).toDateString();
  return feedDate;
};

export default formatDate;
