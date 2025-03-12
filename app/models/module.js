const db = require('../services/db');

class Module {
    constructor(code, name = null) {
        this.code = code;
        this.mName = name;
    }

    async getModuleName() {
        var sql = "SELECT * FROM Modules WHERE code = ?";
        const results = await db.query(sql, [this.code]);
        if (results.length > 0) {
            this.mName = results[0].name;
        }
    }
}

module.exports = { Module };
