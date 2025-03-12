const db = require('../services/db');
const { Programme } = require('./programme');
const { Module } = require('./module');

class Student {
    constructor(id) {
        this.id = id;
        this.name = null;
        this.programme = null;
        this.modules = [];
    }

    async getStudentName() {
        var sql = "SELECT * from Students WHERE id = ?";
        const results = await db.query(sql, [this.id]);
        if (results.length > 0) {
            this.name = results[0].name;
        }
    }

    async getStudentProgramme() {
        var sql = `SELECT p.id, p.name FROM Programmes p 
                   JOIN Student_Programme sp ON p.id = sp.programme 
                   WHERE sp.id = ?`;
        const results = await db.query(sql, [this.id]);
        if (results.length > 0) {
            this.programme = new Programme(results[0].id, results[0].name);
        }
    }

    async getStudentModules() {
        var sql = `SELECT m.code, m.name FROM Programme_Modules pm 
                   JOIN Modules m ON m.code = pm.module 
                   WHERE programme = ?`;
        const results = await db.query(sql, [this.programme.id]);
        this.modules = results.map(row => new Module(row.code, row.name));
    }
}

module.exports = { Student };
