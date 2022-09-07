'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('drug.db', (err) => {
    if (err) throw err;
})

exports.getDrugs = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM drugs`;
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
        const sql = `SELECT * FROM drugs WHERE name = ?`;
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
        const sql = `SELECT * FROM drugs WHERE id = ?`;
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
        const sql = `SELECT COUNT(ALL) as count FROM drugs`;
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

exports.getRoundForGame = (game) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT round FROM games WHERE game = ?`;
        db.get(sql, [game], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: "Game not found" });
            } else {
                resolve(row.round);
            }
        })
    })
}


exports.getListIdDrugsToPlay = (game, round) => {
    console.log(`game:${game}, round:${round}`);
    return new Promise(async (resolve, reject) => {
        //const sql = `SELECT id FROM drugs LEFT OUTER JOIN results ON drugs.id = results.drugId WHERE results.game = ? AND results.round = ? AND results.drugId IS null`;
        const sql = `SELECT id, name, secondName, category FROM drugs LEFT OUTER JOIN results ON drugs.id = results.drugId AND results.game = ? AND results.round = ? WHERE results.drugId IS null`;

        db.all(sql, [game, round], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(rows);
            resolve(rows);
        })
    });
};



