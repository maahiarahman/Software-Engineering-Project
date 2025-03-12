const db = require('../services/db');

class Programme {
    constructor(id, name = null) {
        this.id = id;
        this.pName = name;
    }

    async getProgrammeName() {
        var sql = "SELECT * FROM Programmes WHERE id = ?";
        const results = await db.query(sql, [this.id]);
        if (results.length > 0) {
            this.pName = results[0].name;
        }
    }
}

module.exports = { Programme };
