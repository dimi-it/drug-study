'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('drug.db', (err) => {
    if (err) throw err;
})

exports.getDrugs = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM drug`;
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            if (rows == undefined) {
                resolve({ error: "There aren't drugs in the db." });
            } else {
                resolve(rows);
            }
        });
    });
};

exports.getDrugByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM drug WHERE name = ?`;
        db.get(sql, [name], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: "Drug not found" });
            } else {
                resolve(row);
            }
        });
    });
};

exports.getDrugById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM drug WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: "Drug not found" });
            } else {
                resolve(row);
            }
        });
    });
};

exports.getDrugsCount = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(ALL) as count FROM drug`;
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: "There are no drugs." });
            } else {
                resolve(row);
            }
        });
    });
};


exports.getListIdDrugsToPlay = (game) => {
    return new Promise((resolve, reject) => {
        //get round for game
        
    });
};



