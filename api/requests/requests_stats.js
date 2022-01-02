;(function () {
    'use strict';

    const connection = require('../connection.js');

    module.exports.Request_stats = class Request_stats {
        constructor(user, timeTaken, kills, attacks, attacksHit, damageTaken, damageDealt) {
            this.user = user;
            this.timeTaken = timeTaken;
            this.kills = kills;
            this.attacks = attacks;
            this.attacksHit = attacksHit;
            this.damageTaken = damageTaken;
            this.damageDealt = damageDealt;
        }
    }

    module.exports.getAllStats = async function getAllStats() {
        const conn = await connection.getDatabaseConnection();
        const query = 'SELECT * FROM scores;';
        const [records] = await conn.query(query);
        await conn.end();
        return records;
    }

    module.exports.postStats = async function postStats(stats) {
        const conn = await connection.getDatabaseConnection();
        const query =
            'INSERT INTO scores (user, timeTaken, kills, attacks, attacksHit, damageTaken, damageDealt) VALUES (?,?,?,?,?,?,?);';
        const [result] = await conn.query(query, [
            stats.user,
            stats.timeTaken,
            stats.kills,
            stats.attacks,
            stats.attacksHit,
            stats.damageTaken,
            stats.damageDealt
        ]);
        await conn.end();
        return result;
    }
})();