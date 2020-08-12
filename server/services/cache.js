const logger = require("../logger/logger.js");
const redis = require("redis");
const util = require("util");
const client = redis.createClient();
client.hget = util.promisify(client.hget);

client.on("connect", (connect) => {
  logger.log("info", "connect to redis");
});
class cacheService {
  set(key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  append(key, value) {
    return new Promise((resolve, reject) => {
      client.append(key, value, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = new cacheService();
