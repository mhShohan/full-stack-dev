const authenticate = (req, _res, next) => {
  req.user = {
    id: 9999,
    name: 'mh'
  };
  next();
};

module.exports = authenticate;