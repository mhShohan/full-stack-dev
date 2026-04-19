const pool = require('../config/db');

class BaseService {
  constructor() {
    this.db = pool;
  }

  async DB_Mutation(sql, values) {
    try {
      const [result] = await this.db.execute(sql, values);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async DB_Query(sql) {
    try {
      const [result] = await this.db.execute(sql);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = BaseService;