const { clearCache } = require("./cache.js");

module.exports = async (req, res, next) => {
  // wait for route handler to finish running
  await next();

  clearCache(req.body.user);
};
