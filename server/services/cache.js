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
// const exec = mongoose.Query.prototype.exec;

// mongoose.Query.prototype.cache = function (options = {}) {
//   this.enableCache = true;
//   this.hashKey = JSON.stringify(options.key || "default");

//   return this;
// };

// mongoose.Query.prototype.exec = async function () {
//   if (!this.enableCache) {
//     console.log("Data Source: Database");
//     return exec.apply(this, arguments);
//   }

//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       collection: this.mongooseCollection.name,
//     })
//   );

//   const cachedValue = await client.hget(this.hashKey, key);

//   if (cachedValue) {
//     const parsedCache = JSON.parse(cachedValue);

//     console.log("Data Source: Cache");

//     return Array.isArray(parsedCache)
//       ? parsedCache.map((doc) => new this.model(doc))
//       : new this.model(parsedCache);
//   }

//   const result = await exec.apply(this, arguments);

//   client.hmset(this.hashKey, key, JSON.stringify(result), "EX", 300);

//   console.log("Data Source: Database");
//   return result;
// };

// module.exports = {
//   clearCache(hashKey) {
//     console.log("Cache cleaned");
//     client.del(JSON.stringify(hashKey));
//   },
// };
